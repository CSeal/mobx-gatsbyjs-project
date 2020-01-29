/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { navigate as navigateGatsby } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import uuid from 'uuid'
import { Segment, Header, Form, Message, Icon } from 'semantic-ui-react'
import { titleSlug } from '../utils/urls'
import { useInput } from '../utils/form-input/form-input'
import {
  checkshopslugavail,
  createShop,
  getEditorExists,
  createEditor,
  shopEditorId,
  createShopEditor,
} from '../utils/graphql'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateShop = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore }: IProps): JSX.Element => {
    const { value: title, bind: bindTitle, reset: resetTitle } = useInput('')
    const [loading, setStateLoading] = useState(false)
    const [error, setStateError] = useState('')

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()

      // user must be logged in (do not enable this component otherwise)
      if (!userStore.isLoggedIn) {
        setStateError('Please login first!')
        return
      }
      setStateError('')
      setStateLoading(true)

      try {
        const initID = uuid.v4()

        // shop slugs must be unique
        const slugInit = titleSlug(title)
        const respSlugAvail = await API.graphql(graphqlOperation(checkshopslugavail, { slug: slugInit }))
        // uuid as slug if title-based slug is already taken: user can modify later
        const slugSel = respSlugAvail.data.checkshopslugavail ? slugInit : initID
        const respCreateShop = await API.graphql(
          graphqlOperation(createShop, {
            input: {
              id: initID,
              shopadmins: [],
              members: [],
              status: 'pending',
              seotitle: title.toUpperCase(),
              slug: slugSel,
              invites: [],
            },
          })
        )
        const createdShopId = respCreateShop.data.createShop.id

        // create many-to-many user-to-shop join record for owner
        const respEditorExists = await API.graphql(graphqlOperation(getEditorExists, { id: userStore.loginedUser.sub }))
        if (!(respEditorExists.data.getEditor && respEditorExists.data.getEditor.id)) {
          await API.graphql(
            graphqlOperation(createEditor, {
              input: {
                id: userStore.loginedUser.sub,
                username: userStore.loginedUser.username,
              },
            })
          )
        }
        await API.graphql(
          graphqlOperation(createShopEditor, {
            input: {
              id: shopEditorId(createdShopId, userStore.loginedUser.username),
              shopID: createdShopId,
              editorID: userStore.loginedUser.sub,
            },
          })
        )

        resetTitle()
        setStateLoading(false)
        // user should see the newly created shop page
        navigateGatsby(`/app/shops/${createdShopId}`)
      } catch (err) {
        console.log(err)
        setStateError('Could not create a new shop...')
      }

      setStateLoading(false)
    }

    return (
      <>
        <Segment>
          <Header as="h3">Start a new shop</Header>
          {userStore.isLoggedIn && (
            <Form error={error !== null && error !== ''} onSubmit={handleSubmit}>
              <Message error header="Error" content={error} />
              <Form.Input
                {...bindTitle}
                required
                label="Short title"
                type="text"
                placeholder="Choose a shop name"
                style={{ maxWidth: 200 }}
              />
              {loading && (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>Loading</Message.Header>
                    Please wait...
                  </Message.Content>
                </Message>
              )}
              <Form.Button color="black" content="Submit" />
            </Form>
          )}
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default CreateShop
