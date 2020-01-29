/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { graphql } from 'gatsby'
import rootStore from '../models/RootModel'
import SearchReactive from '../components/product-search'
import { GetSliderItemQuery, SliderItemByStatusQuery } from '../API'

interface IProps {
  uri: string
  data: {
    shops: {
      sliderItemByStatus: SliderItemByStatusQuery['sliderItemByStatus']
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Stream = (props: IProps) => {
  const { userStore } = rootStore

  if (!userStore.manualCancelModalClose) {
    userStore.setManualCancelModalClose(true)
    userStore.setRouteToForwardAfterCancel(null)
  }

  return (
    <SearchReactive
      sliderItems={
        props.data.shops.sliderItemByStatus &&
        props.data.shops.sliderItemByStatus.items &&
        props.data.shops.sliderItemByStatus.items.length > 0
          ? props.data.shops.sliderItemByStatus.items
          : ([] as Array<GetSliderItemQuery['getSliderItem']>)
      }
      pageProps={props}
    />
  )
}

export default Stream

export const query = graphql`
  query SliderItemByStatus {
    shops {
      sliderItemByStatus(status: "enabled", sortDirection: DESC, limit: 20) {
        items {
          id
          seoalt
          uri
          image
        }
      }
    }
  }
`
