/* eslint-disable @typescript-eslint/no-explicit-any */
import UserModel from './UserModel'
import FavoriteProductsModel from './FavoriteProductsModel'
import DeckModel from './DeckModel'

class RootStore {
  userStore: any

  favoriteProductsStore: any

  deckStore: any

  constructor() {
    this.userStore = new UserModel(this)
    this.favoriteProductsStore = new FavoriteProductsModel(this)
    this.deckStore = new DeckModel(this)
  }

  getAllStore() {
    return {
      userStore: this.userStore,
      favoriteProductsStore: this.favoriteProductsStore,
      deckStore: this.deckStore,
    }
  }
}

export default new RootStore()
