/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Table } from 'semantic-ui-react'
import moment from 'moment'
import { userNameFirstLast } from '../../utils/user-checks'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userList: { Users: Array<any> }
}

interface IUserAttrs {
  Name: string
  Value: string
}

const AdminUsersTable = ({ userList }: IProps) => (
  <Table size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Username</Table.HeaderCell>
        <Table.HeaderCell>Joined</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {userList &&
        userList.Users &&
        userList.Users.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userList.Users.map((user: any, i: number) => {
          const attrs = Object.assign({}, ...user.Attributes.map((item: IUserAttrs) => ({ [item.Name]: item.Value })))
          return (
            <Table.Row key={`row_${i}`}>
              <Table.Cell key={`c1_${i}`}>{userNameFirstLast(user.Username)}</Table.Cell>
              <Table.Cell key={`c2_${i}`}>{attrs.email}</Table.Cell>
              <Table.Cell key={`c3_${i}`}>{user.Username}</Table.Cell>
              <Table.Cell key={`c4_${i}`}>
                {moment(user.UserCreateDate)
                  .startOf('day')
                  .format('YYYY-MM-DD')}
              </Table.Cell>
            </Table.Row>
          )
        })}
    </Table.Body>
  </Table>
)

export default AdminUsersTable
