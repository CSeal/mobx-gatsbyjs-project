/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { graphql, Link, navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import { Segment, Form, Button, Icon, Header, Message, Grid } from 'semantic-ui-react'
import Slider from 'react-slick'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Layout from '../components/layout'
import { attributeFields, createCartItem } from '../utils/graphql'
import { GetShopItemQuery } from '../API'
import { useInput } from '../utils/form-input/form-input'
import { quoteCardImgUrlCreater, onGetImageError } from '../utils/urls'
import { attsPriceCentsIncr, attsPriceCentsIncrTotal, attrText, attrDropdownOption } from '../utils/attributes'
import { IDropDownMenuItems } from '../elements/interface'
// product-details and deck-items styles
import { GlobalStylesSearch, settingsReactSlickSlider, QuantityInput } from '../elements'
import 'react-lazy-load-image-component/src/effects/blur.css'

const imgSize: 'small' | 'large' | undefined = 'large'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  pageContext: {
    id: string
    name: string
  }
  data: {
    shops: {
      getShopItem: GetShopItemQuery['getShopItem']
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShopProduct = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ userStore, pageContext, data }: IProps): JSX.Element => {
    const shopItem = data.shops.getShopItem
    if (!shopItem || !shopItem.shop) {
      // should not happen with product pages
      return <></>
    }

    const isShopEditor = (): boolean => {
      if (userStore.isLoggedIn) {
        if (userStore.isAdmin) {
          return true
        }
        const { shop } = shopItem
        if (!shop) {
          return false
        }
        const currentUser = userStore.loginedUser.username
        if (!currentUser) {
          return false
        }
        if (shop.owner && shop.owner === currentUser) {
          return true
        }
        if (shop.shopadmins && shop.shopadmins.includes(currentUser)) {
          return true
        }
        if (shop.members && shop.members.includes(currentUser)) {
          return true
        }
      }
      return false
    }
    const shopEditor = isShopEditor()

    const [addToCartProcessing, setAddToCartProcessing] = useState(false)
    const [addToCartError, setAddToCartError] = useState('')
    const [showCartQty, setShowCartQty] = useState('')
    // quantity not to be reset: useState initialization from min. Qty
    const minQuantity = shopItem.quantity || 1
    const { value: quantity, bind: bindQuantity, setValue: setQuantity } = useInput(`${minQuantity}`)
    // selected attributes kept only for attributes with more than one option
    const selectedAttrsInit = new Map<string, string | null>()
    attributeFields.forEach(attr => {
      const prodAttr = shopItem[attr.field]
      if (prodAttr && prodAttr.length && prodAttr.length > 1) {
        selectedAttrsInit.set(attr.text, null)
      }
    })
    const [selectedAttrs, setSelectedAttrs] = useState(selectedAttrsInit)

    // attributes without multiple selection options (i.e. single entries) may increment price
    const attrPriceIncrs: number[] = attributeFields.map(attr => {
      const prodAttr = shopItem[attr.field]
      if (prodAttr && prodAttr.length && prodAttr.length === 1) {
        return attsPriceCentsIncr(prodAttr[0])
      }
      return 0
    })
    const attrPriceIncrTotal = attrPriceIncrs.reduce((i1: number, i2: number) => i1 + i2, 0)
    const priceCentsBase: number = shopItem.pricecents ? shopItem.pricecents + attrPriceIncrTotal : 0
    const [priceCents, setPriceCents] = useState(priceCentsBase)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateAttrsAndPrice = (_event: React.SyntheticEvent, datain: any): void => {
      const selectedAttrsUpd = selectedAttrs
      if (datain.id && datain.value) {
        selectedAttrsUpd.set(datain.id, datain.value)
        // clear "added to cart" if there was such a message: attributes changed
        setShowCartQty('')
      }
      setPriceCents(priceCentsBase + attsPriceCentsIncrTotal(selectedAttrsUpd))
      setSelectedAttrs(selectedAttrsUpd)
    }

    const addToCartSubmit = async (): Promise<void | undefined> => {
      if (!shopItem || !shopItem.shop) {
        return
      }
      if (!userStore.isLoggedIn) {
        userStore.modalOpenAsLoginWithCallback(() => addToCartSubmit())
        return
      }

      if (!quantity || parseInt(quantity, 10) < minQuantity) {
        setAddToCartError(`Minimum quantity ${minQuantity} required`)
        return
      }

      let errText = ''
      if (selectedAttrs.size > 0) {
        // attributes options are available to be selected
        selectedAttrs.forEach((avalue, akey) => {
          if (!avalue) {
            errText = `${akey} is required`
          }
        })
      }
      if (errText !== '') {
        setAddToCartError(errText)
        return
      }

      setAddToCartError('')
      setAddToCartProcessing(true)

      const cartItem = {
        username: userStore.loginedUser.username,
        pitemId: shopItem.id,
        pitemSource: 'shop',
        pitemSourceId: shopItem.shop.id,
        productId: shopItem.productId,
        productName: shopItem.productName,
        pitemQuantity: parseInt(quantity, 10),
        pitemPricecentsSel: priceCents,
      }
      attributeFields.forEach(attr => {
        if (selectedAttrs.has(attr.text)) {
          Object.assign(cartItem, { [attr.field]: selectedAttrs.get(attr.text) })
        }
      })

      try {
        await API.graphql(
          graphqlOperation(createCartItem, {
            input: cartItem,
          })
        )
        setShowCartQty(quantity)
      } catch (err) {
        setAddToCartError(`Could not add product to cart`)
      }

      setAddToCartProcessing(false)
    }

    if (!quantity || parseInt(quantity, 10) < minQuantity) {
      setQuantity(`${minQuantity}`)
    }

    return (
      <Layout seotitle={pageContext.name} activeUri={`/item/${pageContext.id}`}>
        <GlobalStylesSearch />
        <div className="modal-content">
          <div className="modal-content-left">
            {shopItem.productImagesMore && shopItem.productImagesMore.length > 0 ? (
              <>
                <Slider {...settingsReactSlickSlider}>
                  <img
                    key={shopItem.productImage}
                    alt={`${shopItem.productName || ''} product 0`}
                    src={quoteCardImgUrlCreater(shopItem.productImage, imgSize)}
                    onError={onGetImageError}
                  />
                  {shopItem.productImagesMore.map((imgitem: string | null, i: number) => {
                    if (!imgitem) return null
                    return (
                      <img
                        key={imgitem}
                        alt={`${shopItem.productName || ''} product ${i}`}
                        src={quoteCardImgUrlCreater(imgitem, imgSize)}
                        onError={onGetImageError}
                      />
                    )
                  })}
                </Slider>
                <div style={{ paddingTop: '15px' }} />
              </>
            ) : (
              <div style={{ padding: '10px' }}>
                <LazyLoadImage
                  style={{ width: '100%' }}
                  delayTime={100}
                  delayMethod="debounce"
                  alt={shopItem.productName || ' '}
                  threshold={800}
                  effect="blur"
                  src={quoteCardImgUrlCreater(shopItem.productImage, imgSize)}
                />
              </div>
            )}
          </div>
          <div className="modal-content-right">
            <Header as="h3">{shopItem.productName.toUpperCase() || ' '}</Header>
            <p>{shopItem.productDescription || ''}</p>
            <Segment vertical>
              <p className="modal-content-price">{`$${(priceCents / 100).toFixed(2)}`}</p>
            </Segment>
            <Segment vertical>
              <Form size="small" warning={addToCartError !== null && addToCartError !== ''} onSubmit={addToCartSubmit}>
                {attributeFields.map(attr => {
                  const prodAttr = shopItem[attr.field]
                  // first dropdowns with more than one attribute option
                  if (prodAttr && prodAttr.length && prodAttr.length > 1) {
                    const attrOpts = prodAttr
                      .map(attrPrc => attrDropdownOption(attrPrc))
                      .filter((el): el is IDropDownMenuItems => el !== null)
                    return (
                      <Form.Dropdown
                        selection
                        fluid
                        style={{ maxWidth: '220px' }}
                        key={attr.text}
                        id={attr.text}
                        label={attr.text}
                        placeholder={attr.text}
                        options={attrOpts}
                        onChange={updateAttrsAndPrice}
                      />
                    )
                  }
                  return null
                })}
                {attributeFields.map(attr => {
                  const prodAttr = shopItem[attr.field]
                  // now fixed sttributes if any
                  if (prodAttr && prodAttr.length && prodAttr.length === 1) {
                    return (
                      <div className="inline unstackable fields" key={attr.text}>
                        <label>{attr.text}</label>
                        {attrText(prodAttr[0])}
                      </div>
                    )
                  }
                  return null
                })}
                <Form.Group inline unstackable style={{ paddingTop: '20px' }}>
                  <QuantityInput fluid {...bindQuantity} type="number" min={minQuantity} style={{ width: '80px' }} />
                  <Button type="submit" color="orange" content="ADD TO CART" loading={addToCartProcessing} />
                </Form.Group>
                <Message warning header="Please modify your selection:" content={addToCartError} />
                {showCartQty !== null && showCartQty !== '' && (
                  <Message positive>
                    <Message.Header>Added to cart</Message.Header>
                    <p>
                      {`Quantity: ${showCartQty}`}. <Link to="/app/cart">Show cart</Link>
                    </p>
                  </Message>
                )}
              </Form>
            </Segment>
          </div>
        </div>
        {(shopEditor || shopItem.access === 'public') && (
          <Segment secondary>
            <Grid columns={2} stackable textAlign="left">
              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Link to={`/${shopItem.shop.slug}`} style={{ textDecoration: 'none', padding: '20px' }}>
                    <Icon name="backward" />
                    {shopItem.shop.seotitle}
                  </Link>
                </Grid.Column>
                <Grid.Column>
                  {shopEditor && (
                    <Button
                      size="small"
                      content="Product settings"
                      color="black"
                      onClick={() => navigate(`/app/shops/item/${shopItem.id}`)}
                    />
                  )}
                  {userStore.isAdmin && (
                    <Button
                      size="small"
                      color="purple"
                      content="Admin edit"
                      onClick={() => navigate(`/app/admin/shopitem/${shopItem.id}`)}
                    />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
        <div style={{ paddingTop: '20px' }} />
      </Layout>
    )
  }
)

export default ShopProduct

export const query = graphql`
  query GetShopItem($id: ID!) {
    shops {
      getShopItem(id: $id) {
        id
        access
        productId
        productName
        productDescription
        productImage
        productImagesMore
        productCategory
        quantity
        pricecents
        psize
        pcolor
        pmaterial
        pshape
        pimprint
        shop {
          id
          owner
          shopadmins
          members
          status
          seotitle
          slug
        }
      }
    }
  }
`
