import React from 'react'
import { Link } from 'gatsby'
import { Table, Icon } from 'semantic-ui-react'
import { IStoreItem } from '../../utils/graphql'

interface IProps {
  itemList: IStoreItem[]
  itemType: 'deck' | 'shop'
}

const AdminStoreItemsTable = ({ itemList, itemType }: IProps) => (
  <Table size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Product</Table.HeaderCell>
        <Table.HeaderCell>{itemType === 'deck' ? 'Quote deck' : 'Shop'}</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Updated</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {itemList &&
        itemList.length > 0 &&
        itemList.map(sitem => {
          if (sitem) {
            return (
              <Table.Row key={`row_${sitem.id}`}>
                <Table.Cell key={`c1_${sitem.id}`}>
                  {itemType === 'deck' ? (
                    <Link to={`/app/admin/quoteitem/${sitem.id}`}>{sitem.productName}</Link>
                  ) : (
                    <Link to={`/app/admin/shopitem/${sitem.id}`}>{sitem.productName}</Link>
                  )}
                </Table.Cell>
                <Table.Cell key={`c2_${sitem.id}`}>
                  {sitem.board && sitem.board.id && (
                    <>
                      <Icon name={sitem.board.pendingquotes ? 'clock' : 'check circle'} />
                      <Link to={`/app/decks/${sitem.board.id}`}>{sitem.board.name}</Link>
                    </>
                  )}
                  {sitem.shop && sitem.shop.id && (
                    <>
                      <Icon name={sitem.shop.status === 'live' ? 'check circle' : 'clock'} />
                      <Link to={`/app/shops/${sitem.shop.id}`}>{sitem.shop.seotitle}</Link>
                    </>
                  )}
                </Table.Cell>
                <Table.Cell key={`c3_${sitem.id}`}>{sitem.quantity}</Table.Cell>
                <Table.Cell key={`c4_${sitem.id}`}>
                  {sitem.pricecents && sitem.pricecents > 0 ? `$${(sitem.pricecents / 100).toFixed(2)}` : ''}
                </Table.Cell>
                <Table.Cell key={`c5_${sitem.id}`}>{sitem.updatedAt}</Table.Cell>
              </Table.Row>
            )
          }
          return null
        })}
    </Table.Body>
  </Table>
)

export default AdminStoreItemsTable
