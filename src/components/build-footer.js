import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { format, parseISO } from "date-fns"

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
      {buildTime && `Updated ${format(parseISO(buildTime), "MMM d, yyyy 'at' h:mm a")} UTC`}
    </footer>
  )
}

export default BuildFooter
