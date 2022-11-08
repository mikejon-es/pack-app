module.exports = {
  siteMetadata: {
    title: `MRJ Parks`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-sitemap", {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
        }
    },
    "gatsby-plugin-mdx", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
        },
        __key: "pages"
    },
    {
      resolve: 'gatsby-source-google-spreadsheet',
      options: {
        spreadsheetId: '16Im570coG9xCgs6lFDe-amJoHVyQUYvhXuTKKAzymRI',
        worksheetTitle: 'Sheet1',
        credentials: require('./client_secret.json')
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
  ]
};