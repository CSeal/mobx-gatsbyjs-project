import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Loader, Message, Segment } from 'semantic-ui-react'
import { listQuoteBoards } from '../../utils/graphql'
import { ListQuoteBoardsQuery } from '../../API'
import AdminQuoteDecksTable from './admin-quote-decks-table'

const AdminQuoteDecks = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [qdeckList, updateQdeckList] = useState<null | ListQuoteBoardsQuery['listQuoteBoards']>(null)

  useEffect(() => {
    async function queryPendingDecks() {
      try {
        // all decks: set max. limit
        const resp = await API.graphql(
          graphqlOperation(listQuoteBoards, {
            filter: { pendingquotes: { eq: true } },
            limit: 9999,
          })
        )
        if (
          resp.data.listQuoteBoards &&
          resp.data.listQuoteBoards.items &&
          resp.data.listQuoteBoards.items.length > 0
        ) {
          updateQdeckList(resp.data.listQuoteBoards)
        }
      } catch (err) {
        console.log('error: ', err)
        setError(true)
      }
      setLoading(false)
    }
    queryPendingDecks()
  }, [])

  return (
    <Segment>
      <Header as="h3">Pending quotes</Header>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>Some admin queries failed... Try reloading this page.</p>
            </Message>
          )}
          {qdeckList && qdeckList.items && qdeckList.items.length > 0 ? (
            <AdminQuoteDecksTable qdeckList={qdeckList} />
          ) : (
            <p>No pending quote decks.</p>
          )}
        </>
      )}
    </Segment>
  )
}

export default AdminQuoteDecks
