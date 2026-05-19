import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const links = data.allPackLink.edges
  const [devicePlatform, setDevicePlatform] = useState("")
  const [showInstallTip, setShowInstallTip] = useState(false)

  useEffect(() => {
    // 1. Detect the user's phone platform
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDevicePlatform("ios")
    } else if (/android/.test(userAgent)) {
      setDevicePlatform("android")
    }

    // 2. Check if they've already dismissed the shortcut banner in the past
    const isDismissed = localStorage.getItem("pack121_install_dismissed")
    if (!isDismissed) {
      setShowInstallTip(true)
    }
  }, [])

  // Function to permanently hide the shortcut tip on this device
  const dismissTip = (e) => {
    e.preventDefault()
    e.stopPropagation()
    localStorage.setItem("pack121_install_dismissed", "true")
    setShowInstallTip(false)
  }

  return (
    <div style={{
      backgroundColor: "#0C2340", // Cub Scout Deep Blue
      minHeight: "100vh",
      color: "#FFFFFF",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 16px 40px 16px"
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

        {/* DASHBOARD-STYLED SHORTCUT BANNER 
          It renders inline at the bottom of the list, perfectly matching the design language.
        */}
        {showInstallTip && (
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255, 0.05)", // Matching button background
            border: "1px dashed #F2A900", // Dashed gold to indicate a "utility" block
            borderRadius: "16px",
            padding: "20px 16px 16px 16px",
            marginTop: "32px", // Distinct spacing from the main links
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
            {/* Close / Dismiss Button */}
            <button 
              onClick={dismissTip}
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                background: "none",
                border: "none",
                color: "#FFFFFF",
                fontSize: "16px",
                cursor: "pointer",
                opacity: 0.4,
                padding: "4px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.4}
            >
              ✕
            </button>

            <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "8px", color: "#F2A900" }}>
              📱 Add App Shortcut to Home Screen
            </div>
            
            {devicePlatform === "ios" && (
              <div style={{ fontSize: "13px", opacity: 0.8, lineHeight: "1.5" }}>
                Tap the <span style={{ fontWeight: "700" }}>Share button</span> (square with an up arrow) at the bottom of Safari, then select <span style={{ fontWeight: "700", color: "#F2A900" }}>"Add to Home Screen"</span>.
              </div>
            )}

            {devicePlatform === "android" && (
              <div style={{ fontSize: "13px", opacity: 0.8, lineHeight: "1.5" }}>
                Tap the <span style={{ fontWeight: "700" }}>Menu button</span> (three vertical dots) in the top right of Chrome, then select <span style={{ fontWeight: "700", color: "#F2A900" }}>"Add to Home Screen"</span>.
              </div>
            )}

            {!devicePlatform && (
              <div style={{ fontSize: "13px", opacity: 0.8, lineHeight: "1.5" }}>
                Open this URL in your phone's native web browser, then use your browser menu tools to save it directly as an application shortcut.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Utility */}
      <footer style={{ marginTop: "40px", fontSize: "11px", opacity: 0.3 }}>
        Pack 121 Hub v1.1
      </footer>
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