/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link, navigate } from 'gatsby'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import { Image, Button, Dimmer, Loader } from 'semantic-ui-react'
import { DropDownMenu } from '../elements'
import { IDropDownMenuItems } from '../elements/interface'
import { getEditorShops } from '../utils/graphql'
import { GetShopQuery } from '../API'
import { UserLoginSignupBtnPanel } from './user-login-signup'
import web_icons_Menu_User_min from '../images/web_icons_Menu_User_min.png'
import web_icons_Menu_User_Selected_min from '../images/web_icons_Menu_User_Selected_min.png'
import web_icons_Menu_Star from '../images/web_icons_Menu_Star.png'
import web_icons_Menu_Star_Selected from '../images/web_icons_Menu_Star_Selected.png'
import web_icons_Menu_Planet from '../images/web_icons_Menu_Planet.png'
import web_icons_Menu_Planet_Selected from '../images/web_icons_Menu_Planet_Selected.png'
import web_icons_Menu_Cart from '../images/web_icons_Menu_Cart.png'
import web_icons_Menu_Cart_Selected from '../images/web_icons_Menu_Cart_Selected.png'

const Header = styled.header`
  padding: 13px 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.mlightgrey};
  font-family: Quicksand, 'Helvetica Neue', Helvetica, sans-serif;

  @media only screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const HeaderItemMyTeam = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    order: 2;
    width: 50%;
    font-size: 14px;
  }
`

const HeaderItemLogo = styled(props => <Link {...props} />)`
  font-size: 22px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 5px;
  text-align: center;

  @media only screen and (max-width: 767px) {
    order: 1;
    width: 100%;
    margin-bottom: 10px;
  }
`

const DropDownMenuLeftSide = styled(props => <DropDownMenu {...props} />)`
  &.${props => props.className} > span.active {
    color: #b91d85;
  }
  &.${props => props.className} > .menu {
    background-color: black;
    .item > * {
      color: white !important;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 11px;
    }
    .DropDownMenuSubItem > * {
      color: #a5a5a7 !important;
    }
    .active > *,
    .item:hover > * {
      color: #b91d85 !important;
    }
  }
  &.${props => props.className} {
    margin-right: 20px;
  }
`

const dropDownMenuActiveLinkStyle = {
  color: '#b91d85 !important',
}

const DropDownMenuLink = styled(props => <Link {...props} />)`
  text-decoration: none;
`

const DropDownMenuLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 12px;
  font-weight: 700;
`

const HeaderItemNav = styled.div`
  display: flex;

  @media only screen and (max-width: 767px) {
    order: 3;
    width: 50%;
    justify-content: flex-end;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 10px;
`

const NavSaveLink = styled(StyledLink)`
  background: url(${web_icons_Menu_Star}) no-repeat 50% 50%;
  background-size: contain;

  &&&:hover {
    text-decoration: none;
    color: inherit;
    background: url(${web_icons_Menu_Star_Selected}) no-repeat 50% 50%;
    background-size: contain;
  }
`

const NavPlanetLink = styled(StyledLink)`
  background: url(${web_icons_Menu_Planet}) no-repeat 50% 50%;
  background-size: contain;

  &&&:hover {
    text-decoration: none;
    color: inherit;
    background: url(${web_icons_Menu_Planet_Selected}) no-repeat 50% 50%;
    background-size: contain;
  }
`

const NavCartLink = styled(StyledLink)`
  background: url(${web_icons_Menu_Cart}) no-repeat 50% 50%;
  background-size: contain;

  &&&:hover {
    text-decoration: none;
    color: inherit;
    background: url(${web_icons_Menu_Cart_Selected}) no-repeat 50% 50%;
    background-size: contain;
  }
`

const HeaderButtonsLogin = styled.div`
  padding-left: 0px;
  padding-right: 40px;

  @media only screen and (max-width: 767px) {
    order: 2;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const shopMenuLoading: IDropDownMenuItems = {
  key: 'shopsLoading',
  text: (
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>
  ),
  active: false,
  value: 'shopsLoading',
}

interface IProps {
  activeUri: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore, activeUri }: IProps): JSX.Element => {
    const [isPersonMenuIconActive, setPrsonMenuIconActive] = React.useState(false)
    const [isPersonFocus, setPersonFocus] = React.useState(false)
    const [isTeamMenuActive, setTeamMenuActive] = React.useState(false)
    const [isTeamFocus, setTeamFocus] = React.useState(false)
    const [shopsItems, setShopsItems] = React.useState<Array<IDropDownMenuItems> | null>(null)
    const [shopsLoading, setShopsLoading] = React.useState(true)

    const optionsPersone = [
      {
        key: 'menuItemOrders',
        active: activeUri === '/app/orders',
        children: <DropDownMenuLink to="/app/orders" children="orders" activeStyle={dropDownMenuActiveLinkStyle} />,
        value: 'menuItemOrders',
      },
      {
        key: 'menuItemSettings',
        active: activeUri === '/app/settings',
        children: <DropDownMenuLink to="/app/settings" children="settings" activeStyle={dropDownMenuActiveLinkStyle} />,
        value: 'menuItemSettings',
      },
      {
        key: 'menuItemHelp',
        active: activeUri === '/app/help',
        children: (
          <DropDownMenuLink to="/app/help" children="help & support" activeStyle={dropDownMenuActiveLinkStyle} />
        ),
        value: 'menuItemHelp',
      },
      {
        key: 'menuLogout',
        content: 'logout',
        value: 'logout',
        text: 'logout',
        onClick: () =>
          Auth.signOut()
            .then(userStore.userLogOut)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err: any) => console.log('error:', err)),
      },
    ]

    const optionNewShop: IDropDownMenuItems = {
      key: 'newshop',
      className: 'DropDownMenuSubItem',
      children: (
        <DropDownMenuLink
          to="/app/shops/create"
          children="+ create new shop"
          activeStyle={dropDownMenuActiveLinkStyle}
        />
      ),
      active: activeUri === '/app/shops/create',
      value: 'newshop',
    }

    const updateShopsItems = async (): Promise<void | undefined> => {
      if (!userStore.isLoggedIn) {
        return
      }
      try {
        const { data } = await API.graphql(graphqlOperation(getEditorShops, { id: userStore.loginedUser.sub }))
        if (
          data.getEditor &&
          data.getEditor.shops &&
          Array.isArray(data.getEditor.shops.items) &&
          data.getEditor.shops.items.length > 0
        ) {
          const shopItems: Array<IDropDownMenuItems> = data.getEditor.shops.items.reduce(
            (acc: Array<IDropDownMenuItems>, sitem: { shop: GetShopQuery['getShop'] }) => {
              if (sitem.shop) {
                const shopLinkRel = sitem.shop.status === 'live' ? `/${sitem.shop.slug}` : `/app/shops/${sitem.shop.id}`
                acc.push({
                  key: sitem.shop.id,
                  text: (
                    <DropDownMenuLink
                      to={shopLinkRel}
                      children={sitem.shop.seotitle}
                      activeStyle={dropDownMenuActiveLinkStyle}
                    />
                  ),
                  active: activeUri === shopLinkRel,
                  value: sitem.shop.id,
                })
              }
              return acc
            },
            [] as IDropDownMenuItems[]
          )
          if (shopItems && shopItems.length > 0) {
            setShopsItems([optionNewShop, ...shopItems])
          } else {
            // successful Editor-query but no shops associated with the user
            setShopsItems([optionNewShop])
          }
        } else {
          // possibly no Editor-record for a user yet
          setShopsItems([optionNewShop])
        }
      } catch (err) {
        console.log(err)
        setShopsItems(null)
      }
      setShopsLoading(false)
    }

    const userImageIcon: JSX.Element = (
      <Image
        src={isPersonMenuIconActive ? web_icons_Menu_User_Selected_min : web_icons_Menu_User_min}
        size="mini"
        onMouseOver={(event: React.SyntheticEvent): void => {
          event.stopPropagation()
          setPrsonMenuIconActive(true)
        }}
        onMouseLeave={(event: React.SyntheticEvent): void => {
          event.stopPropagation()
          if (!isPersonFocus) setPrsonMenuIconActive(false)
        }}
      />
    )

    const shopsMenuLabel: JSX.Element = (
      <DropDownMenuLabel
        className={isTeamMenuActive ? 'active' : ''}
        onMouseOver={(event: React.SyntheticEvent): void => {
          event.stopPropagation()
          setTeamMenuActive(true)
        }}
        onMouseLeave={(event: React.SyntheticEvent): void => {
          event.stopPropagation()
          if (!isTeamFocus) setTeamMenuActive(false)
        }}
        children="shops"
      />
    )

    return (
      <>
        <Header>
          {userStore.isLoggedIn ? (
            <HeaderItemMyTeam>
              <DropDownMenuLeftSide
                icon={userImageIcon}
                options={optionsPersone}
                className="leftSideHeaderMenu"
                basic
                item
                onFocus={() => {
                  setPersonFocus(true)
                  setPrsonMenuIconActive(true)
                }}
                onClose={() => {
                  setPersonFocus(false)
                  setPrsonMenuIconActive(false)
                }}
              />
              {userStore.isAdmin ? (
                <Button
                  onClick={() => navigate('/app/admin')}
                  content="Admin"
                  color="purple"
                  size="small"
                  style={{ marginRight: '40px' }}
                />
              ) : (
                <DropDownMenuLeftSide
                  icon={shopsMenuLabel}
                  options={shopsLoading ? [optionNewShop, shopMenuLoading] : shopsItems}
                  onFocus={() => {
                    setTeamFocus(true)
                    setTeamMenuActive(true)
                    updateShopsItems()
                  }}
                  onClose={() => {
                    setTeamFocus(false)
                    setTeamMenuActive(false)
                  }}
                  className="leftSideHeaderMenu"
                />
              )}
            </HeaderItemMyTeam>
          ) : (
            <HeaderButtonsLogin>
              <UserLoginSignupBtnPanel />
            </HeaderButtonsLogin>
          )}
          <HeaderItemLogo to="/">
            <span>Merchacha</span>
          </HeaderItemLogo>
          <HeaderItemNav>
            {userStore.isLoggedIn && <NavSaveLink to="/app/saves" />}
            <NavPlanetLink to="/" />
            {!userStore.isAdmin && <NavCartLink to="/app/cart" />}
          </HeaderItemNav>
        </Header>
      </>
    )
  }
)
