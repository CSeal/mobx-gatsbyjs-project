/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { navigate, Link } from 'gatsby'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import queryString from 'query-string'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {
  Segment,
  Card,
  List,
  Sticky,
  Checkbox,
  Button,
  Input,
  Grid,
  Responsive,
  Dropdown,
  Header,
  Icon,
} from 'semantic-ui-react'
import { StyledCard, CardCornerIcon } from '../elements'
import { quoteCardImgUrlCreater, onGetImageError } from '../utils/urls'
import { stringSimilarity } from '../utils/string-compare'
import { attributeFields, IShopItem } from '../utils/graphql'
import { GetShopQuery } from '../API'
import { attsPriceCentsIncr } from '../utils/attributes'

const count = (prodFields: Array<string | null>) => {
  const counts = new Map()
  prodFields.map(category => {
    if (category) {
      if (!counts.has(category)) {
        counts.set(category, 0)
      }
      counts.set(category, counts.get(category) + 1)
    }
    return category
  })
  return counts
}

const filterByCategories = (prodsPrev: Array<IShopItem>, categs: Set<string>) => {
  let prods = prodsPrev
  prods = prods.filter(prod => (prod && prod.productCategory ? categs.has(prod.productCategory) : false))
  return prods
}

const rankAndFilterBySearchQuery = (
  prodsPrev: Array<IShopItem>,
  query: string,
  sortSelection: string,
  scoreCutoff?: number
) => {
  // check for exact matches first
  const qsl = query.toLowerCase()
  const prodsExact = prodsPrev.filter(p => {
    if (!p) {
      return false
    }
    return p.productName.toLowerCase().includes(qsl) || p.productDescription.toLowerCase().includes(qsl)
  })
  if (prodsExact && prodsExact.length > 0) {
    return sortProducts(prodsExact, sortSelection)
  }

  // try fuzzy matching with ranking (sortSelection no longer relevant)
  const scoreMin: number = scoreCutoff || 0.1
  const prods = prodsPrev

  const scoredProds = prods
    .map((prod: IShopItem) => {
      //const sim: number = stringSimilarity(query, prod.productName + ' ' + prod.productDescription)
      const sim: number = stringSimilarity(query, prod ? prod.productName : '')
      return { score: sim, product: prod }
    })
    .sort((sp1, sp2): number => sp2.score - sp1.score)

  return scoredProds.filter(sp => sp.score > scoreMin).map(sp => sp.product)
}

const sortOptions: Array<{ key: string; text: string; value: string }> = [
  {
    key: 'recent',
    text: 'Recent',
    value: 'recent',
  },
  {
    key: 'priceLow',
    text: 'Price (low)',
    value: 'priceLow',
  },
  {
    key: 'priceHigh',
    text: 'Price (high)',
    value: 'priceHigh',
  },
]

const compareProductsOption = (sortOption: string) =>
  function(prevProd: IShopItem, nextProd: IShopItem) {
    if (!nextProd || !nextProd.updatedAt || !nextProd.pricecents) {
      return 1
    }
    if (!prevProd || !prevProd.updatedAt || !prevProd.pricecents) {
      return -1
    }
    const byRecency: boolean = moment(prevProd.updatedAt).isBefore(nextProd.updatedAt)
    if (sortOption === 'recent' || prevProd.pricecents === nextProd.pricecents) {
      return byRecency ? 1 : -1
    }
    if (sortOption === 'priceLow') {
      return prevProd.pricecents > nextProd.pricecents ? 1 : -1
    }
    if (sortOption === 'priceHigh') {
      return prevProd.pricecents > nextProd.pricecents ? -1 : 1
    }
    return 1
  }
const sortProducts = (prods: Array<IShopItem>, sortSelection: string): Array<IShopItem> =>
  prods.sort(compareProductsOption(sortSelection))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortCountMap = (a: any, b: any): number => b[1] - a[1]

interface IURLFilters {
  sort: string
  s?: string
  c?: string[]
}

interface IProps {
  shop: GetShopQuery['getShop']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any
  shopEditor: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopItemsFiltered = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ shop, location, shopEditor, userStore }: IProps): JSX.Element => {
    const imgSize: 'small' | 'large' | undefined = 'large'
    const responsiveMaxWidth = 767
    const contextRef: React.RefObject<HTMLDivElement> = React.createRef()
    const [isCategFolded, setIsCategFolded] = useState(false)
    const [loading, setLoading] = useState(true)

    // initial filter state should reflect URL parameters
    //  to preserve selections on browser back from e.g. product page
    const urlFilters = queryString.parse(location.search)
    //console.log(urlFilters)

    const setUrlFilters = (filters: IURLFilters) => {
      navigate(`${location.pathname}?${queryString.stringify(filters)}`)
    }

    const [sort, setSort] = useState(urlFilters.sort ? urlFilters.sort : 'recent')
    // add products in useEffect (prevent update unmounted etc. issues)
    const [products, setProducts] = useState<IShopItem[]>([])
    const filterscategoryInit: Set<string> = urlFilters.c
      ? Array.isArray(urlFilters.c)
        ? new Set(urlFilters.c)
        : new Set([urlFilters.c])
      : new Set()
    const [filtersCategory, setFiltersCategory] = useState(filterscategoryInit)
    const [searchQuery, setSearchQuery] = useState<string>(urlFilters.s ? (urlFilters.s as string) : '')

    const updateFilters = (urlNavigate: boolean, sortSelection: string, searchQueryIn: string, categs: Set<string>) => {
      let prods = shop && shop.sitems ? shop.sitems.items : ([] as Array<IShopItem>)
      if (prods && prods.length > 0) {
        if (!shopEditor) {
          // private products need to be removed for non-user
          prods = prods.filter(prod => (prod && prod.access ? prod.access === 'public' : false))
          if (prods.length === 0) {
            return
          }
        }
      } else {
        return
      }

      let filters: IURLFilters = { sort: sortSelection }

      if (categs.size > 0) {
        prods = filterByCategories(prods, categs)
        filters = { ...filters, ...{ c: Array.from(categs) } }
      }

      // apply search to already category-filtered product set
      if (searchQueryIn && searchQueryIn.length > 0) {
        filters = { ...filters, ...{ s: searchQueryIn } }
        setProducts(rankAndFilterBySearchQuery(prods, searchQueryIn, sortSelection))
      } else {
        // products must update even without URL navigation (e.g. in useEffect on mount)
        setProducts(sortProducts(prods, sortSelection))
      }

      if (urlNavigate) setUrlFilters(filters)
    }

    const filtersApplied = () => filtersCategory.size > 0 || (searchQuery && searchQuery.length > 0)

    const resetFilters = () => {
      window.scrollTo({ top: 0 })
      setSearchQuery('')
      setFiltersCategory(new Set() as Set<string>)
      updateFilters(true, sort, '', new Set() as Set<string>)
    }

    const applyCategoryFilters = (filts: Set<string>) => {
      setFiltersCategory(filts)
      updateFilters(true, sort, searchQuery, filts)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortChange = (_event: React.SyntheticEvent, data: any) => {
      if (data && data.value) {
        setSort(data.value)
        window.scrollTo({ top: 0 })
        updateFilters(true, data.value, searchQuery, filtersCategory)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const applySearchQuery = (_event: React.SyntheticEvent, data: any) => {
      if (data && data.value && data.value.length > 0) {
        setSearchQuery(data.value)
        updateFilters(true, sort, data.value, filtersCategory)
      } else {
        setSearchQuery('')
        updateFilters(true, sort, '', filtersCategory)
      }
    }

    // URL filters (if any) need to be applied on initial render
    useEffect(() => {
      updateFilters(false, sort, searchQuery, filtersCategory)
      setLoading(false)
    }, [userStore.isLoggedIn])

    const categLabel = (categ: string, cnt: number): JSX.Element => (
      <label>
        {categ} <div className="ui label circular">{cnt}</div>
      </label>
    )

    if (!shop) {
      return <></>
    }
    return (
      <Grid stackable padded divided columns={2}>
        <Grid.Column width={4}>
          <Sticky context={contextRef} offset={5}>
            <Segment raised padded>
              {!isCategFolded && (
                <>
                  <Input
                    size="small"
                    fluid
                    icon="search"
                    iconPosition="left"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={applySearchQuery}
                  />
                  <List size="mini">
                    {shop.sitems &&
                      shop.sitems.items &&
                      Array.from(
                        count(
                          shop.sitems.items.map(prod =>
                            prod && (shopEditor || prod.access === 'public') ? prod.productCategory : null
                          )
                        )
                      )
                        .sort(sortCountMap)
                        .map(([categ, cnt]) => (
                          <List.Item key={`item_${categ}`}>
                            <Checkbox
                              key={`checkbox_${categ}`}
                              label={categLabel(categ, cnt)}
                              checked={filtersCategory.has(categ)}
                              onChange={() => {
                                const filts = filtersCategory
                                if (filts.has(categ)) {
                                  filts.delete(categ)
                                } else {
                                  filts.add(categ)
                                }
                                applyCategoryFilters(filts)
                              }}
                            />
                          </List.Item>
                        ))}
                  </List>
                  <Dropdown fluid selection options={sortOptions} value={sort} onChange={sortChange} />
                  {filtersApplied() && (
                    <div style={{ paddingTop: '10px' }}>
                      <Button content="Clear All" size="small" onClick={resetFilters} />
                    </div>
                  )}
                  {shopEditor && (
                    <>
                      <Icon name="setting" size="small" />
                      <Link to={`/app/shops/${shop.id}`}>Shop settings</Link>
                    </>
                  )}
                  <Responsive maxWidth={responsiveMaxWidth}>
                    <div style={{ paddingTop: '10px' }} />
                  </Responsive>
                </>
              )}
              <Responsive
                maxWidth={responsiveMaxWidth}
                as={Button}
                size="small"
                content={isCategFolded ? 'Show selections' : 'Hide selections'}
                color="black"
                icon="list"
                onClick={() => setIsCategFolded(!isCategFolded)}
                onUpdate={() => setIsCategFolded(false)}
              />
            </Segment>
          </Sticky>
        </Grid.Column>
        <Grid.Column width={12}>
          <div ref={contextRef}>
            <Card.Group style={{ justifyContent: 'center' }}>
              {!loading && products.length > 0 ? (
                products.map((item: IShopItem) => {
                  if (!item || !item.pricecents || item.pricecents === 0) {
                    return null
                  }
                  // base price of products may be incremented by fixed attributes
                  const attrPriceIncrs: number[] = attributeFields.map(attr => {
                    const prodAttr = item[attr.field]
                    if (prodAttr && prodAttr.length && prodAttr.length === 1) {
                      return attsPriceCentsIncr(prodAttr[0])
                    }
                    return 0
                  })
                  const priceCentsBase = item.pricecents + attrPriceIncrs.reduce((i1: number, i2: number) => i1 + i2, 0)
                  return (
                    <StyledCard onClick={() => navigate(`item/${item.id}`)} key={`prodcard_${item.id}`}>
                      {item.access === 'private' && (
                        <CardCornerIcon>
                          <Icon size="large" name="privacy" />
                        </CardCornerIcon>
                      )}
                      <div className="productcard-prev-img-holder">
                        <LazyLoadImage
                          className="productcard-prev-img"
                          delayTime={50}
                          delayMethod="debounce"
                          threshold={800}
                          effect="blur"
                          alt={item.productName || ' '}
                          src={quoteCardImgUrlCreater(item.productImage, imgSize)}
                          onError={onGetImageError}
                        />
                      </div>
                      <Card.Content>
                        <Card.Header>{item.productName || ''}</Card.Header>
                        <Card.Description>{`$${(priceCentsBase / 100).toFixed(2)}`}</Card.Description>
                      </Card.Content>
                    </StyledCard>
                  )
                })
              ) : (
                <Segment loading={loading} placeholder>
                  <Header as="h4">{loading ? 'Loading...' : 'No results.'}</Header>
                  {!loading && (
                    <p>
                      <a onClick={resetFilters} style={{ cursor: 'pointer' }}>
                        Clear filters
                      </a>{' '}
                      or <Link to="/">browse product stream.</Link>
                    </p>
                  )}
                </Segment>
              )}
            </Card.Group>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
)

export default ShopItemsFiltered
