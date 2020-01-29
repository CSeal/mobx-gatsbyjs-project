import React, { useEffect, useState } from 'react'
import { navigate as navigateGatsby } from 'gatsby'
import { Redirect } from '@reach/router'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Header, Icon } from 'semantic-ui-react'
import { getShopInfo, getShopRecentItems } from '../utils/graphql'
import { GetShopQuery } from '../API'
import { isShopUser, isShopAdmin } from '../utils/user-checks'
import { SaveHeader, StyledButton, StyledButtonMargin } from '../elements'

interface IProps {
  shopId: string
  activeComponent: 'items' | 'settings' | 'members'
  ComponentInside: React.ElementType<{ shop: GetShopQuery['getShop'] }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  path?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopEditing = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ shopId, activeComponent, ComponentInside, userStore }: IProps): JSX.Element => {
    const [shop, updateShop] = useState<null | GetShopQuery['getShop']>(null)
    const [queryStatus, updateQueryStatus] = useState('loading')

    useEffect(() => {
      async function queryShop() {
        try {
          const query = activeComponent === ('items' as 'items') ? getShopRecentItems : getShopInfo
          const resp = await API.graphql(graphqlOperation(query, { id: shopId }))
          const respShop = resp.data ? resp.data.getShop : null
          if (respShop) {
            updateShop(respShop)
          } else {
            updateQueryStatus('error')
          }
          if (userStore.isAdmin || isShopAdmin(respShop, userStore.loginedUser.username)) {
            updateQueryStatus('complete')
          } else if (
            activeComponent !== ('settings' as 'settings') &&
            isShopUser(respShop, userStore.loginedUser.username)
          ) {
            // shop settings area should be accessible to shopadmins but not members;
            // other shop editing areas are available for members
            updateQueryStatus('complete')
          } else {
            // non-shop-users should not be visiting this page
            navigateGatsby('/')
          }
        } catch (err) {
          console.log('error: ', err)
          updateQueryStatus('error')
        }
      }
      queryShop()
    }, [shopId])

    return (
      <>
        {queryStatus === 'error' && <Redirect from="/app" to="/404" noThrow />}
        {queryStatus === 'loading' && (
          <Segment>
            <Header as="h3">Loading...</Header>
          </Segment>
        )}
        {queryStatus === 'complete' && shop && (
          <>
            <Segment>
              <Header as="h3">
                {shop.status === 'live' ? <Icon name="check circle" /> : <Icon name="clock" />}
                {shop.seotitle || ''}
              </Header>
              <SaveHeader>
                <StyledButton
                  size="medium"
                  basic={activeComponent !== ('items' as 'items')}
                  onClick={() => navigateGatsby(`/app/shops/${shopId}`)}
                >
                  New Items
                </StyledButton>
                {(userStore.isAdmin || isShopAdmin(shop, userStore.loginedUser.username)) && (
                  <StyledButton
                    size="medium"
                    basic={activeComponent !== ('settings' as 'settings')}
                    onClick={() => navigateGatsby(`/app/shops/settings/${shopId}`)}
                  >
                    Settings
                  </StyledButton>
                )}
                <StyledButtonMargin
                  size="medium"
                  color="black"
                  onClick={() => navigateGatsby(`/app/shops/members/${shopId}`)}
                >
                  <span />
                  Members
                </StyledButtonMargin>
              </SaveHeader>
            </Segment>
            <ComponentInside shop={shop} />
          </>
        )}
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default ShopEditing
