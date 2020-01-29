import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Segment, Header, Message, Table, List, Dropdown, Button } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { attributeFields, getOrder, updateOrder } from '../utils/graphql'
import { GetOrderQuery } from '../API'
import { attrText } from '../utils/attributes'
import { userNameFirstLast } from '../utils/user-checks'
import { orderTotalUSD } from '../utils/calcs'

const statusOptions = [
  {
    key: 'new',
    text: 'NEW',
    value: 'new',
  },
  {
    key: 'processed',
    text: 'PROCESSED',
    value: 'processed',
  },
  {
    key: 'delivered',
    text: 'DELIVERED',
    value: 'delivered',
  },
]

interface IProps {
  orderId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderDetails = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ orderId, userStore }: IProps): JSX.Element => {
    const [order, setOrder] = useState<GetOrderQuery['getOrder'] | null>(null)
    const [orderStatus, updateOrderStatus] = useState<string>('')
    const [orderStatusProcessing, setOrderStatusProcessing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChangeOrderStatus = async (_event: React.SyntheticEvent, data: any) => {
      if (data && data.value && data.value !== orderStatus) {
        updateOrderStatus(data.value)
      }
    }
    const submitOrderStatusUpdate = async (): Promise<void | undefined> => {
      if (order && order.status !== orderStatus) {
        setOrderStatusProcessing(true)
        try {
          await API.graphql(
            graphqlOperation(updateOrder, {
              input: { id: orderId, status: orderStatus },
            })
          )
          window.location.reload()
        } catch (err) {
          console.log(err)
        }
      }
    }

    useEffect(() => {
      async function queryOrder() {
        if (!userStore.isLoggedIn) {
          return
        }
        setLoading(true)
        try {
          const resp = await API.graphql(graphqlOperation(getOrder, { id: orderId }))
          if (resp && resp.data && resp.data.getOrder) {
            setOrder(resp.data.getOrder)
            updateOrderStatus(resp.data.getOrder.status)
          }
        } catch (err) {
          setError(true)
        }
        setLoading(false)
      }
      queryOrder()
    }, [userStore.isLoggedIn])

    return (
      <>
        <Segment>
          <Header as="h3">Order details</Header>
          {userStore.isLoggedIn && error && !loading && (
            <Message error header="Error" content="Please try refreshing the page" />
          )}
          {userStore.isLoggedIn && loading && !error && (
            <Segment secondary>
              <Header as="h3">Loading...</Header>
            </Segment>
          )}
          {userStore.isLoggedIn && !loading && !error && order && (
            <>
              <Header as="h3">{`Status: ${order.status.toUpperCase()}`}</Header>
              <Header as="h4">{`Order ID: ${order.id}`}</Header>
              <Table size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Attributes</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {order.products &&
                    order.products.items &&
                    order.products.items.length > 0 &&
                    order.products.items.map(oitem => {
                      if (!oitem) return null
                      const oitemId = oitem.id
                      const price = (oitem.pitemPricecentsSel / 100).toFixed(2)
                      const total = ((oitem.pitemPricecentsSel * oitem.pitemQuantity) / 100).toFixed(2)
                      return (
                        <Table.Row key={`itemrow_${oitemId}`}>
                          <Table.Cell key={`name_${oitemId}`}>
                            {userStore.isAdmin && (
                              <Link to={`/app/admin/streamitem/${oitem.productId}`}>(stream item)</Link>
                            )}
                            {`  ${oitem.productName}  `}
                            {userStore.isAdmin && oitem.pitemSource === 'deck' && (
                              <Link to={`/app/admin/quoteitem/${oitem.pitemId}`}>(deck item)</Link>
                            )}
                            {userStore.isAdmin && oitem.pitemSource === 'shop' && (
                              <Link to={`/app/admin/shopitem/${oitem.pitemId}`}>(shop item)</Link>
                            )}
                          </Table.Cell>
                          <Table.Cell key={`attrs_${oitemId}`}>
                            {attributeFields.map(attr => {
                              if (!oitem[attr.field]) {
                                return null
                              }
                              return (
                                <p key={`${oitemId}_attr_${attr.field}`}>
                                  {`${attr.text}: ${attrText(oitem[attr.field])}`}
                                </p>
                              )
                            })}
                          </Table.Cell>
                          <Table.Cell key={`price_${oitemId}`}>{`$${price}`}</Table.Cell>
                          <Table.Cell key={`qty_${oitemId}`}>{oitem.pitemQuantity}</Table.Cell>
                          <Table.Cell key={`total_${oitemId}`}>{`$${total}`}</Table.Cell>
                        </Table.Row>
                      )
                    })}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="4" />
                    <Table.HeaderCell>
                      <strong>{`$${orderTotalUSD(order).toFixed(2)}`}</strong>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
              {userStore.isAdmin && (
                <Segment secondary>
                  <List bulleted>
                    <List.Item>{`User: ${userNameFirstLast(order.username)}`}</List.Item>
                    <List.Item>{`Phone provided: ${order.contactPhone}`}</List.Item>
                    <List.Item>{`Email registered: ${order.contactEmail}`}</List.Item>
                    <List.Item>{`Order originally placed: ${order.createdAt}`}</List.Item>
                    <List.Item>{`Order last updated: ${order.updatedAt}`}</List.Item>
                  </List>
                  <Header as="h4">Update order status:</Header>
                  <Dropdown
                    placeholder="Update status..."
                    fluid
                    selection
                    options={statusOptions}
                    value={orderStatus}
                    onChange={onChangeOrderStatus}
                  />
                  <div style={{ paddingBottom: '10px' }} />
                  {order.status !== orderStatus && (
                    <Button
                      content="Submit"
                      color="black"
                      loading={orderStatusProcessing}
                      onClick={submitOrderStatusUpdate}
                    />
                  )}
                </Segment>
              )}
            </>
          )}
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default OrderDetails
