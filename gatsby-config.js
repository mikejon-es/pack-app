module.exports = {
  siteMetadata: {
    title: `Pack 121`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-manifest',
      options: { "icon": "src/images/icon.png" }
    },
    "gatsby-plugin-mdx", 
    {
      resolve: 'gatsby-source-filesystem',
      options: { "name": "pages", "path": "./src/pages/" },
      __key: "pages"
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
  ]
};