/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-return */
import { observable, action, decorate, runInAction } from 'mobx'
import { API, graphqlOperation } from 'aws-amplify'
import moment from 'moment'
import { IDeck, getEditorDecks, subscribeToNewDecks } from '../utils/graphql'

const RoutePathForDecsLoading: string[] = ['/', '/app/saves']

class DeckModel {
  decks: IDeck[] = []

  unSubscribeDecksUpdateFunc: (() => void) | null = null

  rootStore: any

  constructor(rootStore: any) {
    this.rootStore = rootStore
  }

  loadDecksRouter = (urlPath: string = window.location.pathname) => {
    if (RoutePathForDecsLoading.includes(urlPath) && typeof this.unSubscribeDecksUpdateFunc !== 'function') {
      this.subscribeDecks()
      return
    }
    if (!RoutePathForDecsLoading.includes(urlPath) && typeof this.unSubscribeDecksUpdateFunc === 'function') {
      this.unSubscribeDecksUpdate()
      return
    }
  }

  private subscribeDecks = async () => {
    if (!this.rootStore.userStore.isLoggedIn) {
      return
    }
    try {
      const { data } = await API.graphql(
        graphqlOperation(getEditorDecks, { id: this.rootStore.userStore.loginedUser.sub })
      )

      let decks = [] as IDeck[]
      if (data.getEditor && data.getEditor.qboards && Array.isArray(data.getEditor.qboards.items)) {
        decks = data.getEditor.qboards.items.reduce((acc: any[], item: any) => {
          if (item) {
            acc.push(item.board)
          }
          return acc
        }, [])
      }
      // NOTE: data.getEditor may be null if user had not created/accepted any decks yet;
      // still need to subscribe such a user to new decks
      runInAction(async () => {
        this.decks = this.sortDecs(decks)
        await this.subscribeOnDecksUpdate()
      })
    } catch (err) {
      console.log(err)
    }
  }

  private subscribeOnDecksUpdate = async () => {
    try {
      this.unSubscribeDecksUpdateFunc = await API.graphql(
        graphqlOperation(subscribeToNewDecks, { owner: this.rootStore.userStore.loginedUser.username })
      ).subscribe({
        next: (subscriptionData: any) => {
          this.updateDecks(subscriptionData.value.data.onCreateQuoteBoard)
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  private updateDecks = (newDeck: any) => {
    if (newDeck === null) {
      return
    }
    const isOwner: boolean = newDeck.owner === this.rootStore.userStore.loginedUser.username
    const isMember: boolean = newDeck.members && newDeck.members.includes(this.rootStore.userStore.loginedUser.username)
    const canUpdateDecks: boolean = isOwner || isMember
    const notIncludeDeck = !this.decks.some((prevDeck: any): boolean => prevDeck.id === newDeck.id)
    if (notIncludeDeck && canUpdateDecks) {
      this.decks = this.sortDecs([...this.decks, newDeck])
      //console.log(this.decks, ' decks store')
    }
  }

  private sortDecs = (decks: any[]) => decks.sort(this.compareDecks)

  private compareDecks = (prevDeck: IDeck, nextDeck: IDeck): number => {
    const sortDeckByTimeDirectOrder: boolean = moment(prevDeck.updatedAt).isBefore(nextDeck.updatedAt)
    if (prevDeck.pendingquotes === nextDeck.pendingquotes) {
      if (sortDeckByTimeDirectOrder) {
        return 1
      }
      return -1
    }
    if (prevDeck.pendingquotes) {
      return -1
    }
    return 1
  }

  unSubscribeDecksUpdate = () => {
    if (typeof this.unSubscribeDecksUpdateFunc === 'function') {
      this.unSubscribeDecksUpdateFunc()
      this.unSubscribeDecksUpdateFunc = null
      this.decks = []
    }
  }
}

decorate(DeckModel, {
  decks: observable,
  loadDecksRouter: action,
})

export default DeckModel
