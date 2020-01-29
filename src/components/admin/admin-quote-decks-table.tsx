import React from 'react'
import { Link } from 'gatsby'
import { Table } from 'semantic-ui-react'
import moment from 'moment'
import { ListQuoteBoardsQuery } from '../../API'
import { userNameFirstLast } from '../../utils/user-checks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const decksSortInhandsDate = (prevDeck: any, nextDeck: any): number =>
  // earliest in-hands decks first
  moment(prevDeck.inhandsdate).isBefore(nextDeck.inhandsdate) ? -1 : 1

interface IProps {
  qdeckList: ListQuoteBoardsQuery['listQuoteBoards']
}

const AdminQuoteDecksTable = ({ qdeckList }: IProps) => (
  <Table size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Quote deck</Table.HeaderCell>
        <Table.HeaderCell>Owner</Table.HeaderCell>
        <Table.HeaderCell>In hands</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {qdeckList &&
        qdeckList.items &&
        qdeckList.items.sort(decksSortInhandsDate).map(deck => {
          if (!deck) return null
          return (
            <Table.Row key={`row_${deck.id}`}>
              <Table.Cell key={`name_${deck.id}`}>
                <Link to={`/app/decks/${deck.id}`}>{deck.name}</Link>
              </Table.Cell>
              <Table.Cell key={`owner_${deck.id}`}>{deck.owner ? userNameFirstLast(deck.owner) : ''}</Table.Cell>
              <Table.Cell key={`date_${deck.id}`}>{deck.inhandsdate}</Table.Cell>
            </Table.Row>
          )
        })}
    </Table.Body>
  </Table>
)

export default AdminQuoteDecksTable
