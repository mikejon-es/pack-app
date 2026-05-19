import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const links = data.allPackLink.edges
  const [devicePlatform, setDevicePlatform] = useState("")

  // Simple user-agent sniffer to show custom platform install instructions
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDevicePlatform("ios")
    } else if (/android/.test(userAgent)) {
      setDevicePlatform("android")
    }
  }, [])

  return (
    <div style={{
      backgroundColor: "#0C2340", // Cub Scout Deep Blue
      minHeight: "100vh",
      color: "#FFFFFF",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 16px 120px 16px" // Extra bottom padding so layout doesn't clip behind install prompt
    }}>
      
      {/* Mobile-Friendly App Header */}
      <header style={{ textAlign: "center", margin: "40px 0 24px 0" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#F2A900", letterSpacing: "1px", margin: "0 0 4px 0" }}>
          PACK 121
        </h1>
        <p style={{ fontSize: "14px", opacity: 0.8, textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
          St. Gerard • Lansing, MI
        </p>
      </header>

      {/* Mobile Feed Container */}
      <main style={{ width: "100%", maxWidth: "420px" }}>
        {links.map(({ node }) => (
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
        ))}
      </main>

      {/* Floating Smart App Setup Banner */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        width: "90%",
        maxWidth: "400px",
        backgroundColor: "#F2A900", // Pack Gold Banner
        color: "#0C2340", // High contrast dark text
        borderRadius: "16px",
        padding: "14px 20px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        zIndex: 1000
      }}>
        <div style={{ fontWeight: "700", fontSize: "14px", marginBottom: "4px" }}>
          📱 Add to Home Screen for Quick Access
        </div>
        
        {devicePlatform === "ios" && (
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            Tap the <span style={{ fontWeight: "800" }}>Share button</span> (square with arrow up) at the bottom of Safari, then select <span style={{ fontWeight: "800" }}>"Add to Home Screen"</span>.
          </div>
        )}

        {devicePlatform === "android" && (
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            Tap the <span style={{ fontWeight: "800" }}>Menu button</span> (three dots) in the top right of Chrome, then select <span style={{ fontWeight: "800" }}>"Add to Home Screen"</span>.
          </div>
        )}

        {!devicePlatform && (
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            Open this link in your phone's browser and use your browser menu option to save it directly as an app shortcut.
          </div>
        )}
      </div>
    </div>
  )
}

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