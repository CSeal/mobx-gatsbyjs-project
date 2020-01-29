import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Loader, Message, Segment, Button } from 'semantic-ui-react'
import { listQuoteBoards, listOrdersByStatus } from '../../utils/graphql'
import { ListQuoteBoardsQuery, GetOrderQuery } from '../../API'
import AdminQuoteDecksTable from './admin-quote-decks-table'
import AdminOrdersTable from './admin-orders-table'

const AdminTools = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [qdeckList, updateQdeckList] = useState<null | ListQuoteBoardsQuery['listQuoteBoards']>(null)
  const [orderList, updateOrderList] = useState<Array<GetOrderQuery['getOrder']> | null>(null)

  useEffect(() => {
    async function queryRecentActivity() {
      try {
        // newly submitted orders
        const respOrds = await API.graphql(
          graphqlOperation(listOrdersByStatus, {
            status: 'new',
            limit: 5,
          })
        )
        if (
          respOrds.data.orderByStatus &&
          respOrds.data.orderByStatus.items &&
          respOrds.data.orderByStatus.items.length > 0
        ) {
          updateOrderList(respOrds.data.orderByStatus.items)
        }

        // pending decks
        const resp = await API.graphql(
          graphqlOperation(listQuoteBoards, {
            filter: { pendingquotes: { eq: true } },
            limit: 10,
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
    queryRecentActivity()
  }, [])

  return (
    <Segment>
      <Header as="h3">Recent activity</Header>
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
          <Header as="h4" dividing>
            New orders
          </Header>
          {orderList && orderList.length > 0 ? (
            <>
              <AdminOrdersTable orderList={orderList} />
              <Button onClick={() => navigate('/app/admin/orders')} content="More orders" color="purple" size="small" />
            </>
          ) : (
            <p>No new orders.</p>
          )}

          <Header as="h4" dividing>
            Quote requests
          </Header>
          {qdeckList && qdeckList.items && qdeckList.items.length > 0 ? (
            <>
              <AdminQuoteDecksTable qdeckList={qdeckList} />
              <Button onClick={() => navigate('/app/admin/decks')} content="More decks" color="purple" size="small" />
            </>
          ) : (
            <p>No pending quote decks.</p>
          )}
        </>
      )}
    </Segment>
  )
}

export default AdminTools
