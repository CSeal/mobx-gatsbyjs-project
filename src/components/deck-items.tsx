import React from 'react'
import { Segment, Card } from 'semantic-ui-react'
import QuotedItem from './quote-item-details'
import { GetQuoteBoardQuery } from '../API'
import { GlobalStylesSearch } from '../elements'
// styles moved out of product-details (quote-item-details)
//  (for re-rendering performance)
import 'react-lazy-load-image-component/src/effects/blur.css'

interface IProps {
  qdeck: GetQuoteBoardQuery['getQuoteBoard']
}

const DeckItems = ({ qdeck }: IProps) => (
  <>
    <GlobalStylesSearch />
    {qdeck && qdeck.qitems && qdeck.qitems.items && qdeck.qitems.items.length > 0 ? (
      <Card.Group style={{ justifyContent: 'center' }}>
        {qdeck.qitems.items.map(qitem => {
          if (!qitem) {
            return null
          }
          return <QuotedItem quoteItem={qitem} quoteDeckId={qdeck.id} key={qitem.id} />
        })}
      </Card.Group>
    ) : (
      <Segment>
        <p>No items in this quote deck yet.</p>
      </Segment>
    )}
  </>
)

export default DeckItems
