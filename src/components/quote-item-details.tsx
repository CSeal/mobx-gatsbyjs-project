/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { navigate, Link } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import Slider from 'react-slick'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Card, Modal, Icon, Form, Button, Header, Segment, Message } from 'semantic-ui-react'
import ProductInquiry from './product-inquiry'
import {
  IQuoteItem,
  attributeFields,
  updatequoteitemsdeck,
  getEditorShops,
  createshopitem,
  createCartItem,
} from '../utils/graphql'
import { GetShopQuery } from '../API'
import { quoteCardImgUrlCreater, onGetImageError } from '../utils/urls'
import { attsPriceCentsIncr, attsPriceCentsIncrTotal, attrText, attrDropdownOption } from '../utils/attributes'
import { QuoteItemDetailsOpenAs } from '../types'
import { useInput } from '../utils/form-input/form-input'
import { StyledCard, CardCornerIcon, RequestButton, settingsReactSlickSlider, QuantityInput } from '../elements'
import { IDropDownMenuItems } from '../elements/interface'

interface IShopItem {
  id: string
  name: string
}

interface IProps {
  quoteItem: IQuoteItem
  quoteDeckId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuotedItem = compose<any, any>(
  inject('userStore'),
  observer
)(
  ({ quoteItem, quoteDeckId, userStore }: IProps): JSX.Element => {
    const isPendingQuote = quoteItem.pricecents === 0
    const imgSize: 'small' | 'large' | undefined = 'large'

    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenAs, setModalOpenAs] = useState(QuoteItemDetailsOpenAs.productDetails)

    // quote item remove from board
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteProcessing, setDeleteProcessing] = useState(false)
    const showDeleteModal = () => setDeleteModalOpen(true)
    const hideDeleteModal = (event: React.SyntheticEvent) => {
      event.preventDefault()
      setDeleteModalOpen(false)
    }
    const hideDeleteModalAsync = () => {
      // invoke event.preventDefault() before the first await-statement
      setDeleteModalOpen(false)
    }
    const handleDelete = async (event: React.SyntheticEvent) => {
      event.preventDefault()

      setDeleteProcessing(true)
      try {
        await API.graphql(
          graphqlOperation(updatequoteitemsdeck, {
            qitemid: quoteItem.id,
            // empty string in lambda is used to nullify board connection
            newdeckid: '',
          })
        )
        setDeleteProcessing(false)
        window.location.reload()
      } catch (err) {
        console.log(err)
        setDeleteProcessing(false)
        hideDeleteModalAsync()
      }
    }

    // product to cart form
    const [addToCartProcessing, setAddToCartProcessing] = useState(false)
    const [addToCartError, setAddToCartError] = useState('')
    const [showCartQty, setShowCartQty] = useState('')
    // quantity not to be reset: useState initialization from min. Qty
    const minQuantity = quoteItem.quantity || 1
    const { value: quantity, bind: bindQuantity, setValue: setQuantity } = useInput(`${minQuantity}`)
    // selected attributes kept only for attributes with more than one option
    const selectedAttrsInit = new Map<string, string | null>()
    attributeFields.forEach(attr => {
      const prodAttr = quoteItem[attr.field]
      if (prodAttr && prodAttr.length && prodAttr.length > 1) {
        selectedAttrsInit.set(attr.text, null)
      }
    })
    const [selectedAttrs, setSelectedAttrs] = useState(selectedAttrsInit)

    // attributes without multiple selection options (i.e. single entries) may increment price
    const attrPriceIncrs: number[] = attributeFields.map(attr => {
      const prodAttr = quoteItem[attr.field]
      if (prodAttr && prodAttr.length && prodAttr.length === 1) {
        return attsPriceCentsIncr(prodAttr[0])
      }
      return 0
    })
    const attrPriceIncrTotal = attrPriceIncrs.reduce((i1: number, i2: number) => i1 + i2, 0)
    const priceCentsBase: number = quoteItem.pricecents ? quoteItem.pricecents + attrPriceIncrTotal : 0
    const productDesc: string = isPendingQuote ? 'pending' : `$${(priceCentsBase / 100).toFixed(2)}`
    const [priceCents, setPriceCents] = useState(priceCentsBase)

    // add to shops form
    const [shopsItems, setShopsItems] = useState<Array<IShopItem> | null>(null)
    const [shopsLoading, setShopsLoading] = React.useState(true)
    const [addToShopProcessing, setAddToShopProcessing] = useState(false)
    const [addToShopError, setAddToShopError] = useState(false)
    const shopCheckboxesInit = new Map<string, boolean>()
    const [shopCheckboxes, setShopCheckboxes] = useState(shopCheckboxesInit)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onShopCheckboxChange = (_event: React.SyntheticEvent, data: any): void => {
      if (data.id && data.checked) {
        setShopCheckboxes(shopCheckboxes.set(data.id, data.checked))
      }
    }
    const [publicItem, setPublicItem] = useState(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPublicItemSwitch = (_event: React.SyntheticEvent, data: any): void => {
      if (data.id === 'publicitemswitch') {
        setPublicItem(data.checked)
      }
    }

    // product inquiry form
    const [isQuestionPopUpOpen, setQuestionPopUpOpen] = useState(false)
    const questionPopUpOpen = (): void => {
      setQuestionPopUpOpen(true)
    }
    const questionPopUpClose = (): void => {
      setQuestionPopUpOpen(false)
    }

    const updateShops = async (): Promise<void | undefined> => {
      if (!userStore.isLoggedIn) {
        return
      }
      try {
        const { data } = await API.graphql(graphqlOperation(getEditorShops, { id: userStore.loginedUser.sub }))
        if (
          data.getEditor &&
          data.getEditor.shops &&
          Array.isArray(data.getEditor.shops.items) &&
          data.getEditor.shops.items.length > 0
        ) {
          const shopItems: Array<IShopItem> = data.getEditor.shops.items.reduce(
            (acc: Array<IShopItem>, sitem: { shop: GetShopQuery['getShop'] }) => {
              if (sitem.shop) {
                acc.push({
                  id: sitem.shop.id,
                  name: sitem.shop.seotitle,
                })
              }
              return acc
            },
            [] as IShopItem[]
          )
          if (shopItems && shopItems.length > 0) {
            setShopsItems(shopItems)
            const shopChecks = new Map<string, boolean>()
            shopItems.map(sitem => shopChecks.set(sitem.id, false))
            setShopCheckboxes(shopChecks)
          } else {
            // successful Editor-query but no shops associated with the user
            setShopsItems(null)
          }
        } else {
          setShopsItems(null)
        }
      } catch (err) {
        console.log(err)
        setShopsItems(null)
      }
      setShopsLoading(false)
    }

    const modalOpenAsAddToShop = (): void => {
      setAddToShopError(false)
      if (!userStore.isLoggedIn) {
        userStore.modalOpenAsLoginWithCallback(() => setModalOpenAs(QuoteItemDetailsOpenAs.addToShop))
        return
      }
      updateShops()
      setModalOpenAs(QuoteItemDetailsOpenAs.addToShop)
    }

    const modalOpenAsProductDetails = (): void => {
      setAddToCartError('')
      setShowCartQty('')
      setModalOpenAs(QuoteItemDetailsOpenAs.productDetails)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateAttrsAndPrice = (_event: React.SyntheticEvent, data: any): void => {
      const selectedAttrsUpd = selectedAttrs
      if (data.id && data.value) {
        selectedAttrsUpd.set(data.id, data.value)
        // clear "added to cart" if there was such a message: attributes changed
        setShowCartQty('')
      }
      setPriceCents(priceCentsBase + attsPriceCentsIncrTotal(selectedAttrsUpd))
      setSelectedAttrs(selectedAttrsUpd)
    }

    const addToCartSubmit = async (): Promise<void | undefined> => {
      if (!quoteItem || !quoteDeckId) {
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
        pitemId: quoteItem.id,
        pitemSource: 'deck',
        pitemSourceId: quoteDeckId,
        productId: quoteItem.productId,
        productName: quoteItem.productName,
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

    const addToShop = async (shopId: string | null): Promise<boolean> => {
      if (!shopId) {
        // null as shop id should not happen, but if it does there is nothing to do
        return true
      }
      try {
        const resp = await API.graphql(
          graphqlOperation(createshopitem, {
            shopid: shopId,
            access: publicItem ? 'public' : 'private',
            productId: quoteItem.productId,
            productName: quoteItem.productName,
            productDescription: quoteItem.productDescription,
            productImage: quoteItem.productImage,
            productImagesMore: quoteItem.productImagesMore ? quoteItem.productImagesMore : ([] as string[]),
            productCategory: quoteItem.productCategory ? quoteItem.productCategory : '',
            quantity: quoteItem.quantity ? quoteItem.quantity : 0,
            pricecents: quoteItem.pricecents ? quoteItem.pricecents : 0,
            usernotes: quoteItem.usernotes ? quoteItem.usernotes : '',
            psize: quoteItem.psize ? quoteItem.psize : ([] as string[]),
            pcolor: quoteItem.pcolor ? quoteItem.pcolor : ([] as string[]),
            pmaterial: quoteItem.pmaterial ? quoteItem.pmaterial : ([] as string[]),
            pshape: quoteItem.pshape ? quoteItem.pshape : ([] as string[]),
            pimprint: quoteItem.pimprint ? quoteItem.pimprint : ([] as string[]),
          })
        )
        if (resp && resp.data && resp.data.createshopitem) {
          return resp.data.createshopitem
        }
        return false
      } catch (err) {
        console.log(err)
        return false
      }
    }

    const addToShopSubmit = async (): Promise<void | undefined> => {
      // at least one shop must be selected
      const shopIds = Array.from(shopCheckboxes)
        .map(([id, chk]) => (chk ? id : null))
        .filter(Boolean)
      if (shopIds.length < 1) {
        setAddToShopError(true)
        return
      }
      setAddToShopError(false)

      setAddToShopProcessing(true)
      await Promise.all(shopIds.map(shopid => addToShop(shopid)))
      setAddToShopProcessing(false)
      closeAddToShop()
    }

    const closeHandler = (event: React.SyntheticEvent): void => {
      event.preventDefault()
      closeAddToShop()
    }

    const closeAddToShop = (): void => {
      setShopCheckboxes(shopCheckboxesInit)
      modalOpenAsProductDetails()
    }

    const modalShow = (): void => {
      if (!modalOpen) {
        setModalOpen(true)
      }
    }

    const modalClose = (): void => {
      if (modalOpen) {
        setModalOpen(false)
        setShowCartQty('')
        setAddToCartError('')
      }
    }

    const deleteTrigger: JSX.Element = (
      <li onClick={showDeleteModal}>
        <Icon size="large" name="trash alternate outline" color="red" />
      </li>
    )

    const modalRender = (isModalOpen: boolean, modalOpenAsPassed: number): JSX.Element | null => {
      if (!isModalOpen) {
        return null
      }
      switch (modalOpenAsPassed) {
        case QuoteItemDetailsOpenAs.productDetails: {
          if (!quantity || parseInt(quantity, 10) < minQuantity) setQuantity(`${minQuantity}`)
          return (
            <>
              <Modal size="large" open={isModalOpen} onClose={modalClose}>
                <Modal.Content>
                  <div className="modal-content">
                    <div className="modal-content-left">
                      {quoteItem.productImagesMore && quoteItem.productImagesMore.length > 0 ? (
                        <>
                          <Slider {...settingsReactSlickSlider}>
                            {quoteItem.productImagesMore.map((imgitem: string | null, i: number) => {
                              if (!imgitem) return null
                              return (
                                <img
                                  key={imgitem}
                                  alt={`${quoteItem.productName || ''} product ${i}`}
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
                            alt={quoteItem.productName || ' '}
                            threshold={800}
                            effect="blur"
                            src={quoteCardImgUrlCreater(quoteItem.productImage, imgSize)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="modal-content-right">
                      <Header as="h3">{quoteItem.productName.toUpperCase() || ' '}</Header>
                      <p>{quoteItem.productDescription || ''}</p>
                      {isPendingQuote ? (
                        <>
                          <p className="modal-content-quantity">Quantity: {quoteItem.quantity || ''}</p>
                          <p className="modal-content-price">
                            <Icon name="clock" />
                          </p>
                        </>
                      ) : (
                        <>
                          <Segment vertical>
                            <p className="modal-content-price">{`$${(priceCents / 100).toFixed(2)}`}</p>
                          </Segment>
                          <Segment vertical>
                            <Form
                              size="small"
                              warning={addToCartError !== null && addToCartError !== ''}
                              onSubmit={addToCartSubmit}
                            >
                              {attributeFields.map(attr => {
                                const prodAttr = quoteItem[attr.field]
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
                                const prodAttr = quoteItem[attr.field]
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
                                <QuantityInput
                                  fluid
                                  {...bindQuantity}
                                  type="number"
                                  min={minQuantity}
                                  style={{ width: '80px' }}
                                />
                                <Button
                                  type="submit"
                                  color="orange"
                                  content="ADD TO CART"
                                  loading={addToCartProcessing}
                                />
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
                        </>
                      )}
                    </div>
                  </div>
                </Modal.Content>
                <Modal.Actions>
                  <div className="modal-content-footer">
                    {!isPendingQuote && (
                      <RequestButton size="large" onClick={modalOpenAsAddToShop}>
                        Add to shops
                      </RequestButton>
                    )}
                    {userStore.isAdmin && (
                      <Button
                        size="large"
                        color="purple"
                        style={{ marginBottom: '10px' }}
                        content="Admin"
                        onClick={() => navigate(`/app/admin/quoteitem/${quoteItem.id}`)}
                      />
                    )}
                    <ul className="modal-content-group-btn">
                      <li onClick={questionPopUpOpen}>
                        <Icon size="large" name="question" color="grey" />
                      </li>
                      {(userStore.isLoggedIn || userStore.isAdmin) && (
                        <Modal size="small" open={deleteModalOpen} trigger={deleteTrigger}>
                          <Modal.Header>Remove product</Modal.Header>
                          <Modal.Content>
                            <p>Are you sure you want to delete this product from the deck?</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button negative loading={deleteProcessing} content="Yes, delete" onClick={handleDelete} />
                            <Button positive content="Cancel" onClick={hideDeleteModal} />
                          </Modal.Actions>
                        </Modal>
                      )}
                    </ul>
                  </div>
                </Modal.Actions>
              </Modal>
              <ProductInquiry qitem={quoteItem} open={isQuestionPopUpOpen} onclose={questionPopUpClose} />
            </>
          )
        }
        case QuoteItemDetailsOpenAs.addToShop: {
          return (
            <Modal
              as={Form}
              open={isModalOpen}
              size="small"
              style={{ maxWidth: 500 }}
              warning={addToShopError}
              onSubmit={addToShopSubmit}
            >
              <Modal.Header>Add to shops</Modal.Header>
              <Modal.Content>
                {shopsLoading && <Segment loading basic />}
                {!shopsLoading && (!shopsItems || shopsItems.length === 0) && (
                  <p>
                    You are not a member of any shops yet. <Link to="/app/shops/create">Start a shop now.</Link>
                  </p>
                )}
                {!shopsLoading && shopsItems && shopsItems.length > 0 && (
                  <>
                    <Header as="h4">{quoteItem.productName}</Header>
                    {shopsItems.map(shopItem => (
                      <Form.Checkbox
                        key={`checkbox_${shopItem.id}`}
                        id={shopItem.id}
                        label={shopItem.name}
                        onChange={onShopCheckboxChange}
                      />
                    ))}
                    <Form.Checkbox
                      label="PUBLIC"
                      toggle
                      id="publicitemswitch"
                      checked={publicItem}
                      onChange={onPublicItemSwitch}
                    />
                    <Message warning header="Shop selection required:" content="Please select one or more shops" />
                  </>
                )}
              </Modal.Content>
              <Modal.Actions>
                <Button type="submit" color="black" content="Submit" loading={addToShopProcessing} />
                <Button onClick={closeHandler} color="grey" content="Cancel" />
              </Modal.Actions>
            </Modal>
          )
        }
        default:
          return null
      }
    }
    return (
      <>
        <StyledCard onClick={modalShow}>
          <CardCornerIcon>{isPendingQuote && <Icon size="large" name="clock" />}</CardCornerIcon>
          <div className="productcard-prev-img-holder">
            <LazyLoadImage
              className="productcard-prev-img"
              delayTime={50}
              delayMethod="debounce"
              alt={quoteItem.productName || ' '}
              threshold={800}
              effect="blur"
              src={quoteCardImgUrlCreater(quoteItem.productImage, imgSize)}
              onError={onGetImageError}
            />
          </div>
          <Card.Content>
            <Card.Header>{quoteItem.productName || ''}</Card.Header>
            <Card.Description>{productDesc}</Card.Description>
          </Card.Content>
        </StyledCard>
        {modalRender(modalOpen, modalOpenAs)}
      </>
    )
  }
)

export default QuotedItem
