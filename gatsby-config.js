module.exports = {
  siteMetadata: {
    title: `Pack 121`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
          "icon": "src/images/icon.png",
          "name": "Pack 121 Hub",
          "short_name": "Pack 121",
          "start_url": "/",
          "background_color": "#0C2340", // Ensures background loads blue instantly
          "theme_color": "#0C2340",      // Colors the iOS status bar (clock/battery area) blue
          "display": "standalone",
  }
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