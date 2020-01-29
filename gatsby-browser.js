// https://github.com/dabit3/gatsby-auth-starter-aws-amplify/blob/master/gatsby-browser.js
// https://github.com/kkemple/gatsby-amplify-performant-apps/blob/master/gatsby-browser.js
import Amplify from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import awsmobile from './src/aws-exports'
import wrapWithProvider from './wrap-with-provider'
import RootModel from './src/models/RootModel'
export const wrapRootElement = wrapWithProvider

Amplify.configure(awsmobile)

const { userStore, deckStore, favoriteProductsStore } = RootModel.getAllStore()
/*
if user is not logined err = not authenticated
*/
export const onPreRouteUpdate = (state, page, pages) => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      if(!userStore.isLoggedIn){
        userStore.userLogIn(user)
      }
      favoriteProductsStore.loadFavoriteProductIdsFromAWS(state.location.pathname)
      deckStore.loadDecksRouter(state.location.pathname)
    })
    .catch(err => {
      if (!userStore.isLoggedIn) {
        return
      }
      userStore.userLogOut()
    })
}
