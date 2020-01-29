// Semantic-UI configuration
// https://edmcman.github.io/blog/2018-12-31--theming-semantic-ui-react-in-gatsby-js/
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '../../theme.config$': path.join(__dirname, 'src/semantic/theme.config'),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // total number of query items may exceed AppSync limit ceiling: use nextToken
  // https://github.com/gatsbyjs/gatsby/issues/13589#issuecomment-486206904
  let nextToken = null
  let keepQuerying = true
  let queryItems = []

  // individual product pages
  while (keepQuerying) {
    const result = await graphql(`
      query ListShopItems(
        $limit: Int
        $nextToken: String
        ) {
        shops {
          listShopItems(limit: $limit, nextToken: $nextToken) {
            items {
              id
              productName
              shop {
                status
              }
            }
            nextToken
          }
        }
      }
      `,
      { limit: 999, nextToken: nextToken }
    )
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    const resElem = result.data.shops.listShopItems
    // public shop item pages should be up for live shops only
    queryItems = queryItems.concat(resElem.items.filter(sitem => sitem.shop && sitem.shop.status === 'live'))
    if (!resElem.nextToken) {
      keepQuerying = false
    } else {
      nextToken = resElem.nextToken
    }
  }
  const productTemplate = require.resolve('./src/templates/product.tsx')
  queryItems.forEach(item => {
    createPage({
      path: `item/${item.id}`,
      component: productTemplate,
      context: {
        id: item.id,
        name: item.productName,
      },
    })
  })

  // shop pages: shops with live-status only
  nextToken = null
  keepQuerying = true
  queryItems = []
  while (keepQuerying) {
    const result = await graphql(`
      query ShopsByStatus(
        $status: String
        $limit: Int
        $nextToken: String
        ) {
        shops {
          shopsByStatus(status: $status, limit: $limit, nextToken: $nextToken) {
            items {
              id
              slug
              seotitle
            }
            nextToken
          }
        }
      }
      `,
      { status: 'live', limit: 999, nextToken: nextToken }
    )
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
    const resElem = result.data.shops.shopsByStatus
    queryItems = queryItems.concat(resElem.items)
    if (!resElem.nextToken) {
      keepQuerying = false
    } else {
      nextToken = resElem.nextToken
    }
  }
  const shopTemplate = require.resolve('./src/templates/shop.tsx')
  queryItems.forEach(item => {
    createPage({
      path: `${item.slug}`,
      component: shopTemplate,
      context: {
        id: item.id,
        slug: item.slug,
        name: item.seotitle,
      },
    })
  })
}
