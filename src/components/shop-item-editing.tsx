import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { Redirect } from '@reach/router'
import { API, graphqlOperation } from 'aws-amplify'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import { Segment, Header, Icon, Modal, Form, Button } from 'semantic-ui-react'
import { getshopitemforeditor, updateshopitemsaccess, updateshopitemsshop } from '../utils/graphql'
import { GetShopItemQuery } from '../API'

interface IProps {
  shopItemId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  path?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopItemEditing = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ shopItemId, userStore }: IProps): JSX.Element => {
    const [shopItem, updateShopItem] = useState<null | GetShopItemQuery['getShopItem']>(null)
    const [queryStatus, updateQueryStatus] = useState('loading')
    const [itemPublic, setItemPublic] = useState<boolean>(false)

    useEffect(() => {
      async function queryShopItem() {
        try {
          const resp = await API.graphql(graphqlOperation(getshopitemforeditor, { sitemid: shopItemId }))
          if (
            resp &&
            resp.data &&
            resp.data.getshopitemforeditor &&
            resp.data.getshopitemforeditor.id &&
            resp.data.getshopitemforeditor.id === shopItemId
          ) {
            updateShopItem(resp.data.getshopitemforeditor)
            setItemPublic(resp.data.getshopitemforeditor.access === 'public')
            updateQueryStatus('complete')
          } else {
            updateQueryStatus('error')
          }
        } catch (err) {
          updateQueryStatus('error')
        }
      }
      queryShopItem()
    }, [shopItemId])

    const [editProcessing, setEditProcessing] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editTarget, setEditTarget] = useState<string>('')
    const showEditAccessModal = () => {
      setEditTarget('access')
      setEditModalOpen(true)
    }
    const showRemoveModal = () => {
      setEditTarget('remove')
      setEditModalOpen(true)
    }
    const hideEditModal = (event: React.SyntheticEvent) => {
      event.preventDefault()
      if (shopItem) {
        setItemPublic(shopItem.access === 'public')
      }
      setEditTarget('')
      setEditModalOpen(false)
    }
    const hideEditModalAsync = () => {
      // invoke event.preventDefault() before the first await-statement
      setEditModalOpen(false)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onItemPublicSwitch = (_event: React.SyntheticEvent, dataswitch: any): void => {
      if (dataswitch.id === 'publicitemswitch') {
        setItemPublic(dataswitch.checked)
        showEditAccessModal()
      }
    }
    const handleEditAction = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!shopItem) {
        return
      }
      setEditProcessing(true)

      if (editTarget === 'access') {
        try {
          const resp = await API.graphql(
            graphqlOperation(updateshopitemsaccess, {
              sitemid: shopItem.id,
              newaccess: itemPublic ? 'public' : 'private',
            })
          )
          if (resp && resp.data && resp.data.updateshopitemsaccess) {
            setEditTarget('')
          }
        } catch (err) {
          console.log(err)
        }
        setEditProcessing(false)
        hideEditModalAsync()
        return
      }

      if (editTarget === 'remove') {
        try {
          const resp = await API.graphql(
            graphqlOperation(updateshopitemsshop, {
              sitemid: shopItem.id,
              newshopid: '',
            })
          )
          if (resp && resp.data && resp.data.updateshopitemsshop) {
            setEditTarget('')
            navigate('/')
          }
        } catch (err) {
          console.log(err)
        }
        setEditProcessing(false)
        hideEditModalAsync()
      }
    }

    return (
      <>
        {queryStatus === 'error' && <Redirect from="/app" to="/404" noThrow />}
        {queryStatus === 'loading' && (
          <Segment>
            <Header as="h3">Loading...</Header>
          </Segment>
        )}
        {queryStatus === 'complete' && shopItem && (
          <>
            <Modal size="small" open={editModalOpen}>
              <Modal.Header>
                {editTarget === 'access' ? 'Change product access' : ''}
                {editTarget === 'remove' ? 'Remove product' : ''}
              </Modal.Header>
              <Modal.Content>
                {editTarget === 'access' && <p>{`Make this product ${itemPublic ? 'public' : 'private'}?`}</p>}
                {editTarget === 'remove' && (
                  <p>Are you sure you want to completely remove this product from the shop?</p>
                )}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  negative
                  content={editTarget === 'remove' ? 'Yes, delete' : 'Change access'}
                  loading={editProcessing}
                  onClick={handleEditAction}
                />
                <Button color="green" content="Cancel" onClick={hideEditModal} />
              </Modal.Actions>
            </Modal>
            <Segment>
              <Header as="h3">
                <Icon name={shopItem.access === 'private' ? 'privacy' : 'users'} />
                {shopItem.productName || ''}
              </Header>
              <Segment secondary>
                <Form>
                  <Form.Checkbox
                    label="PUBLIC"
                    toggle
                    id="publicitemswitch"
                    checked={itemPublic}
                    onChange={onItemPublicSwitch}
                  />
                </Form>
                <Button
                  size="small"
                  content="Delete"
                  color="red"
                  style={{ marginTop: '10px' }}
                  onClick={showRemoveModal}
                />
                {userStore.isAdmin && (
                  <Button
                    size="small"
                    color="purple"
                    style={{ marginTop: '10px' }}
                    content="Admin edit"
                    onClick={() => navigate(`/app/admin/shopitem/${shopItem.id}`)}
                  />
                )}
              </Segment>
            </Segment>
          </>
        )}
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default ShopItemEditing
