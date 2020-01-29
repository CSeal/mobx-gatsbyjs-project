import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Message, Button } from 'semantic-ui-react'
import { isDeckUser, isEmailInvited } from '../utils/user-checks'
import { inviteacceptdeck, getEditorExists, createEditor, deckEditorId, createQuoteBoardEditor } from '../utils/graphql'
import { GetQuoteBoardQuery } from '../API'

interface IProps {
  qdeck: GetQuoteBoardQuery['getQuoteBoard']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeckInvite = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ qdeck, userStore }: IProps): JSX.Element => {
    if (qdeck && isDeckUser(qdeck, userStore.loginedUser.username)) {
      // already among members
      navigate(`/app/decks/${qdeck.id}`)
    }

    const [error, setError] = useState(false)
    const [processing, setProcessing] = useState(false)

    const handleAccept = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!qdeck) return
      setError(false)
      setProcessing(true)

      try {
        const resp = await API.graphql(
          graphqlOperation(inviteacceptdeck, {
            deckid: qdeck.id,
          })
        )
        //console.log(resp);
        if (!resp || !resp.data || !resp.data.inviteacceptdeck) {
          setError(true)
        } else {
          //console.log('Accepted.');

          // create user-to-deck join record
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
          await API.graphql(
            graphqlOperation(createQuoteBoardEditor, {
              input: {
                id: deckEditorId(qdeck.id, userStore.loginedUser.username),
                qboardID: qdeck.id,
                editorID: userStore.loginedUser.sub,
              },
            })
          )

          navigate(`/app/decks/${qdeck.id}`)
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
          {qdeck && userStore.isLoggedIn && (!qdeck.invites || !isEmailInvited(qdeck.invites, userStore.getUserEmail)) && (
            <Message error>
              <Message.Header>Error</Message.Header>
              <p>Sorry but you do not have an active invitation to edit this deck.</p>
              <p>
                <Link to={`/app/decks/${qdeck.id}`}>View deck</Link>
              </p>
            </Message>
          )}
          {qdeck && userStore.isLoggedIn && error && (
            <Message error>
              <Message.Header>Error</Message.Header>
              <p>Operation failed.</p>
              <p>
                <Link to={`/app/decks/${qdeck.id}`}>View deck</Link>
              </p>
            </Message>
          )}
          {qdeck && userStore.isLoggedIn && qdeck.invites && isEmailInvited(qdeck.invites, userStore.getUserEmail) && (
            <Message positive>
              <Message.Header>You are invited</Message.Header>
              <p>Collaborate on this deck with other members.</p>
              <Button color="black" content="Accept" loading={processing} onClick={handleAccept} />
              <Button color="grey" content="Ignore" onClick={() => navigate('/')} />
            </Message>
          )}
        </Segment>
        <div style={{ paddingTop: '20px' }} />
      </>
    )
  }
)

export default DeckInvite
