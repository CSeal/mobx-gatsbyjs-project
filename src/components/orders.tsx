import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Segment, Header, Message, Table } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { getUserOrders } from '../utils/graphql'
import { GetOrderQuery } from '../API'
import { orderTotalUSD } from '../utils/calcs'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Orders = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore }: IProps): JSX.Element => {
    const [orders, updateOrders] = useState<Array<GetOrderQuery['getOrder']> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
      async function queryOrders() {
        if (!userStore.isLoggedIn) {
          return
        }
        setLoading(true)
        try {
          const resp = await API.graphql(graphqlOperation(getUserOrders, { username: userStore.loginedUser.username }))
          if (resp && resp.data && resp.data.orderByUsername && resp.data.orderByUsername.items) {
            updateOrders(resp.data.orderByUsername.items)
          }
        } catch (err) {
          setError(true)
        }
        setLoading(false)
      }
      queryOrders()
    }, [userStore.isLoggedIn])

    return (
      <>
        <Segment>
          <Header as="h3">Recent orders</Header>
          {userStore.isLoggedIn && error && !loading && (
            <Message error header="Error" content="Please try refreshing the page" />
          )}
          {userStore.isLoggedIn && loading && !error && (
            <Segment secondary>
              <Header as="h3">Loading...</Header>
            </Segment>
          )}
          {userStore.isLoggedIn && !loading && !error && orders && orders.length === 0 && <p>No recent orders.</p>}
          {userStore.isLoggedIn && !loading && !error && orders && orders.length > 0 && (
            <Table size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Order ID</Table.HeaderCell>
                  <Table.HeaderCell>Order date</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Items</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.map(oitem => {
                  if (!oitem) return null
                  const oitemId = oitem.id
                  return (
                    <Table.Row key={`itemrow_${oitemId}`}>
                      <Table.Cell key={`ordid_${oitemId}`}>
                        <Link to={`/app/order/${oitemId}`}>{oitemId}</Link>
                      </Table.Cell>
                      <Table.Cell key={`date_${oitemId}`}>
                        {oitem.createdAt ? oitem.createdAt.substring(0, 10) : ''}
                      </Table.Cell>
                      <Table.Cell key={`status_${oitemId}`}>{oitem.status.toUpperCase()}</Table.Cell>
                      <Table.Cell key={`Nitems_${oitemId}`}>
                        {oitem && oitem.products && oitem.products.items ? oitem.products.items.length : ''}
                      </Table.Cell>
                      <Table.Cell key={`total_${oitemId}`}>{`$${orderTotalUSD(oitem).toFixed(2)}`}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          )}
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default Orders
