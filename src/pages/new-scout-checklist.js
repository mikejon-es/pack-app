import React from "react"
import { graphql, Link } from "gatsby"

const NewScoutChecklistPage = ({ data }) => {
  const links = data.allChecklistLink.edges

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
          New Scout Checklist
        </h1>
        <p style={{ fontSize: "13px", opacity: 0.7, margin: 0 }}>Pack 121 Getting Started Guide</p>
      </header>

      <main style={{ width: "100%", maxWidth: "420px" }}>
        {links.length === 0 ? (
          <p style={{ textAlign: "center", opacity: 0.5 }}>No checklist items available right now.</p>
        ) : (
          links.map(({ node }) => (
            <a
              key={node.id}
              href={node.linkurl}
              target={node.linkurl?.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(242, 169, 0, 0.4)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "16px",
                textDecoration: "none",
                color: "#FFFFFF",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#F2A900"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(242, 169, 0, 0.4)"}
            >
              {node.imageurl && (
                <div style={{ marginRight: "16px", display: "flex", alignItems: "center" }}>
                  <img
                    src={node.imageurl}
                    alt=""
                    style={{ width: "42px", height: "42px", objectFit: "contain" }}
                  />
                </div>
              )}

              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0" }}>
                  {node.title}
                </h2>
                <p style={{ fontSize: "13px", opacity: 0.7, lineHeight: "1.4", margin: 0 }}>
                  {node.description}
                </p>
              </div>
            </a>
          ))
        )}
      </main>
    </div>
  )
}

export const Head = () => (
  <>
    <title>Pack 121 New Scout Checklist</title>
    <html lang="en" style={{ backgroundColor: "#0C2340" }} />
    <body style={{ backgroundColor: "#0C2340", margin: 0, padding: 0 }} />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  </>
)

export const query = graphql`
  query {
    allChecklistLink {
      edges {
        node {
          id
          title
          description
          category
          linkurl
          imageurl
        }
      }
    }
  }
`

export default NewScoutChecklistPage
