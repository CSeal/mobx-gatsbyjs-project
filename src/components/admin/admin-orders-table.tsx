import React from 'react'
import { Link } from 'gatsby'
import { Table } from 'semantic-ui-react'
import { GetOrderQuery } from '../../API'
import { userNameFirstLast } from '../../utils/user-checks'
import { orderTotalUSD } from '../../utils/calcs'

interface IProps {
  orderList: Array<GetOrderQuery['getOrder']> //OrderByStatusQuery['orderByStatus']
}

const AdminOrdersTable = ({ orderList }: IProps) => (
  <Table size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Order ID</Table.HeaderCell>
        <Table.HeaderCell>Order date</Table.HeaderCell>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Items</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {orderList &&
        orderList.map(order => {
          if (!order) return null
          const orderId = order.id
          return (
            <Table.Row key={`row_${orderId}`}>
              <Table.Cell key={`ordid_${orderId}`}>
                <Link to={`/app/order/${orderId}`}>{orderId}</Link>
              </Table.Cell>
              <Table.Cell key={`date_${orderId}`}>{order.createdAt ? order.createdAt.substring(0, 10) : ''}</Table.Cell>
              <Table.Cell key={`user_${orderId}`}>{userNameFirstLast(order.username)}</Table.Cell>
              <Table.Cell key={`Nitems_${orderId}`}>
                {order.products && order.products.items ? order.products.items.length : ''}
              </Table.Cell>
              <Table.Cell key={`total_${orderId}`}>{`$${orderTotalUSD(order).toFixed(2)}`}</Table.Cell>
            </Table.Row>
          )
        })}
    </Table.Body>
  </Table>
)

export default AdminOrdersTable
