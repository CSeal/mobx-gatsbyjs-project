/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { withPrefix, Link } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Message, Table, Label, Icon, Form, Modal, Button } from 'semantic-ui-react'
import { isDeckUser, userNameFirstLast, getUserEmail } from '../utils/user-checks'
import { useInput } from '../utils/form-input/form-input'
import { updateQuoteBoard, sendemail, sendsnssiteadmin, deletedeckuserjoins } from '../utils/graphql'
import { GetQuoteBoardQuery } from '../API'

interface IProps {
  qdeck: GetQuoteBoardQuery['getQuoteBoard']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeckMembers = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ qdeck, userStore }: IProps): JSX.Element => {
    const [error, setError] = useState(false)
    const [invites, setInvites] = useState((qdeck && qdeck.invites ? qdeck.invites : []) as string[])
    const { value: newemail, bind: bindNewEmail, reset: resetNewEmail } = useInput('')
    const [sending, setSending] = useState(false)

    const [errorRemove, setErrorRemove] = useState(false)
    const [removeProcessing, setRemoveProcessing] = useState(false)
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    const [removeMember, setRemoveMember] = useState(false) //false to remove invite not member
    const [itemToRemove, setItemToRemove] = useState('')
    const showRemoveModal = (remMember: boolean, remItem: string) => {
      setRemoveMember(remMember)
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
      if (!qdeck) return
      setRemoveProcessing(true)

      if (removeMember && qdeck.members) {
        //console.log(`Removing member ${itemToRemove}`);
        const { members } = qdeck
        try {
          const removalIndex = members.indexOf(itemToRemove)
          if (removalIndex > -1) {
            members.splice(removalIndex, 1)

            // remove join-record for the user being removed
            const resp = await API.graphql(
              graphqlOperation(deletedeckuserjoins, {
                deckid: qdeck.id,
                usernames: [itemToRemove],
              })
            )
            if (!resp.data || !resp.data.deletedeckuserjoins) {
              setErrorRemove(true)
              setRemoveProcessing(false)
              return
            }

            // now update deck with user excluded to be removed
            await API.graphql(
              graphqlOperation(updateQuoteBoard, {
                input: {
                  id: qdeck.id,
                  members,
                },
              })
            )
          }
          setRemoveProcessing(false)
          setItemToRemove('')
          // reload the entire page to update qdeck-prop
          window.location.reload()
        } catch (err) {
          setErrorRemove(true)
          setRemoveProcessing(false)
        }
      } else {
        //console.log(`Removing invitation ${itemToRemove}`);
        try {
          const invitesTemp = invites
          const removalIndex = invites.indexOf(itemToRemove)
          if (removalIndex > -1) {
            invitesTemp.splice(removalIndex, 1)
            await API.graphql(
              graphqlOperation(updateQuoteBoard, {
                input: {
                  id: qdeck.id,
                  invites: invitesTemp,
                },
              })
            )
            setInvites(invitesTemp)
          }
          setRemoveProcessing(false)
          setItemToRemove('')
          hideRemoveModalAsync()
        } catch (err) {
          setErrorRemove(true)
          setRemoveProcessing(false)
        }
      }
    }

    const handleInvite = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!qdeck) return
      const email = newemail.toLowerCase()
      //console.log(`Inviting ${email}`);
      setError(false)
      setSending(true)

      try {
        await API.graphql(
          graphqlOperation(updateQuoteBoard, {
            input: {
              id: qdeck.id,
              invites: [...invites, email],
            },
          })
        )

        // recepient notification
        await API.graphql(
          graphqlOperation(sendemail, {
            sender: getUserEmail(userStore.getUserEmail),
            emailto: email,
            subject: `Merchacha quote deck invitation`,
            message: `You are invited to collaborate on a quote deck:\n ${withPrefix(
              `/app/decks/invites/${qdeck.id}`
            )}`,
          })
        )

        // admin notification
        await API.graphql(
          graphqlOperation(sendsnssiteadmin, {
            sender: getUserEmail(userStore.getUserEmail),
            subject: `New member invitation by `,
            message: `Invited ${email} to collaborate on a quote deck:\n ${withPrefix(`/app/decks/${qdeck.id}`)}`,
          })
        )

        setInvites([...invites, email])
        resetNewEmail()
        setSending(false)
      } catch (err) {
        console.log(err)
        setError(true)
        setSending(false)
      }
    }

    return (
      <Segment>
        {qdeck && (userStore.isAdmin || isDeckUser(qdeck, userStore.loginedUser.username)) ? (
          <>
            {itemToRemove && (
              <Modal size="small" open={removeModalOpen}>
                <Modal.Header>Remove {removeMember ? 'member' : 'invitation'}?</Modal.Header>
                <Modal.Content>
                  {errorRemove && <Message error header="Error" content="Remove operation failed" />}
                  <p>
                    Are you sure you want to remove {removeMember ? userNameFirstLast(itemToRemove) : itemToRemove}?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative loading={removeProcessing} content="Yes, remove" onClick={handleRemove} />
                  <Button positive content="Cancel" onClick={hideRemoveModal} />
                </Modal.Actions>
              </Modal>
            )}
            <Table size="small" style={{ marginBottom: '30px' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Label ribbon>{qdeck.owner ? userNameFirstLast(qdeck.owner) : ''}</Label>
                  </Table.Cell>
                  <Table.Cell>Creator</Table.Cell>
                  <Table.Cell />
                </Table.Row>
                {qdeck.members &&
                  qdeck.members.length > 0 &&
                  qdeck.members.map((uname, i: number) => {
                    if (!uname) return null
                    return (
                      <Table.Row key={`rowmember_${i}`}>
                        <Table.Cell key={`member_${i}`}>{userNameFirstLast(uname)}</Table.Cell>
                        <Table.Cell key={`status_${i}`}>Member</Table.Cell>
                        <Table.Cell key={`removeoption_${i}`}>
                          <Icon
                            name="delete"
                            color="red"
                            style={{ cursor: 'pointer' }}
                            key={`removecall_${i}`}
                            onClick={() => showRemoveModal(true, uname)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>
                    {qdeck.members && qdeck.members.length > 0 ? `${qdeck.members.length + 1} collaborators` : `1 user`}
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan="2" />
                </Table.Row>
              </Table.Footer>
            </Table>
            {invites && invites.length > 0 ? (
              <Table size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Invitation</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {invites.map((uemail: string, i: number) => (
                    <Table.Row key={`rowinvite_${i}`}>
                      <Table.Cell key={`invite_${i}`}>{uemail}</Table.Cell>
                      <Table.Cell key={`status_${i}`}>Pending</Table.Cell>
                      <Table.Cell key={`removeinvite_${i}`}>
                        <Icon
                          name="delete"
                          color="red"
                          style={{ cursor: 'pointer' }}
                          key={`removeinvitecall_${i}`}
                          onClick={() => showRemoveModal(false, uemail)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <p>No new invitations.</p>
            )}
            <Form error={error} onSubmit={handleInvite}>
              <Message error header="Error" content="User invitation failed" />
              <Form.Group>
                <Form.Input
                  required
                  type="email"
                  placeholder="Email..."
                  {...bindNewEmail}
                  iconPosition="left"
                  style={{ marginBottom: '10px' }}
                  loading={sending}
                >
                  <Icon name="add user" />
                  <input />
                </Form.Input>
                <Form.Button color="black" content="Invite" />
              </Form.Group>
            </Form>
          </>
        ) : (
          <Message negative>
            <Message.Header>Unauthorized</Message.Header>
            <p>Sorry but you are not authorized to manage members of this quote deck.</p>
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

export default DeckMembers
