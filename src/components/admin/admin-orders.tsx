import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Loader, Message, Segment } from 'semantic-ui-react'
import { listOrdersByStatus } from '../../utils/graphql'
import { GetOrderQuery } from '../../API'
import AdminOrdersTable from './admin-orders-table'

const AdminOrders = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [orderList, updateOrderList] = useState<Array<GetOrderQuery['getOrder']> | null>(null)

  useEffect(() => {
    async function queryNewOrders() {
      try {
        // all orders at once: set max. limit
        const resp = await API.graphql(
          graphqlOperation(listOrdersByStatus, {
            status: 'new',
            limit: 9999,
          })
        )
        if (resp.data.orderByStatus && resp.data.orderByStatus.items && resp.data.orderByStatus.items.length > 0) {
          updateOrderList(resp.data.orderByStatus.items)
        }
      } catch (err) {
        console.log('error: ', err)
        setError(true)
      }
      setLoading(false)
    }
    queryNewOrders()
  }, [])

  return (
    <Segment>
      <Header as="h3">New orders</Header>
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
          {orderList && orderList.length > 0 ? <AdminOrdersTable orderList={orderList} /> : <p>No new orders.</p>}
        </>
      )}
    </Segment>
  )
}

export default AdminOrders
