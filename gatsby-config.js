const { sign } = require('aws4')
const fetch = require(`node-fetch`)
const config = require('./config')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

const { API_ENDPOINT_ID, API_REGION, ACCESS_KEY_ID, ACCESS_SECRET_KEY } = { ...process.env };
const API_ENDPOINT = `https://${API_ENDPOINT_ID}.appsync-api.${API_REGION}.amazonaws.com/graphql`;
const url = new URL(API_ENDPOINT);

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    pathPrefix,
    title: config.siteTitle,
    titleAlt: config.siteTitleAlt,
    description: config.siteDescription,
    logo: config.siteLogo,
    headline: config.siteHeadline,
    siteLanguage: config.siteLanguage,
    ogLanguage: config.ogLanguage,
    author: config.author,
    twitter: config.userTwitter,
    facebook: config.ogSiteName,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'config',
        path: `${__dirname}/config`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: [`/app/*`],
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: "AWSAppSync",
        fieldName: "shops",
        url: API_ENDPOINT,
        fetch: (uri, options = {}) => fetch(uri, sign({
          ...options,
          service: 'appsync',
          region: API_REGION,
          host: url.hostname,
          path: url.pathname,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
        { accessKeyId: ACCESS_KEY_ID, secretAccessKey: ACCESS_SECRET_KEY }
        )),
        //refetchInterval: 60,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-less',
  ],
}
