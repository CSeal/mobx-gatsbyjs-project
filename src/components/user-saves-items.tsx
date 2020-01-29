/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { createGlobalStyle } from 'styled-components'
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch'
import initReactivesearch from '@appbaseio/reactivesearch/lib/server'
import datasources from '../../config/sources'
import { StyledContainerReactiveSearch, GlobalStylesSearch } from '../elements'
import StreamProductDetails from './product-details'
import { ResultElement } from '../types'
// styles moved out of product-details (for re-rendering performance)
import 'react-lazy-load-image-component/src/effects/blur.css'

const GlobalStylesSaves = createGlobalStyle`
 
  .card-list {
    padding: 15px 0;
  }
`

const reactiveSearchSettings = {
  settings: {
    app: datasources.appbaseApp,
    credentials: datasources.appbaseCredentials,
  },
  resultsListing: {
    componentId: 'results',
    size: 12,
    pagination: false,
    stream: false,
    dataField: '_score',
    sortBy: 'desc' as 'desc',
    showResultStats: false,
    className: 'card-list',
    innerClass: {
      poweredBy: 'poweredby',
    },
  },
}

interface IProps {
  productIds: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

type SearchReactiveSetState = {
  reactivedata: any | null
}

class SearchReactiveProdSet extends Component<IProps, SearchReactiveSetState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      reactivedata: null,
    } as SearchReactiveSetState
  }

  async componentDidMount() {
    const result = await initReactivesearch(
      [
        {
          ...reactiveSearchSettings.resultsListing,
          type: 'ReactiveList',
          source: ReactiveList,
        },
      ],
      null,
      reactiveSearchSettings.settings
    )
    this.setState({ reactivedata: result })
  }

  render() {
    const { reactivedata } = this.state
    // relying on non-zero length from user-saves.tsx (data.prodSavedsByUserId.items.length)
    const prod_scores = {} as { [key: string]: number }
    const prods_total = this.props.productIds.length
    this.props.productIds.forEach((prodId: string, i: number) => {
      prod_scores[prodId] = (prods_total - i) * 1000
    })

    return (
      <>
        <GlobalStylesSearch />
        <GlobalStylesSaves />
        <StyledContainerReactiveSearch>
          <ReactiveBase {...reactiveSearchSettings.settings} initialState={reactivedata}>
            <ReactiveList
              {...reactiveSearchSettings.resultsListing}
              defaultQuery={() => ({
                /*query: {
                  ids: {
                    //values: ["7253136", "7201862", "7252101", "552269343", "4939774"]
                    values: this.props.productIds
                  }
                }*/
                // preserve the order as provided in the productIds-array
                query: {
                  function_score: {
                    query: {
                      ids: {
                        values: this.props.productIds,
                      },
                    },
                    script_score: {
                      script: {
                        lang: 'painless',
                        params: {
                          scores: prod_scores,
                        },
                        inline:
                          "String prodid = String.valueOf(doc['Id'].value); if (params.scores.containsKey(prodid)) { return params.scores[prodid]; } return 1;",
                      },
                    },
                  },
                },
              })}
              aggregationField=""
              render={(reactiveListObject: any) => (
                <Card.Group style={{ justifyContent: 'center' }}>
                  {reactiveListObject.data.map((item: ResultElement) => (
                    <StreamProductDetails pitem={item} savedMode pageProps={this.props.pageProps} key={item.Id} />
                  ))}
                </Card.Group>
              )}
            />
          </ReactiveBase>
        </StyledContainerReactiveSearch>
      </>
    )
  }
}

export default SearchReactiveProdSet
