import React from 'react'
import { Link } from 'gatsby'
import { Table, Icon } from 'semantic-ui-react'
import { ShopsByStatusQuery } from '../../API'
import { userNameFirstLast } from '../../utils/user-checks'

interface IProps {
  shopList: ShopsByStatusQuery['shopsByStatus']
}

const AdminShopsTable = ({ shopList }: IProps) => (
  <Table size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Shop</Table.HeaderCell>
        <Table.HeaderCell>Owner</Table.HeaderCell>
        <Table.HeaderCell>Updated</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {shopList &&
        shopList.items &&
        shopList.items.map(shop => {
          if (shop) {
            return (
              <Table.Row key={`row_${shop.id}`}>
                <Table.Cell key={`c1_${shop.id}`}>
                  <Icon name={shop.status === 'live' ? 'check circle' : 'clock'} />
                  <Link to={`/app/shops/${shop.id}`}>{shop.seotitle}</Link>
                </Table.Cell>
                <Table.Cell key={`c2_${shop.id}`}>{userNameFirstLast(shop.owner || '')}</Table.Cell>
                <Table.Cell key={`c3_${shop.id}`}>{shop.updatedAt}</Table.Cell>
              </Table.Row>
            )
          }
          return null
        })}
    </Table.Body>
  </Table>
)

export default AdminShopsTable
