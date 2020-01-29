import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import { createGlobalStyle } from 'styled-components'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import { Segment, Header } from 'semantic-ui-react'
import Layout from '../components/layout'
import ShopItemsFiltered from '../components/shop-items-filtered'
import { GetShopQuery } from '../API'
import { isShopUser } from '../utils/user-checks'

// extracted from GlobalStylesSearch in src/elements/index.tsx
const GlobalStylesProductcards = createGlobalStyle`
.productcard-prev-img-holder{
  margin-right: 10px;
  margin-left: 14%;
  min-height: 300px;
  line-height: 300px;
  text-align: right;
}

.productcard-prev-img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: bottom;
}
`

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  pageContext: {
    id: string
    slug: string
    name: string
  }
  data: {
    shops: {
      getShop: GetShopQuery['getShop']
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Shop = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore, pageContext, data }: IProps): JSX.Element => {
    const shop = data.shops.getShop
    const shopEditor = userStore.isLoggedIn && (isShopUser(shop, userStore.loginedUser.username) || userStore.isAdmin)

    return (
      <Layout seotitle={pageContext.name} activeUri={`/${pageContext.slug}`}>
        <Segment>
          <Header as="h3">{shop ? shop.seotitle : ''}</Header>
        </Segment>
        <GlobalStylesProductcards />
        {shop && shop.sitems && shop.sitems.items && shop.sitems.items.length > 0 ? (
          <Location>
            {({ location }) => <ShopItemsFiltered shop={shop} location={location} shopEditor={shopEditor} />}
          </Location>
        ) : (
          <Segment>
            <p>No products in this shop yet.</p>
          </Segment>
        )}
        <div style={{ paddingTop: '20px' }} />
      </Layout>
    )
  }
)

export default Shop

export const query = graphql`
  query GetShop($id: ID!) {
    shops {
      getShop(id: $id) {
        id
        owner
        shopadmins
        members
        seotitle
        sitems(limit: 9999, sortDirection: DESC) {
          items {
            id
            updatedAt
            access
            productName
            productDescription
            productImage
            productCategory
            pricecents
            psize
            pcolor
            pmaterial
            pshape
            pimprint
          }
        }
      }
    }
  }
`
