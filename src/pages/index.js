import React from "react"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const links = data.allPackLink.edges

  return (
    <div style={{
      backgroundColor: "#0C2340", // Cub Scout Deep Blue
      minHeight: "100vh",
      color: "#FFFFFF",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 16px"
    }}>
      
      {/* Mobile-Friendly App Header */}
      <header style={{ textAlign: "center", margin: "40px 0 24px 0" }}>
        <h1 style={{ 
          fontSize: "28px", 
          fontWeight: "800", 
          color: "#F2A900", // Cub Scout Gold
          letterSpacing: "1px",
          margin: "0 0 4px 0"
        }}>
          PACK 121
        </h1>
        <p style={{ 
          fontSize: "14px", 
          opacity: 0.8, 
          textTransform: "uppercase", 
          letterSpacing: "2px",
          margin: 0 
        }}>
          St. Gerard • Lansing, MI
        </p>
      </header>

      {/* Mobile Feed Container */}
      <main style={{ width: "100%", maxWidth: "420px" }}>
        {links.map(({ node }) => (
          <a 
            key={node.id}
            href={node.linkurl} // <-- Updated to linkurl
            target="_blank" 
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
            {/* Render icon if imageurl is present */}
            {node.imageurl && ( // <-- Updated to imageurl
              <div style={{ marginRight: "16px", display: "flex", alignItems: "center" }}>
                <img 
                  src={node.imageurl} // <-- Updated to imageurl
                  alt="" 
                  style={{ width: "42px", height: "42px", objectFit: "contain" }} 
                />
              </div>
            )}
            
            {/* Text Information Block */}
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                fontSize: "16px", 
                fontWeight: "600", 
                margin: "0 0 4px 0",
                color: "#FFFFFF" 
              }}>
                {node.title}
              </h2>
              <p style={{ 
                fontSize: "13px", 
                opacity: 0.7, 
                lineHeight: "1.4",
                margin: 0 
              }}>
                {node.description}
              </p>
            </div>
          </a>
        ))}
      </main>

      {/* Footer Utility */}
      <footer style={{ marginTop: "auto", padding: "20px 0 10px 0", fontSize: "12px", opacity: 0.5 }}>
        Tip: Add this page to your phone's Home Screen
      </footer>
    </div>
  )
}

// Updated Query block using your exact lowercase fields
export const query = graphql`
  query {
    allPackLink {
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

export default IndexPage