import React from 'react'
import { Router, Redirect } from '@reach/router'
import { PrivateRoute, AdminRoute } from '../components/user-route'
import Layout from '../components/layout'
import { locationPathCreater } from '../utils/urls'

import HelpForm from '../components/help-form'
import UserSettings from '../components/user-settings'
import UserFavourites from '../components/user-saves'
import Cart from '../components/cart'
import Orders from '../components/orders'
import OrderDetails from '../components/order-details'

import Deck from '../components/deck'
import DeckItems from '../components/deck-items'
import DeckMembers from '../components/deck-members'
import DeckSettings from '../components/deck-settings'
import DeckInvite from '../components/deck-invite'

import CreateShop from '../components/shop-create'
import ShopEditing from '../components/shop-editing'
import ShopEditingItems from '../components/shop-editing-items'
import ShopSettings from '../components/shop-editing-settings'
import ShopMembers from '../components/shop-editing-members'
import ShopInvite from '../components/shop-invite'
import ShopItemEditing from '../components/shop-item-editing'

import AdminTools from '../components/admin/admin-tools'
import AdminOrders from '../components/admin/admin-orders'
import AdminQuoteDecks from '../components/admin/admin-quote-decks'
import AdminShops from '../components/admin/admin-shops'
import AdminStreamItem from '../components/admin/admin-stream-item'
import AdminStoreItem from '../components/admin/admin-store-item'
import AdminUsers from '../components/admin/admin-users'
import AdminSliderItemCreate from '../components/admin/admin-slider-item-create'
import AdminSliderItem from '../components/admin/admin-slider-item'
import AdminSliderItems from '../components/admin/admin-slider-items'

//// TODO remove auxil route in production
import AuxilQuery from '../components/aux_query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App = (props: any): JSX.Element => (
  <Layout seotitle="Merchacha application" activeUri={locationPathCreater(props)}>
    <Router>
      <HelpForm path="app/help" />
      <PrivateRoute path="app/settings" ComponentIn={UserSettings} />
      <PrivateRoute path="app/saves" ComponentIn={UserFavourites} pageProps={props} />
      <PrivateRoute path="app/cart" ComponentIn={Cart} needModalPreRender />
      <PrivateRoute path="app/orders" ComponentIn={Orders} needModalPreRender />
      <PrivateRoute path="app/order/:orderId" ComponentIn={OrderDetails} needModalPreRender />

      <PrivateRoute
        path="app/decks/invites/:deckId"
        needModalPreRender
        ComponentIn={Deck}
        productsActive={false}
        membersActive
        ComponentInside={DeckInvite}
      />
      <PrivateRoute
        path="app/decks/members/:deckId"
        ComponentIn={Deck}
        productsActive={false}
        membersActive
        ComponentInside={DeckMembers}
      />
      <PrivateRoute
        path="app/decks/settings/:deckId"
        ComponentIn={Deck}
        productsActive={false}
        membersActive={false}
        ComponentInside={DeckSettings}
      />
      <Deck
        path="app/decks/:deckId"
        deckId="tsplaceholder"
        ComponentInside={DeckItems}
        productsActive
        membersActive={false}
      />

      <PrivateRoute path="app/shops/create" needModalPreRender ComponentIn={CreateShop} />
      <PrivateRoute path="app/shops/invites/:shopId" ComponentIn={ShopInvite} needModalPreRender />
      <PrivateRoute
        path="app/shops/members/:shopId"
        ComponentIn={ShopEditing}
        activeComponent={'members' as 'members'}
        ComponentInside={ShopMembers}
      />
      <PrivateRoute
        path="app/shops/settings/:shopId"
        ComponentIn={ShopEditing}
        activeComponent={'settings' as 'settings'}
        ComponentInside={ShopSettings}
      />
      <PrivateRoute path="app/shops/item/:shopItemId" ComponentIn={ShopItemEditing} />
      <PrivateRoute
        path="app/shops/:shopId"
        ComponentIn={ShopEditing}
        activeComponent={'items' as 'items'}
        ComponentInside={ShopEditingItems}
      />

      <AdminRoute path="app/admin" ComponentIn={AdminTools} />
      <AdminRoute path="app/admin/orders" ComponentIn={AdminOrders} />
      <AdminRoute path="app/admin/decks" ComponentIn={AdminQuoteDecks} />
      <AdminRoute path="app/admin/shops" ComponentIn={AdminShops} />
      <AdminRoute path="app/admin/users" ComponentIn={AdminUsers} />
      <AdminRoute path="app/admin/streamitem/:productId" ComponentIn={AdminStreamItem} />
      <AdminRoute path="app/admin/quoteitem/:itemId" ComponentIn={AdminStoreItem} itemType="deck" />
      <AdminRoute path="app/admin/shopitem/:itemId" ComponentIn={AdminStoreItem} itemType="shop" />
      <AdminRoute path="app/admin/newslideritem" ComponentIn={AdminSliderItemCreate} />
      <AdminRoute path="app/admin/slideritem/:sliderItemId" ComponentIn={AdminSliderItem} />
      <AdminRoute path="app/admin/slideritems" ComponentIn={AdminSliderItems} />

      <AuxilQuery path="app/auxil" />

      <Redirect from="/app" to="/404" default noThrow />
    </Router>
  </Layout>
)

export default App
