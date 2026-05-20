import React from "react"
import { graphql, Link } from "gatsby"
import { format, parseISO } from "date-fns"

const CalendarPage = ({ data }) => {
  // Sort events chronologically by start date
  const events = data.allPackEvent.edges.sort((a, b) => 
    new Date(a.node.startDate) - new Date(b.node.startDate)
  )

  return (
    <div style={{
      backgroundColor: "#0C2340", // Cub Scout Deep Blue
      minHeight: "100vh",
      color: "#FFFFFF",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // ADJUSTED PADDING FOR IOS SAFE AREAS:
      paddingTop: "calc(24px + env(safe-area-inset-top))",
      paddingBottom: "calc(40px + env(safe-area-inset-bottom))",
      paddingLeft: "calc(16px + env(safe-area-inset-left))",
      paddingRight: "calc(16px + env(safe-area-inset-right))"
    }}>
      
      {/* Back to Hub Nav */}
      <nav style={{ width: "100%", maxWidth: "420px", marginBottom: "16px" }}>
        <Link to="/" style={{ color: "#F2A900", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
          ← Back to Dashboard
        </Link>
      </nav>

      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#F2A900", margin: "0 0 4px 0" }}>
          Upcoming Events
        </h1>
        <p style={{ fontSize: "13px", opacity: 0.7, margin: 0 }}>Pack 121 Live Schedule</p>
      </header>

      <main style={{ width: "100%", maxWidth: "420px" }}>
        {events.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.5 }}>No upcoming events scheduled right now.</p>
        ) : (
          events.map(({ node }) => {
            const dateObj = parseISO(node.startDate)
            
            return (
              <div 
                key={node.id}
                style={{
                  display: "flex",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "16px",
                  padding: "16px",
                  marginBottom: "16px",
                  borderLeft: "5px solid #F2A900", // Gold event accent bar
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
              >
                {/* Date Block Component */}
                <div style={{
                  textAlign: "center",
                  marginRight: "16px",
                  minWidth: "55px",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  paddingRight: "12px"
                }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#F2A900" }}>
                    {format(dateObj, "MMM")}
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "800", lineHeight: "1.1" }}>
                    {format(dateObj, "d")}
                  </div>
                  <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "4px" }}>
                    {format(dateObj, "EEE")}
                  </div>
                </div>

                {/* Event Text Info */}
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0" }}>
                    {node.summary}
                  </h2>
                  
                  {/* Time badge */}
                  <div style={{ fontSize: "12px", color: "#F2A900", opacity: 0.9, marginBottom: "6px", fontWeight: "500" }}>
                    ⏰ {format(dateObj, "h:mm a")}
                  </div>

                  {node.location && node.location !== "TBD" && (
                    <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "4px" }}>
                      📍 {node.location}
                    </div>
                  )}

                  {node.description && (
                    <p style={{ fontSize: "12px", opacity: 0.7, margin: "6px 0 0 0", lineHeight: "1.4" }}>
                      {node.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })
        )}
      </main>
    </div>
  )
}

// Map GraphQL schema elements directly from our new custom PackEvent node
export const query = graphql`
  query {
    allPackEvent {
      edges {
        node {
          id
          summary
          description
          location
          startDate
        }
      }
    }
  }
`

export default CalendarPage