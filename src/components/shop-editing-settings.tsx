/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Segment, Message, Form, Button, Icon, Header, Divider, Modal } from 'semantic-ui-react'
import { titleSlug } from '../utils/urls'
import { useInput } from '../utils/form-input/form-input'
import { checkshopslugavail, updateShop, deleteShop, deleteshopuserjoins } from '../utils/graphql'
import { GetShopQuery } from '../API'

interface IProps {
  shop: GetShopQuery['getShop']
}

const ShopSettings = ({ shop }: IProps): JSX.Element => {
  const [deleteProcessing, setDeleteProcessing] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [loading, setStateLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setStateError] = useState('')

  // form fields default to current shop settings
  const [live, setLive] = useState(!!(shop && shop.status === 'live'))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLiveSwitch = (_event: React.SyntheticEvent, data: any): void => {
    if (data.id === 'liveswitch') {
      setLive(data.checked)
    }
  }
  const { value: title, bind: bindTitle } = useInput(shop ? shop.seotitle : '')
  const { value: slug, bind: bindSlug } = useInput(shop ? shop.slug : '')

  const showDeleteModal = () => setDeleteModalOpen(true)
  const hideDeleteModal = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setDeleteModalOpen(false)
  }
  const hideDeleteModalAsync = () => {
    // invoke event.preventDefault() before the first await-statement
    setDeleteModalOpen(false)
  }
  const handleDelete = async (event: React.SyntheticEvent): Promise<void | undefined> => {
    event.preventDefault()
    if (!shop) return
    setDeleteProcessing(true)

    try {
      // clean up join-records with users first: unique usernames only;
      // for shops: owner, shopadmins[], members[]
      let allShopEditors = [shop.owner]
      if (shop.shopadmins) {
        allShopEditors = [...allShopEditors, ...shop.shopadmins]
      }
      if (shop.members) {
        allShopEditors = [...allShopEditors, ...shop.members]
      }
      const uniqueShopEditors = Array.from(new Set(allShopEditors.filter(u => u !== null)))
      const resp = await API.graphql(
        graphqlOperation(deleteshopuserjoins, {
          shopid: shop.id,
          usernames: uniqueShopEditors,
        })
      )
      if (!resp.data || !resp.data.deleteshopuserjoins) {
        setStateError('Errors attemting to delete current shop.')
        setDeleteProcessing(false)
        return
      }

      // now delete the shop itself
      await API.graphql(graphqlOperation(deleteShop, { input: { id: shop.id } }))

      setDeleteProcessing(false)
      navigate(`/`)
    } catch (err) {
      console.log(err)
      setStateError('Errors while deleting current shop.')
      setDeleteProcessing(false)
      hideDeleteModalAsync()
    }
  }

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void | undefined> => {
    event.preventDefault()
    if (!shop) return
    setUpdated(false)
    setStateError('')
    setStateLoading(true)

    // title should be non-empty
    if (title.trim() === '') {
      setStateError('Please enter a title for this shop.')
      setStateLoading(false)
      return
    }
    const updTitle = title.toUpperCase()

    // slug should be non-empty and unique across shops
    if (slug.trim() === '') {
      setStateError('Please enter a valid URL for this shop.')
      setStateLoading(false)
      return
    }
    const updSlug = titleSlug(slug)
    if (updSlug !== shop.slug) {
      // user attempts to modify URL
      const respSlugAvail = await API.graphql(graphqlOperation(checkshopslugavail, { slug: updSlug }))
      if (!respSlugAvail.data.checkshopslugavail) {
        setStateError('URL is already taken: please modify.')
        setStateLoading(false)
        return
      }
    }

    try {
      await API.graphql(
        graphqlOperation(updateShop, {
          input: {
            id: shop.id,
            status: live ? 'live' : 'pending',
            seotitle: updTitle,
            slug: updSlug,
          },
        })
      )
      setUpdated(true)
      setStateLoading(false)
      window.location.reload()
    } catch (err) {
      console.log(err)
      setStateError('Please check your input...')
      setUpdated(false)
      setStateLoading(false)
    }
  }

  const deleteTrigger: JSX.Element = (
    <Button color="red" onClick={showDeleteModal}>
      Delete shop
    </Button>
  )

  return (
    <Segment>
      <Form error={error !== null && error !== ''} warning onSubmit={handleSubmit}>
        <Message error header="Error" content={error} />
        <Form.Checkbox label="LIVE" toggle id="liveswitch" checked={live} onChange={onLiveSwitch} />
        {shop && shop.status === 'pending' && live && (
          <Message
            warning
            header="Note"
            content={`Shop will be added to the queue to become available at the below URL after pressing "Submit"`}
          />
        )}
        {shop && shop.status === 'live' && !live && (
          <Message warning header="Warning" content="Shop pages will no longer be accessible" />
        )}
        <Form.Group widths={3}>
          <Form.Input {...bindTitle} label="Short title" type="text" />
          <Form.Input {...bindSlug} label="Shop URL" type="text" />
        </Form.Group>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Loading</Message.Header>
              Please wait...
            </Message.Content>
          </Message>
        )}
        {updated && (
          <Message positive>
            <Message.Header>Information updated.</Message.Header>
          </Message>
        )}
        <Form.Button color="black" content="Submit" />
      </Form>
      <Divider horizontal section>
        <Header as="h4">
          <Icon name="warning sign" color="red" />
          Danger zone
        </Header>
        <Modal size="small" open={deleteModalOpen} trigger={deleteTrigger}>
          <Modal.Header>Delete shop?</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this shop with all of its products?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative loading={deleteProcessing} content="Yes, delete" onClick={handleDelete} />
            <Button positive content="Cancel" onClick={hideDeleteModal} />
          </Modal.Actions>
        </Modal>
      </Divider>
    </Segment>
  )
}

export default ShopSettings
