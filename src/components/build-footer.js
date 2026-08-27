import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  timeZoneName: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
})

const BuildFooter = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          buildTime
        }
      }
    }
  `)

  const buildTime = data.site.siteMetadata.buildTime

  return (
    <footer style={{ marginTop: "40px", fontSize: "11px", opacity: 0.3, textAlign: "center" }}>
      {buildTime && `Updated ${formatter.format(new Date(buildTime))}`}
    </footer>
  )
}

export default BuildFooter
