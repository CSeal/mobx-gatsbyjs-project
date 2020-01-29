/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */

// https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/src/components/PrivateRoute.js
// https://www.gatsbyjs.org/tutorial/authentication-tutorial/
import React from 'react'
import { Link, navigate as navigateGatsby } from 'gatsby'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import { Container, Menu } from 'semantic-ui-react'

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
export const PrivateRoute = compose<any,any>(inject('userStore'), observer)((props: any): JSX.Element | null => {
  // eslint-disable-next-line no-unused-vars
  const { ComponentIn, location, needModalPreRender, userStore, navigate, path, url, ...rest } = props

  if (needModalPreRender) {
    if (!userStore.isLoggedIn) {
      userStore.setManualCancelModalClose(false)
      userStore.setRouteToForwardAfterCancel('/')
      userStore.modalOpenAsLogin()
    }
    return <ComponentIn {...rest} />
  }

  if (!userStore.isLoggedIn) {
    //navigate(`/`, { replace: true })
    navigateGatsby('/')
    return null
  }

  return <ComponentIn {...rest} />
})

const menuLinkItem = (itemText: string, itemPath: string, currentPath: string) => (
  <Menu.Item as={Link} active={currentPath === itemPath} to={itemPath} key={itemPath}>
    {itemText}
  </Menu.Item>
)

const menuItems = [
  { text: 'Summary', path: '/app/admin' },
  { text: 'Orders', path: '/app/admin/orders' },
  { text: 'Quote decks', path: '/app/admin/decks' },
  { text: 'Shops', path: '/app/admin/shops' },
  { text: 'Users', path: '/app/admin/users' },
  { text: 'Slider', path: '/app/admin/slideritems' },
]

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
export const AdminRoute = compose<any,any>(inject('userStore'), observer)((props:any): JSX.Element | null => {
  // eslint-disable-next-line no-unused-vars
  const { ComponentIn, location, userStore, navigate, path, url, ...rest } = props

  if (!userStore.isAdmin) {
    navigateGatsby('/')
    return null
  }

  const activePath = location.pathname

  return (
    <Container style={{ marginTop: '1em' }}>
      <Menu pointing secondary stackable color="purple">
        {menuItems.map(item => menuLinkItem(item.text, item.path, activePath))}
      </Menu>
      <ComponentIn {...rest} />
      <div style={{ paddingTop: '20px' }} />
    </Container>
  )
})
