import React from 'react'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import { Segment, Header } from 'semantic-ui-react'
import SearchReactiveProdSet from './user-saves-items'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favoriteProductsStore: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserFavourites = compose<any, any>(
  inject('favoriteProductsStore'),
  observer
)(
  ({ favoriteProductsStore, pageProps }: IProps): JSX.Element => (
    <>
      {favoriteProductsStore.favoriteProductIds && favoriteProductsStore.favoriteProductIds.length > 0 ? (
        <SearchReactiveProdSet
          productIds={
            // https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map/24806827
            favoriteProductsStore.favoriteProductIds.reduce(function(result: string[], item: string) {
              if (item) result.push(item)
              return result
            }, [] as string[])
          }
          pageProps={pageProps}
        />
      ) : (
        <Segment>
          <Header as="h3">No saved products yet...</Header>
        </Segment>
      )}
    </>
  )
)

export default UserFavourites
