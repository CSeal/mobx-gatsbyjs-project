import { observable, decorate, runInAction } from 'mobx'
import { API, graphqlOperation } from 'aws-amplify'
import { prodSavedsAllByUserId, IListProdSavedsItem, createProdSaved, deleteProdSaved } from '../utils/graphql'

const RoutePathForFavoriteProductsLoading: string[] = ['/', '/app/saves']

class FavoriteProductsModel {
  favoriteProductIds: string[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rootStore: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(rootStore: any) {
    this.rootStore = rootStore
  }

  prodSavedId = (prodId: string): string =>
    // CAUTION: use only when user is verified as logged in
    `${prodId}_${this.rootStore.userStore.loginedUser.username}`

  toggleFavoriteProduct = (prodId: string) => {
    if (!this.rootStore.userStore.isLoggedIn) {
      return
    }
    const index: number = this.favoriteProductIds.indexOf(prodId)
    if (index !== -1) {
      this.removeFavoriteProductId(prodId)
      return
    }
    this.addFavoriteProductId(prodId)
  }

  loadFavoriteProductIdsFromAWS = async (routePath: string = window.location.pathname) => {
    if (this.rootStore.userStore.isLoggedIn && RoutePathForFavoriteProductsLoading.includes(routePath)) {
      const { data } = await API.graphql(
        graphqlOperation(prodSavedsAllByUserId, { userId: this.rootStore.userStore.loginedUser.username })
      )
      runInAction(() => {
        this.favoriteProductIds = data.prodSavedsByUserId.items.map((item: IListProdSavedsItem) =>
          String(item.productId)
        )
      })
    }
  }

  private addFavoriteProductId = async (prodId: string): Promise<void> => {
    try {
      await API.graphql(
        graphqlOperation(createProdSaved, { input: { id: this.prodSavedId(prodId), productId: prodId } })
      )
      runInAction(() => {
        this.favoriteProductIds.push(prodId)
      })
    } catch (err) {
      console.log('Failed to add product to saves')
    }
  }

  private removeFavoriteProductId = async (prodId: string): Promise<void> => {
    try {
      await API.graphql(graphqlOperation(deleteProdSaved, { input: { id: this.prodSavedId(prodId) } }))
      const index: number = this.favoriteProductIds.indexOf(prodId)
      if (index !== -1) {
        runInAction(() => {
          this.favoriteProductIds.splice(index, 1)
        })
      }
    } catch (err) {
      console.log('Failed to remove product from saves')
    }
  }

  clearFavoriteProductIds = (): void => {
    this.favoriteProductIds = []
  }
}

decorate(FavoriteProductsModel, {
  favoriteProductIds: observable,
})

export default FavoriteProductsModel
