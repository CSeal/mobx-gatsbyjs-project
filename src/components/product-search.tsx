/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import { Icon, Sticky } from 'semantic-ui-react'
import Headroom from 'react-headroom'
import Slider from 'react-slick'
import {
  ReactiveBase,
  DataSearch,
  SingleDropdownList,
  SingleDropdownRange,
  SelectedFilters,
  ReactiveList,
} from '@appbaseio/reactivesearch'
import uniqBy from 'lodash/uniqBy'
import initReactivesearch from '@appbaseio/reactivesearch/lib/server'
import { StyledContainerReactiveSearch, GlobalStylesSearch } from '../elements'
import ProductSearchResults from './product-search-results'
import QuoteBoardsSlider from './quoteBoardsSlider'
import theme from '../../config/theme'
import datasources from '../../config/sources'
import Layout from './layout'
import TrendingInquiry from './products-trending-inquiry'
import { GetSliderItemQuery } from '../API'
import { sliderImgUrlCreater, locationPathCreater } from '../utils/urls'
// styles for react-slick
import '../utils/slider.css'
import '../utils/slider-theme.css'
// styles moved out of product-details (for re-rendering performance)
import 'react-lazy-load-image-component/src/effects/blur.css'

const MainSliderStyles = createGlobalStyle`

.mainSlider {
  height: 300px;
  position: relative;
  z-index: 1;
}

.mainSlider .mainSliderItem {
  height: 300px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  font-size: 30px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
}

.mainSlider .slick-arrow-next,
.mainSlider .slick-arrow-prev {
  background-color: #dcddde4d;
  height: 100%;
  top: 0;
  margin-top: auto;
}

.mainSlider .slick-arrow.slick-next:hover,
.mainSlider .slick-arrow.slick-prev:hover {
  background-color: #dcddde85;
}

.mainSlider .slick-arrow.slick-next {
  right: 0;
}

.mainSlider .slick-arrow.slick-prev {
  left: 0;
}

.mainSlider .slick-dots li {
  width: 8px;
  height: 8px;
  margin-left: 10px;
  margin-right: 10px;
}

.mainSlider .slick-dots button {
  box-shadow: 0 0 3px 0px #000;
  border: 3px solid #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.mainSlider .slick-dots li.slick-active button {
  background: #000;
}

.mainSlider .slick-dots button:before {
  display: none;
}

.mainSlider .slick-dots {
  bottom: 15px;
}
`

const SearchFilterControls = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 50px;
  flex-wrap: wrap;
  width: calc(100% - 200px);
  min-height: 93px;

  @media only screen and (max-width: 998px) {
    width: calc(290px + 290px + 18px);
    margin-left: auto;
    margin-right: auto;

    .pricerange {
      margin-left: auto;
    }
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    .category {
      width: 35%;

      .category-select {
        max-width: initial;
      }
    }

    .datasearch {
      width: 40%;

      .searchbox {
        width: 100%;
      }
    }

    .pricerange {
      width: 22%;

      .pricerange-select {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 495px) {
    .category,
    .datasearch {
      width: 50%;
      margin-bottom: 10px;
    }

    .pricerange {
      width: 100%;
    }
  }

  .mainFiltersSelected {
    width: 100%;
    padding-top: 17px;
    display: none;
  }

  .mainFiltersSelected.show {
    display: block;
  }

  .mainFiltersShowBtn {
    display: block;
    background-color: ${theme.colors.mlightgrey};
    text-align: center;
    padding: 9px 0;
    color: #000;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: Quicksand, 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    font-size: 15px;
  }

  @media only screen and (min-width: 998px) {
    .mainFiltersSelected {
      display: block !important;
    }

    .mainFiltersShowBtn {
      display: none;
    }
  }
`

const HeadRoomWrapper = styled(Headroom)`

  .headroom {
    background-color: rgba(255, 255, 255, 0.9);
    left: 0;
    top: 0;
    right: 0;
  }

  .headroom--unfixed {
    position: relative;
    transform: translateY(0%);
    -ms-transform: translateY(0%);
    -webkit-transform: translateY(0%);
    -o-transform: translateY(0%);
    -moz-transform: translateY(0%);
  }

  .headroom--unpinned {
    position: fixed;
    transform: translateY(-400px);
    -ms-transform: translateY(-400px);
    -webkit-transform: translateY(-400px);
    -o-transform: translateY(-400px);
    -moz-transform: translateY(-400px);
  }

  .headroom--pinned {
    position: fixed;
    transform: translateY(0%);
  }
  .headroom--scrolled {
    transition: transform 200ms ease-in-out;
  }
  .headroom--scrolled > div {
    margin-top: 0px;
    width: 100%;
    min-height: 0;
    margin: 0 auto;
    max-width: 1207px;
  }
  @media only screen and (max-width: 767px){
    .headroom--scrolled > div {
      padding-left: 1em !important;
      padding-right: 1em !important;
      box-sizing: border-box;
    }
  }
  @media only screen and (max-width: 991px) and (min-width: 768px){
    .headroom--scrolled > div {
      width: 598px;
    }
  }

  @media only screen and (max-width: 1199px) and (min-width: 992px){
    .headroom--scrolled > div {
      width: 933px;
    }
  }

  }
`

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: '10px',
  arrows: false,
  lazyLoad: 'progressive',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const reactiveSearchSettings = {
  settings: {
    app: datasources.appbaseApp,
    credentials: datasources.appbaseCredentials,
    theme: {
      typography: {
        fontFamily: '"Work Sans", -apple-system, "Roboto", "Helvetica", "Arial", sans-serif',
      },
      colors: {
        textColor: '#424242',
        primaryTextColor: '#fff',
        primaryColor: '#0B6AFF',
        titleColor: '#424242',
        alertColor: '#d9534f',
      },
    },
  },
  dataSearcher: {
    componentId: 'product',
    dataField: ['Name', 'Name.raw', 'ShortDescription'],
    fieldWeights: [2, 2, 1],
    queryFormat: 'and' as 'and',
    react: {
      and: ['category', 'priceFilter'],
    },
    customQuery(search_term: string | number) {
      if (!search_term || isNaN(search_term as number)) {
        return null
      }
      // numeric value: treat as product id
      if (parseInt(search_term as string, 10) < 10000) {
        // small numbers to still be treated as search terms in text fields
        return null
      }
      return {
        query: {
          ids: { values: [search_term] },
        },
      }
    },
    autosuggest: false,
    debounce: 2000,
    className: 'datasearch',
    innerClass: {
      input: 'searchbox',
    },
    showIcon: false,
    showClear: true,
    showFilter: false,
    filterLabel: 'Search',
    placeholder: 'Search',
    URLParams: true,
  },
  searchSingleDropdownList: {
    componentId: 'category',
    dataField: 'Mcategory.keyword',
    sortBy: 'count' as 'count',
    react: {
      and: ['product', 'priceFilter'],
    },
    showCount: true,
    className: 'category',
    innerClass: {
      select: 'category-select',
      list: 'category-list',
    },
    showSearch: false,
    placeholder: 'All',
    showFilter: true,
    filterLabel: 'Category',
    // IMPORTANT not to set true here for onClear refresh to work;
    // URL get params still work when page loads, e.g.:
    // http://localhost:8000/?category=%22Awards%22
    // HOWEVER: further category changes in that case do not work
    URLParams: false,
    // eslint-disable-next-line react/display-name
    renderNoResults: () => <div style={{ paddingRight: '80px' }} />,
  },
  searchSingleDropdownRange: {
    componentId: 'priceFilter',
    dataField: 'PriceMinCents',
    react: {
      and: ['product', 'category'],
    },
    data: [
      { start: 10000, end: 100000000, label: '$ 100 up' },
      { start: 8500, end: 10000, label: '$ 85 - 100' },
      { start: 5000, end: 8500, label: '$ 50 - 85' },
      { start: 2500, end: 5000, label: '$ 25 - 50' },
      { start: 1500, end: 2500, label: '$ 15 - 25' },
      { start: 500, end: 1500, label: '$ 5 - 15' },
      { start: 1, end: 500, label: '$ 0 - 5' },
    ],
    className: 'pricerange',
    innerClass: {
      select: 'pricerange-select',
      list: 'pricerange-list',
    },
    placeholder: 'Price',
    showFilter: true,
    filterLabel: 'Price',
    // IMPORTANT not to set true here for onClear refresh to work
    URLParams: false,
  },
  searchSelectedFilters: {
    innerClass: {
      button: 'selectedfilters',
    },
    // prevent stale results on category clear
    onClear: (component: string) => {
      if (component === 'category') window.location.reload()
    },
  },
  resultsListing: {
    componentId: 'results',
    react: {
      and: ['category', 'product', 'priceFilter'],
    },
    /*react: {
      and: ["category", "priceFilter"],
      or: ["product"]
    },*/
    size: 12,
    showLoader: true,
    pagination: false,
    infiniteScroll: true,
    scrollOnChange: true,
    defaultQuery: () => ({
      query: {
        function_score: { random_score: {} },
      },
    }),
    stream: false,
    dataField: '_score',
    sortOptions: [
      { dataField: '_score', sortBy: 'desc' as 'desc', label: 'Best Match' },
      {
        dataField: 'PriceMinCents',
        sortBy: 'asc' as 'asc',
        label: 'Price (Low to High)',
      },
      {
        dataField: 'PriceMinCents',
        sortBy: 'desc' as 'desc',
        label: 'Price (High to Low)',
      },
    ],
    defaultSortOption: 'Best Match',
    showResultStats: false,
    className: 'results',
    innerClass: {
      sortOptions: 'resultsort',
      resultsInfo: 'resultsinfo',
      poweredBy: 'poweredby',
    },
    // eslint-disable-next-line react/display-name
    renderNoResults: () => <div style={{ marginBottom: '15px' }}>No Results found.</div>,
  },
}

interface ISelectedFilters {
  [filterName: string]: ISelectedFilter
}

interface ISelectedFilter {
  URLParams: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any
  componentType: string
  label: string
  showFilter: boolean
  value: string | object
}

interface IProps {
  sliderItems: Array<GetSliderItemQuery['getSliderItem']>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

type SearchReactiveState = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactivedata: any | null
  hasSelectedFilters: boolean
  filtersShow: boolean
}

class SearchReactive extends Component<IProps, SearchReactiveState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      reactivedata: null,
      hasSelectedFilters: false,
      filtersShow: false,
    } as SearchReactiveState
  }

  async componentDidMount() {
    // reactivesearch setup
    const result = await initReactivesearch(
      [
        {
          ...reactiveSearchSettings.dataSearcher,
          type: 'DataSearch',
          source: DataSearch,
        },
        {
          ...reactiveSearchSettings.searchSingleDropdownList,
          type: 'SingleDropdownList',
          source: SingleDropdownList,
        },
        {
          ...reactiveSearchSettings.searchSingleDropdownRange,
          type: 'SingleDropdownRange',
          source: SingleDropdownRange,
        },
        {
          ...reactiveSearchSettings.searchSelectedFilters,
          type: 'SelectedFilters',
          source: SelectedFilters,
        },
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

  //filtersShow = () => this.setState({ filtersShow: !this.state.filtersShow })
  filtersShow = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const prevFiltersShow = this.state.filtersShow
    this.setState({ filtersShow: !prevFiltersShow })
  }

  filtersChangeHandler = (selectedFilters: ISelectedFilters): void => {
    let hasSelectedFilters = false
    if (selectedFilters) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in selectedFilters) {
        if (selectedFilters[key].showFilter && selectedFilters[key].value) {
          hasSelectedFilters = true
          break
        }
      }
    }
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasSelectedFilters !== hasSelectedFilters) {
      this.setState({
        hasSelectedFilters,
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderAllResults = (reactiveListObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any[] = uniqBy(reactiveListObject.data, 'Id')
    // eslint-disable-next-line react/destructuring-assignment
    return <ProductSearchResults {...reactiveListObject} data={data} pageProps={this.props.pageProps} />
  }

  render() {
    const { reactivedata, hasSelectedFilters, filtersShow } = this.state
    const { pageProps, sliderItems } = this.props
    const activeUri = locationPathCreater(pageProps)

    return (
      <Layout seotitle="Branded products stream - Merchacha" activeUri={activeUri}>
        <QuoteBoardsSlider />
        <Slider className="mainSlider" {...sliderSettings}>
          {sliderItems &&
            sliderItems.length > 0 &&
            sliderItems.map(item => {
              if (!item) return null
              // parent div title-tag serves the role of alt-tag for css backgroundimage:
              // https://stackoverflow.com/a/17126523
              return (
                <Link to={item.uri} key={item.id}>
                  <div
                    className="mainSliderItem"
                    title={item.seoalt}
                    style={{ backgroundImage: `url(${sliderImgUrlCreater(item.image)})` }}
                  />
                </Link>
              )
            })}
        </Slider>
        <TrendingInquiry />
        <div className="test-classs">
          <MainSliderStyles />
          <GlobalStylesSearch />
          <StyledContainerReactiveSearch>
            <ReactiveBase {...reactiveSearchSettings.settings} initialState={reactivedata}>
              <Sticky>
                <HeadRoomWrapper pinStart={560} disableInlineStyles>
                  <SearchFilterControls>
                    <SingleDropdownList {...reactiveSearchSettings.searchSingleDropdownList} />
                    <DataSearch {...reactiveSearchSettings.dataSearcher} />
                    <SingleDropdownRange {...reactiveSearchSettings.searchSingleDropdownRange} />
                    {hasSelectedFilters && (
                      <div className="mainFiltersShowBtn" onClick={this.filtersShow}>
                        <Icon size="small" name="filter" color="yellow" />
                        Filters
                      </div>
                    )}
                    <SelectedFilters
                      className={filtersShow ? 'mainFiltersSelected show' : 'mainFiltersSelected'}
                      {...reactiveSearchSettings.searchSelectedFilters}
                      onChange={this.filtersChangeHandler}
                    />
                  </SearchFilterControls>
                </HeadRoomWrapper>
              </Sticky>
              <ReactiveList
                {...reactiveSearchSettings.resultsListing}
                aggregationField=""
                render={this.renderAllResults}
                className="mainGoodsList"
              />
            </ReactiveBase>
          </StyledContainerReactiveSearch>
        </div>
        <div style={{ paddingTop: '20px' }} />
      </Layout>
    )
  }
}

export default SearchReactive
