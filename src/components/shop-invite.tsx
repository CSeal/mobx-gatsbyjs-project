import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Message, Button, Header } from 'semantic-ui-react'
import {
  inviteacceptshop,
  getShopInfo,
  getEditorExists,
  createEditor,
  shopEditorId,
  createShopEditor,
} from '../utils/graphql'

interface IProps {
  shopId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopInvite = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ shopId, userStore }: IProps): JSX.Element => {
    const [error, setError] = useState(false)
    const [processing, setProcessing] = useState(false)

    const handleAccept = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      setError(false)
      setProcessing(true)

      try {
        const resp = await API.graphql(
          graphqlOperation(inviteacceptshop, {
            shopid: shopId,
          })
        )
        if (!resp || !resp.data || !resp.data.inviteacceptshop) {
          setError(true)
        } else {
          // query shop since the calling user mary already be an editor
          const respShopInfo = await API.graphql(graphqlOperation(getShopInfo, { id: shopId }))
          const shop = respShopInfo.data ? respShopInfo.data.getShop : null
          if (shop) {
            // create user-to-shop join record
            const respEditorExists = await API.graphql(
              graphqlOperation(getEditorExists, { id: userStore.loginedUser.sub })
            )
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
            // shop editor record may already exists if a user accepts twice;
            // in that case the following call will error and that is fine
            try {
              await API.graphql(
                graphqlOperation(createShopEditor, {
                  input: {
                    id: shopEditorId(shop.id, userStore.loginedUser.username),
                    shopID: shop.id,
                    editorID: userStore.loginedUser.sub,
                  },
                })
              )
            } catch (err) {
              console.log('User is already a collaborator on this shop')
            }
          }
          navigate(`/app/shops/${shopId}`)
        }
      } catch (err) {
        console.log(err)
        setError(true)
      }
      setProcessing(false)
    }

    return (
      <>
        <Segment>
          <Header as="h3">Accept shop invitation</Header>
          {userStore.isLoggedIn && (
            <>
              {error ? (
                <Message error>
                  <Message.Header>Error</Message.Header>
                  <p>Sorry but you do not have an active invitation to join this shop.</p>
                </Message>
              ) : (
                <Message positive>
                  <Message.Header>If you received this invite</Message.Header>
                  <p>Collaborate on this shop with other members.</p>
                  <Button color="black" content="Accept" loading={processing} onClick={handleAccept} />
                  <Button color="grey" content="Ignore" onClick={() => navigate('/')} />
                </Message>
              )}
            </>
          )}
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default ShopInvite
