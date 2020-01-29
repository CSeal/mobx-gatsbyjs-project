/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { withPrefix } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import { Segment, Message, Table, Label, Icon, Form, Modal, Button, Popup } from 'semantic-ui-react'
import { isShopAdmin, userNameFirstLast, getUserEmail } from '../utils/user-checks'
import { useInput } from '../utils/form-input/form-input'
import { updateShop, inviteaddtoshop, sendemail, sendsnssiteadmin, deleteshopuserjoins } from '../utils/graphql'
import { GetShopQuery } from '../API'

interface IProps {
  shop: GetShopQuery['getShop']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopMembers = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ shop, userStore }: IProps): JSX.Element => {
    // member removal functionality is for shopadmins only
    const isAdmin: boolean = userStore.isAdmin || isShopAdmin(shop, userStore.loginedUser.username)

    const [error, setError] = useState(false)
    const [invites, setInvites] = useState((shop && shop.invites ? shop.invites : []) as string[])
    const { value: newemail, bind: bindNewEmail, reset: resetNewEmail } = useInput('')
    const [sending, setSending] = useState(false)

    const [errorRemove, setErrorRemove] = useState(false)
    const [removeProcessing, setRemoveProcessing] = useState(false)
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    // 'member', 'admin', or 'invite'
    const [removeMember, setRemoveMember] = useState<string>('')
    const [itemToRemove, setItemToRemove] = useState('')
    const showRemoveModal = (remMember: string, remItem: string) => {
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
      if (!shop || !isAdmin) return
      setRemoveProcessing(true)

      if (removeMember === 'invite' && shop.invites) {
        //console.log(`Removing invitation ${itemToRemove}`)

        try {
          const invitesTemp = invites
          const removalIndex = invites.indexOf(itemToRemove)
          if (removalIndex > -1) {
            invitesTemp.splice(removalIndex, 1)
            await API.graphql(
              graphqlOperation(updateShop, {
                input: {
                  id: shop.id,
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

        return
      }

      let users: Array<string | null> = []
      if (removeMember === 'member' && shop.members) {
        users = shop.members
      }
      if (removeMember === 'admin' && shop.shopadmins !== null && shop.shopadmins.length > 0) {
        users = shop.shopadmins
      }
      if (users.length > 0) {
        //console.log(`Removing user ${itemToRemove}`)

        try {
          const removalIndex = users.indexOf(itemToRemove)
          if (removalIndex > -1) {
            users.splice(removalIndex, 1)

            // remove join-record for the user being removed
            const resp = await API.graphql(
              graphqlOperation(deleteshopuserjoins, {
                shopid: shop.id,
                usernames: [itemToRemove],
              })
            )
            if (!resp.data || !resp.data.deleteshopuserjoins) {
              setErrorRemove(true)
              setRemoveProcessing(false)
              return
            }

            // now update shop with user excluded to be removed
            await API.graphql(
              graphqlOperation(updateShop, {
                input: {
                  id: shop.id,
                  shopadmins: removeMember === 'admin' ? users : shop.shopadmins,
                  members: removeMember === 'member' ? users : shop.members,
                },
              })
            )
          }
          setRemoveProcessing(false)
          setItemToRemove('')
          // reload the entire page to update shop-prop
          window.location.reload()
        } catch (err) {
          setErrorRemove(true)
          setRemoveProcessing(false)
        }
      }
    }

    const [errorPromote, setErrorPromote] = useState(false)
    const [promoteProcessing, setPromoteProcessing] = useState(false)
    const [promoteModalOpen, setPromoteModalOpen] = useState(false)
    const [userToPromote, setUserToPromote] = useState('')
    const showPromoteModal = (userPromote: string) => {
      setUserToPromote(userPromote)
      setPromoteModalOpen(true)
    }
    const hidePromoteModal = (event: React.SyntheticEvent) => {
      event.preventDefault()
      setUserToPromote('')
      setPromoteModalOpen(false)
    }
    const handlePromote = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!shop || !isAdmin) return
      setPromoteProcessing(true)

      // user to beecome admin must be among current members
      if (shop.members) {
        //console.log(`Promoting ${userToPromote} to shopadmin-status`)

        try {
          const membersTemp = shop.members
          const removalIndex = membersTemp.indexOf(userToPromote)
          if (removalIndex > -1) {
            membersTemp.splice(removalIndex, 1)

            await API.graphql(
              graphqlOperation(updateShop, {
                input: {
                  id: shop.id,
                  shopadmins: shop.shopadmins ? [...shop.shopadmins, userToPromote] : [userToPromote],
                  members: membersTemp,
                },
              })
            )
          }
          setPromoteProcessing(false)
          setUserToPromote('')
          // reload the entire page to update shop-prop
          window.location.reload()
        } catch (err) {
          setErrorPromote(true)
          setPromoteProcessing(false)
        }
      }
    }

    const handleInvite = async (event: React.SyntheticEvent): Promise<void | undefined> => {
      event.preventDefault()
      if (!shop) return
      const email = newemail.toLowerCase()
      setError(false)
      setSending(true)

      try {
        // members are not authorized to update shop type directly: add invite via lambda
        await API.graphql(
          graphqlOperation(inviteaddtoshop, {
            shopid: shop.id,
            inviteemail: email,
          })
        )

        // recepient notification
        await API.graphql(
          graphqlOperation(sendemail, {
            sender: getUserEmail(userStore.getUserEmail),
            emailto: email,
            subject: `Merchacha shop invitation`,
            message: `You are invited to collaborate on a shop:\n ${withPrefix(`/app/shops/invites/${shop.id}`)}`,
          })
        )

        // admin notification
        await API.graphql(
          graphqlOperation(sendsnssiteadmin, {
            sender: getUserEmail(userStore.getUserEmail),
            subject: `New member invitation by `,
            message: `Invited ${email} to join a shop:\n ${withPrefix(`/app/shops/${shop.id}`)}`,
          })
        )

        setInvites([...invites, email])
        resetNewEmail()
      } catch (err) {
        console.log(err)
        setError(true)
      }
      setSending(false)
    }

    const removeTrigger = (rmember: string, ritem: string): JSX.Element => (
      <Icon
        name="delete"
        color="red"
        style={{ cursor: 'pointer' }}
        key={`removecall_${ritem}`}
        onClick={() => showRemoveModal(rmember, ritem)}
      />
    )

    const promoteTrigger = (puser: string): JSX.Element => (
      <Icon
        name="id badge"
        color="green"
        style={{ cursor: 'pointer' }}
        key={`promotecall_${puser}`}
        onClick={() => showPromoteModal(puser)}
      />
    )

    return (
      <Segment>
        {itemToRemove && (
          <Modal size="small" open={removeModalOpen}>
            <Modal.Header>{`Remove ${removeMember}`}</Modal.Header>
            <Modal.Content>
              {errorRemove && <Message error header="Error" content="Remove operation failed" />}
              <p>
                {`Are you sure you want to remove ${
                  removeMember === 'invite' ? itemToRemove : userNameFirstLast(itemToRemove)
                }?`}
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative loading={removeProcessing} content="Yes, remove" onClick={handleRemove} />
              <Button positive content="Cancel" onClick={hideRemoveModal} />
            </Modal.Actions>
          </Modal>
        )}
        {userToPromote && (
          <Modal size="small" open={promoteModalOpen}>
            <Modal.Header>Make user an admin</Modal.Header>
            <Modal.Content>
              {errorPromote && <Message error header="Error" content="Operation failed" />}
              <p>{`Are you sure you want to make ${userToPromote} an admin of this shop?`}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button positive loading={promoteProcessing} content="Yes" onClick={handlePromote} />
              <Button color="grey" content="Cancel" onClick={hidePromoteModal} />
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
                <Label ribbon>{shop && shop.owner ? userNameFirstLast(shop.owner) : ''}</Label>
              </Table.Cell>
              <Table.Cell>Creator</Table.Cell>
              <Table.Cell />
            </Table.Row>
            {shop &&
              shop.shopadmins &&
              shop.shopadmins.length > 0 &&
              shop.shopadmins.map(uname => {
                if (!uname) return null
                return (
                  <Table.Row key={`rowadmin_${uname}`}>
                    <Table.Cell key={`admin_${uname}`}>{userNameFirstLast(uname)}</Table.Cell>
                    <Table.Cell key={`status_admin_${uname}`}>Admin</Table.Cell>
                    <Table.Cell key={`actionsadmin_${uname}`}>
                      {isAdmin && <Popup content="Remove admin" size="tiny" trigger={removeTrigger('admin', uname)} />}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            {shop &&
              shop.members &&
              shop.members.length > 0 &&
              shop.members.map(uname => {
                if (!uname) return null
                return (
                  <Table.Row key={`rowmember_${uname}`}>
                    <Table.Cell key={`member_${uname}`}>{userNameFirstLast(uname)}</Table.Cell>
                    <Table.Cell key={`status_${uname}`}>Member</Table.Cell>
                    <Table.Cell key={`actionsmember_${uname}`}>
                      {isAdmin && (
                        <>
                          <Popup content="Make admin" size="tiny" trigger={promoteTrigger(uname)} />
                          <Popup content="Remove member" size="tiny" trigger={removeTrigger('member', uname)} />
                        </>
                      )}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
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
              {invites.map((uemail: string) => (
                <Table.Row key={`rowinvite_${uemail}`}>
                  <Table.Cell key={`invite_${uemail}`}>{uemail}</Table.Cell>
                  <Table.Cell key={`status_${uemail}`}>Pending</Table.Cell>
                  <Table.Cell key={`removeinvite_${uemail}`}>
                    {isAdmin && <Popup content="Remove invite" size="tiny" trigger={removeTrigger('invite', uemail)} />}
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
      </Segment>
    )
  }
)

export default ShopMembers
