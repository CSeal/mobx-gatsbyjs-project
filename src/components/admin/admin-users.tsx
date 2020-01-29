import React, { useState } from 'react'
import { Auth, API } from 'aws-amplify'
import { Button, Segment, Loader, Message } from 'semantic-ui-react'
import AdminUsersTable from './admin-users-table'

// Admin API settings
const apiName = 'AdminQueries'
const usersGroup = 'users'

const AdminUsers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userList, updateUserList] = useState<null | { Users: Array<any> }>(null)
  const [nextToken, updateNextToken] = useState<null | string>(null)

  const listUsers = async (limit?: number) => {
    const limitPerCall = !limit ? 50 : limit
    setLoading(true)
    try {
      const path = '/listUsersInGroup'
      const adminQuery = {
        queryStringParameters: {
          groupname: usersGroup,
          limit: limitPerCall,
          token: nextToken,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      }
      const { NextToken, ...resp } = await API.get(apiName, path, adminQuery)
      updateNextToken(NextToken)
      //console.log(resp);
      updateUserList(userList ? { Users: [...userList.Users, ...resp.Users] } : resp)
    } catch (err) {
      console.log('error: ', err)
      setError(true)
    }
    setLoading(false)
  }

  return (
    <Segment>
      {!userList && <Button onClick={() => listUsers()} content="List users" color="purple" size="small" />}
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>User listing query failed... Try reloading this page.</p>
            </Message>
          )}
          {userList && userList.Users && userList.Users.length > 0 && (
            <>
              <AdminUsersTable userList={userList} />
              {nextToken && <Button onClick={() => listUsers()} content="More..." color="purple" size="small" />}
            </>
          )}
        </>
      )}
    </Segment>
  )
}

export default AdminUsers
