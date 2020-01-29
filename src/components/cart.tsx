/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { navigate, withPrefix } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Segment, Header, Message, Table, Icon, Button, Modal, Form } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import {
  attributeFields,
  getUserCartItems,
  deleteCartItem,
  createOrder,
  createOrderItem,
  sendsnssiteadmin,
} from '../utils/graphql'
import { GetCartItemQuery } from '../API'
import { attrText } from '../utils/attributes'
import { useInput } from '../utils/form-input/form-input'
import { getUserEmail } from '../utils/user-checks'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Cart = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore }: IProps): JSX.Element => {
    const cartItemsInit = new Map<string, GetCartItemQuery['getCartItem']>()
    const [cartItems, updateCartItems] = useState(cartItemsInit)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    const [removeProcessing, setRemoveProcessing] = useState(false)
    const showRemoveModal = (remItem: string) => {
      setItemToRemove(remItem)
      setRemoveModalOpen(true)
    }
    const hideRemoveModal = (event: React.SyntheticEvent) => {
      event.preventDefault()
      setItemToRemove('')
      setRemoveModalOpen(false)
    }
    const hideRemoveModalAsync = () => {
      // invoke event.preventDefault() before the first await-statement
      setRemoveModalOpen(false)
    }
    const handleRemove = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (cartItems.size === 0) return
      if (!itemToRemove || itemToRemove === '') return
      if (!cartItems.has(itemToRemove)) return
      setRemoveProcessing(true)
      try {
        await API.graphql(
          graphqlOperation(deleteCartItem, {
            input: { id: itemToRemove },
          })
        )
        const cartItemsTemp = cartItems
        cartItemsTemp.delete(itemToRemove)
        updateCartItems(cartItemsTemp)
        setItemToRemove('')
      } catch (err) {
        setError(true)
      }
      setRemoveProcessing(false)
      hideRemoveModalAsync()
    }

    const [orderProcessing, setOrderProcessing] = useState(false)
    const { value: phone, bind: bindPhone } = useInput('')
    const placeOrder = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!userStore.isLoggedIn) return
      if (cartItems.size === 0) return
      setOrderProcessing(true)
      try {
        const respOrder = await API.graphql(
          graphqlOperation(createOrder, {
            input: {
              username: userStore.loginedUser.username,
              contactEmail: userStore.loginedUser.email,
              contactPhone: phone,
              status: 'new',
              totalCentsIncrement: 0,
            },
          })
        )
        const orderId = respOrder.data.createOrder.id
        const respOrderItems = await Promise.all(
          Array.from(cartItems.values()).map(async citem => {
            if (!citem) return true
            const orderItem = {
              username: userStore.loginedUser.username,
              orderID: orderId,
              pitemId: citem.pitemId,
              pitemSource: citem.pitemSource,
              pitemSourceId: citem.pitemSourceId,
              productId: citem.productId,
              productName: citem.productName,
              pitemQuantity: citem.pitemQuantity,
              pitemPricecentsSel: citem.pitemPricecentsSel,
            }
            attributeFields.forEach(attr => {
              if (citem[attr.field]) {
                Object.assign(orderItem, { [attr.field]: citem[attr.field] })
              }
            })
            try {
              await API.graphql(graphqlOperation(createOrderItem, { input: orderItem }))
            } catch (err) {
              return false
            }
            return true
          })
        )

        if (respOrderItems.every(Boolean)) {
          // order placed successfully: should clear cart now and notify admin SNS
          const respClearCart = await Promise.all(
            Array.from(cartItems.values()).map(async citem => {
              if (!citem) return true
              try {
                await API.graphql(graphqlOperation(deleteCartItem, { input: { id: citem.id } }))
              } catch (err) {
                return false
              }
              return true
            })
          )
          await API.graphql(
            graphqlOperation(sendsnssiteadmin, {
              sender: getUserEmail(userStore.getUserEmail),
              subject: `New order ${orderId} `,
              message: `Order details:\n ${withPrefix(`/app/order/${orderId}`)}`,
            })
          )
          if (respClearCart.every(Boolean)) {
            navigate('/app/orders')
          } else {
            setError(true)
          }
        } else {
          setError(true)
        }
      } catch (err) {
        setError(true)
      }
      setOrderProcessing(false)
    }

    useEffect(() => {
      async function queryCartItems() {
        if (!userStore.isLoggedIn) {
          return
        }
        setLoading(true)
        try {
          const resp = await API.graphql(
            graphqlOperation(getUserCartItems, { username: userStore.loginedUser.username })
          )
          if (
            resp &&
            resp.data &&
            resp.data.cartItemByUsername &&
            resp.data.cartItemByUsername.items &&
            resp.data.cartItemByUsername.items.length > 0
          ) {
            const cartItemsTemp = cartItems
            resp.data.cartItemByUsername.items.forEach((citem: GetCartItemQuery['getCartItem']) => {
              if (citem) {
                cartItemsTemp.set(citem.id, citem)
              }
            })
            updateCartItems(cartItemsTemp)
          }
        } catch (err) {
          setError(true)
        }
        setLoading(false)
      }
      queryCartItems()
    }, [userStore.isLoggedIn])

    const cartTotal = (): number => {
      if (!cartItems || cartItems.size === 0) {
        return 0
      }
      const totalCents = Array.from(cartItems.values()).reduce((acc, citem) => {
        if (citem) {
          return acc + citem.pitemPricecentsSel * citem.pitemQuantity
        }
        return acc
      }, 0)
      return totalCents / 100
    }

    return (
      <>
        <Segment>
          <Header as="h3">Cart</Header>
          {userStore.isLoggedIn && error && !loading && (
            <Message error header="Error" content="Please try refreshing the page" />
          )}
          {userStore.isLoggedIn && loading && !error && (
            <Segment secondary>
              <Header as="h3">Loading...</Header>
            </Segment>
          )}
          {userStore.isLoggedIn && !loading && !error && cartItems.size === 0 && <p>Your cart is empty.</p>}
          {userStore.isLoggedIn && !loading && !error && cartItems.size > 0 && (
            <>
              {itemToRemove && (
                <Modal size="small" open={removeModalOpen}>
                  <Modal.Header>Remove from cart</Modal.Header>
                  <Modal.Content>
                    <p>Are you sure you want to remove this product?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button negative loading={removeProcessing} content="Yes, remove" onClick={handleRemove} />
                    <Button positive content="Cancel" onClick={hideRemoveModal} />
                  </Modal.Actions>
                </Modal>
              )}
              <Table size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Attributes</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Remove</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Array.from(cartItems.values()).map(citem => {
                    if (!citem) return null
                    const citemId = citem.id
                    const price = (citem.pitemPricecentsSel / 100).toFixed(2)
                    const total = ((citem.pitemPricecentsSel * citem.pitemQuantity) / 100).toFixed(2)
                    return (
                      <Table.Row key={`itemrow_${citemId}`}>
                        <Table.Cell key={`name_${citemId}`}>{citem.productName}</Table.Cell>
                        <Table.Cell key={`attrs_${citemId}`}>
                          {attributeFields.map(attr => {
                            if (!citem[attr.field]) {
                              return null
                            }
                            return (
                              <p key={`${citemId}_attr_${attr.field}`}>
                                {`${attr.text}: ${attrText(citem[attr.field])}`}
                              </p>
                            )
                          })}
                        </Table.Cell>
                        <Table.Cell key={`price_${citemId}`}>{`$${price}`}</Table.Cell>
                        <Table.Cell key={`qty_${citemId}`}>{citem.pitemQuantity}</Table.Cell>
                        <Table.Cell key={`remove_${citemId}`}>
                          <Icon
                            name="delete"
                            color="red"
                            style={{ cursor: 'pointer' }}
                            key={`removecall_${citemId}`}
                            onClick={() => showRemoveModal(citemId)}
                          />
                        </Table.Cell>
                        <Table.Cell key={`total_${citemId}`}>{`$${total}`}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="5" />
                    <Table.HeaderCell>
                      <strong>{`$${cartTotal().toFixed(2)}`}</strong>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
              <Form onSubmit={placeOrder}>
                <Form.Input
                  label="Contact phone"
                  type="tel"
                  required
                  size="small"
                  style={{ maxWidth: '220px' }}
                  {...bindPhone}
                />
                <Form.Button color="black" content="Place order" loading={orderProcessing} />
              </Form>
            </>
          )}
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default Cart
