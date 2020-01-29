import React from 'react'
import isEqual from 'lodash/isEqual'
import { Card } from 'semantic-ui-react'
import StreamProductDetails from './product-details'
import { ResultElement } from '../types'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

function searchResultsShouldUpdate(prevProps: IProps, currentProps: IProps) {
  if (!isEqual(prevProps.data, currentProps.data)) {
    return prevProps.loading === currentProps.loading
  }
  return true
}

const ProductSearchResults = (props: IProps): JSX.Element => {
  const { data, pageProps } = props
  return (
    <Card.Group style={{ justifyContent: 'center' }}>
      {data.map((item: ResultElement) => (
        <StreamProductDetails pitem={item} savedMode={false} pageProps={pageProps} key={item.Id} />
      ))}
    </Card.Group>
  )
}

export default React.memo(ProductSearchResults, searchResultsShouldUpdate)
