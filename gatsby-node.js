const fetch = global.fetch; 
const ICAL = require('ical.js');
const { parse } = require('csv-parse/sync');

// 1. Explicitly define the database structure so GraphQL cannot fail
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type PackLink implements Node {
      title: String
      description: String
      category: String
      linkurl: String
      imageurl: String
    }
  `;
  createTypes(typeDefs);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // ==========================================
  // 1. ROBUST GOOGLE SHEETS FETCH CODE
  // ==========================================
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPDJ2oMESLWXVt9aOVEmrt8jY_foztMpuVLBY400VupliH8oZ5YBLuaUzd1vS-xmL7x8nvKdF8Tsl1/pub?output=csv";
  try {
    const response = await fetch(csvUrl);
    const text = await response.text();
    
    // Parse using automatic delimiter detection fallback
    const records = parse(text, {
      columns: ['title', 'description', 'category', 'linkurl', 'imageurl'],
      from_line: 2, 
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true // Prevents crashing if a row has missing data
    });

    records.forEach((row, i) => {
      // Fallback object to ensure no keys are undefined
      const cleanRow = {
        title: row.title || "",
        description: row.description || "",
        category: row.category || "",
        linkurl: row.linkurl || "",
        imageurl: row.imageurl || ""
      };

      const nodeMeta = {
        id: createNodeId(`pack-link-${i}`),
        parent: null,
        children: [],
        internal: {
          type: `PackLink`,
          contentDigest: createContentDigest(cleanRow),
        },
      };
      createNode({ ...cleanRow, ...nodeMeta });
    });

    console.log(`Successfully forced schema mapping for ${records.length} dashboard rows.`);
  } catch (error) {
    console.error("Failed fetching spreadsheet data natively:", error);
  }

  // ==========================================
  // 2. ICS CALENDAR FETCH CODE 
  // ==========================================
  const icsUrl = "https://api.scouting.org/advancements/events/calendar/65676"; 
  try {
    const res = await fetch(icsUrl);
    if (!res.ok) throw new Error(`Scoutbook API status: ${res.status}`);
    
    const icsText = await res.text();
    const jcalData = ICAL.parse(icsText);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const now = new Date();
    let nodeCount = 0;

    vevents.forEach((vevent, index) => {
      const event = new ICAL.Event(vevent);
      const rawDateStr = vevent.getFirstPropertyValue('dtstart');
      if (!rawDateStr) return;

      const eventStartDate = new Date(rawDateStr);
      
      if (eventStartDate >= now) {
        nodeCount++;
        const eventData = {
          summary: event.summary || "Pack Event",
          description: event.description || "",
          location: event.location || "Scheduled Event Area",
          startDate: eventStartDate.toISOString(),
        };

        createNode({
          ...eventData,
          id: createNodeId(`pack-event-${index}`),
          parent: null,
          children: [],
          internal: {
            type: `PackEvent`,
            contentDigest: createContentDigest(eventData),
          },
        });
      }
    });
    console.log(`Successfully mapped ${nodeCount} future pack events to GraphQL.`);
  } catch (error) {
    console.error("❌ CRITICAL CALENDAR BUILD ERROR:", error.message);
  }
};