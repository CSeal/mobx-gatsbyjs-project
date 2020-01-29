import React, { useEffect, useState } from 'react'
import { Redirect } from '@reach/router'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import DeckSettingsHeader from './deck-header'
import { getQuoteBoard, updateQuoteBoard } from '../utils/graphql'
import { GetQuoteBoardQuery } from '../API'
import { isDeckUser } from '../utils/user-checks'

const showAdminUpdateStatus = (qdeck: GetQuoteBoardQuery['getQuoteBoard']): boolean => {
  if (qdeck && qdeck.pendingquotes && qdeck.qitems && qdeck.qitems.items && qdeck.qitems.items.length > 0) {
    const qitemsComplete = qdeck.qitems.items.map(qitem => qitem && qitem.pricecents && qitem.pricecents > 0)
    if (qitemsComplete.every(Boolean)) {
      // no more pending items in the current deck
      return true
    }
  }
  return false
}

// https://github.com/reach/router/issues/147
interface IProps {
  deckId: string
  ComponentInside: React.ElementType<{ qdeck: GetQuoteBoardQuery['getQuoteBoard'] }>
  productsActive: boolean
  membersActive: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  path?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Deck = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ deckId, ComponentInside, productsActive, membersActive, userStore }: IProps): JSX.Element => {
    const [qdeck, updateQdeck] = useState<null | GetQuoteBoardQuery['getQuoteBoard']>(null)
    const [queryStatus, updateQueryStatus] = useState('loading')
    const [adminUpdateIP, setAdminUpdateIP] = useState(false)

    useEffect(() => {
      async function queryDeck() {
        try {
          const resp = await API.graphql({
            query: getQuoteBoard,
            variables: { id: deckId },
            authMode: userStore.isLoggedIn ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
          })
          const respDeck = resp.data ? resp.data.getQuoteBoard : null
          if (respDeck && respDeck.qitems) {
            if (!respDeck.qitems.nextToken) {
              updateQdeck(respDeck)
              updateQueryStatus('complete')
            } else {
              // nextToken should be null with large qitems-limit
              console.log('nextToken is not null for quote deck items')
              updateQueryStatus('error')
            }
          } else {
            updateQueryStatus('error')
          }
        } catch (err) {
          console.log('error: ', err)
          updateQueryStatus('error')
        }
      }
      queryDeck()
    }, [])

    const updateDeckStatus = async (): Promise<void | undefined> => {
      setAdminUpdateIP(true)
      if (qdeck) {
        try {
          const resp = await API.graphql(
            graphqlOperation(updateQuoteBoard, {
              input: {
                id: qdeck.id,
                pendingquotes: false,
              },
            })
          )
          if (resp.data && resp.data.updateQuoteBoard && !resp.data.updateQuoteBoard.pendingquotes) {
            // refresh deck info after status update
            window.location.reload()
          }
        } catch (err) {
          console.log(err)
        }
      }
      setAdminUpdateIP(false)
    }

    return (
      <>
        {queryStatus === 'error' && <Redirect from="/app" to="/404" noThrow />}
        {queryStatus === 'loading' && (
          <Segment>
            <Header as="h3">Loading...</Header>
          </Segment>
        )}
        {queryStatus === 'complete' && qdeck && (
          <>
            <Segment>
              <Header as="h3">
                {qdeck.pendingquotes ? <Icon name="clock" /> : <Icon name="check circle" />}
                {qdeck.name || ''}
              </Header>
              <p>{qdeck.description || ''}</p>
              {userStore.isAdmin && showAdminUpdateStatus(qdeck) && (
                <Button
                  onClick={updateDeckStatus}
                  loading={adminUpdateIP}
                  content="Update status"
                  color="purple"
                  size="small"
                />
              )}
              {userStore.isLoggedIn && (userStore.isAdmin || isDeckUser(qdeck, userStore.loginedUser.username)) && (
                <DeckSettingsHeader deckId={deckId} productsActive={productsActive} membersActive={membersActive} />
              )}
            </Segment>
            <ComponentInside qdeck={qdeck} />
          </>
        )}
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default Deck
