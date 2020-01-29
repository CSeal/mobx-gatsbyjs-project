/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Message, Form, Button, Icon, Header, Divider, Modal } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { isDeckUser } from '../utils/user-checks'
import { useInput } from '../utils/form-input/form-input'
import { updateQuoteBoard, deleteQuoteBoard, deletedeckuserjoins } from '../utils/graphql'
import { GetQuoteBoardQuery } from '../API'

interface IProps {
  qdeck: GetQuoteBoardQuery['getQuoteBoard']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeckSettings = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ qdeck, userStore }: IProps): JSX.Element => {
    const [deleteProcessing, setDeleteProcessing] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [loading, setStateLoading] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [error, setStateError] = useState('')

    // form fields default to current deck settings
    const { value: title, bind: bindTitle } = useInput(qdeck ? qdeck.name : '')
    const { value: descr, bind: bindDescr } = useInput(qdeck && qdeck.description ? qdeck.description : '')
    const { value: imprint, bind: bindImprint } = useInput(qdeck && qdeck.imprintdesign ? qdeck.imprintdesign : '')
    const [indate, setInDate] = useState<string>(qdeck && qdeck.inhandsdate ? qdeck.inhandsdate : '')

    const indateHandler = (_event: React.SyntheticEvent, { name, value }: { name: string; value: string }) => {
      if (name === 'indate') {
        setInDate(value)
      }
    }

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
      if (!qdeck) return
      //console.log(`Deleting current deck...`);
      setDeleteProcessing(true)

      try {
        // clean up join-records with users first: unique usernames only
        const allDeckEditors = qdeck.members ? (qdeck.members as string[]) : ([] as string[])
        allDeckEditors.push(qdeck.owner as string)
        const uniqueDeckEditors = Array.from(new Set(allDeckEditors))
        const resp = await API.graphql(
          graphqlOperation(deletedeckuserjoins, {
            deckid: qdeck.id,
            usernames: uniqueDeckEditors,
          })
        )
        if (!resp.data || !resp.data.deletedeckuserjoins) {
          setStateError('Errors attemting to delete current deck.')
          setDeleteProcessing(false)
          return
        }

        // now delete the deck itself
        await API.graphql(graphqlOperation(deleteQuoteBoard, { input: { id: qdeck.id } }))

        setDeleteProcessing(false)
        navigate(`/`)
      } catch (err) {
        console.log(err)
        setStateError('Errors while deleting current deck.')
        setDeleteProcessing(false)
        hideDeleteModalAsync()
      }
    }

    const handleSubmit = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!qdeck) return
      //console.log(`Submitting ${title} ${descr} ${imprint} ${indate}`);
      setStateError('')
      setStateLoading(true)
      setUpdated(false)

      try {
        await API.graphql(
          graphqlOperation(updateQuoteBoard, {
            input: {
              id: qdeck.id,
              name: title,
              description: descr,
              imprintdesign: imprint,
              inhandsdate: indate,
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
        Delete deck
      </Button>
    )

    return (
      <Segment>
        {userStore.isAdmin || isDeckUser(qdeck, userStore.loginedUser.username) ? (
          <>
            <Form error={error !== null && error !== ''} onSubmit={handleSubmit}>
              <Message error header="Error" content={error} />
              <DateInput
                required
                name="indate"
                value={indate}
                onChange={indateHandler}
                duration={10}
                dateFormat="YYYY-MM-DD"
                closable
                closeOnMouseLeave={false}
                label="In hands date"
                placeholder="Select..."
                iconPosition="left"
              />
              <Form.Input {...bindTitle} required label="Title" type="text" placeholder="Quote deck title" />
              <Form.TextArea {...bindDescr} required label="Description" placeholder="About..." />
              <Form.TextArea {...bindImprint} required label="Imprint design" placeholder="Details..." />
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
            {!userStore.isAdmin && (
              <Divider horizontal section>
                <Header as="h4">
                  <Icon name="warning sign" color="red" />
                  Danger zone
                </Header>
                <Modal size="small" open={deleteModalOpen} trigger={deleteTrigger}>
                  <Modal.Header>Delete deck?</Modal.Header>
                  <Modal.Content>
                    <p>Are you sure you want to delete this deck with all of its products?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button negative loading={deleteProcessing} content="Yes, delete" onClick={handleDelete} />
                    <Button positive content="Cancel" onClick={hideDeleteModal} />
                  </Modal.Actions>
                </Modal>
              </Divider>
            )}
          </>
        ) : (
          <Message negative>
            <Message.Header>Unauthorized</Message.Header>
            <p>Sorry but you are not authorized to change settings of this quote deck.</p>
            {qdeck && (
              <p>
                <Link to={`/app/decks/${qdeck.id}`}>View deck</Link>
              </p>
            )}
          </Message>
        )}
      </Segment>
    )
  }
)

export default DeckSettings
