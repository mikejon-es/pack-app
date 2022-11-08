import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'


const ParksPage = ({ data }) => {
  return (
    <Layout pageTitle="My Parks Page">
      <ul>
        {
          data.allGoogleSpreadsheetSheet1.nodes.map(node => (
            <li key={node.id}>
              {node.parkname}
            </li>
          ))
        }
      </ul>
    </Layout>
  )
  }

  export const query = graphql`
  query {
    allGoogleSpreadsheetSheet1(filter: {type: {eq: "NPS Unit"}}) {
        nodes {
          parkname
          id
        }
      }
  }
  `
  

  export const Head = () => <Seo title="Parks" />
  
  export default ParksPage