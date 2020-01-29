/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react'
import { navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import compose from 'recompose/compose'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Card, Modal, Icon, Tab, Form, Button, Popup } from 'semantic-ui-react'
import { ResultElement, ProductDetailsOpenAs } from '../types'
import ProductLinkFlyout from './product-link-flyout'
import ProductInquiry from './product-inquiry'
import { createquoteitem } from '../utils/graphql'
import { productCardImgUrlCreater, onGetImageError } from '../utils/urls'
import { useInput } from '../utils/form-input/form-input'
import QuoteBoardsDropDown from './quoteBoardsDropDown'
import { StyledCard, StyledTab, RequestButton, settingsReactSlickSlider } from '../elements'
import { ITabData } from '../elements/interface'

const SaveStar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: #fff;
  z-index: 10;
  display: flex;
  i.icon {
    transition: all linear 0.2s;
  }
  &&&:hover i {
    color: lightsteelblue !important;
  }
  .icon {
    margin: auto;
  }
`

interface IProps {
  pitem: ResultElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStore: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favoriteProductsStore: any
  savedMode: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

type TProductAttributeValue = {
  [key: string]: string
}
type TUnionProductAttributeValue = TProductAttributeValue | string
const prodAttrName = (item: TUnionProductAttributeValue): string => (typeof item !== 'string' ? item.Name : item)

interface IErrorDeckPopUpConfig {
  textForDeckPopUp: string
  timerDelayMS: number
  position?:
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'right center'
    | 'left center'
    | 'top center'
    | 'bottom center'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StreamProductDetails = compose<any, any>(
  inject('userStore'),
  inject('favoriteProductsStore'),
  observer
)(
  ({ pitem, userStore, favoriteProductsStore, pageProps }: IProps): JSX.Element => {
    const isFavoriteProduct = favoriteProductsStore.favoriteProductIds.includes(String(pitem.Id))
    const errorDeckPopUpConfig: IErrorDeckPopUpConfig = Object.freeze({
      textForDeckPopUp: 'Please select deck',
      timerDelayMS: 3000,
      position: 'bottom left',
    })
    const contextRef = useRef(null)
    const timeoutRef = useRef(0)
    const imgSize: 'small' | 'large' | undefined = 'large'
    const productDesc = `$${(pitem.PriceMinCents / 100).toFixed(2)} up`

    const [modalOpen, setModalOpen] = useState(false)
    const [isErrorDeckPopupShow, setIsErrorDeckPopupShow] = useState(false)
    const [modalOpenAs, setModalOpenAs] = useState(ProductDetailsOpenAs.productDetails)
    const [isQuestionPopUpOpen, setQuestionPopUpOpen] = useState(false)

    const [quoteRequestProcessing, setQuoteRequestProcessing] = useState(false)
    // quantity not to be reset: useState initialization from min. Qty
    const defaultQuantity = `${pitem.QuantityMin || 1}`
    const { value: quantity, bind: bindQuantity } = useInput(defaultQuantity)
    const { value: notes, bind: bindNotes, reset: resetNotes } = useInput('')
    const { value: deck, bindForDropDown: bindDeck, reset: resetDeck } = useInput('')

    const errorDeckPopUpAutoClose = (): void => {
      if (!isErrorDeckPopupShow) {
        setIsErrorDeckPopupShow(true)
        timeoutRef.current = setTimeout(() => {
          if (setIsErrorDeckPopupShow) setIsErrorDeckPopupShow(false)
        }, errorDeckPopUpConfig.timerDelayMS)
      }
    }

    const questionPopUpOpen = (): void => {
      setQuestionPopUpOpen(true)
    }

    const questionPopUpClose = (): void => {
      setQuestionPopUpOpen(false)
    }

    const toggleFavoritesProduct = (): void => {
      if (!userStore.isLoggedIn) {
        userStore.modalOpenAsLoginWithCallback(() => favoriteProductsStore.toggleFavoriteProduct(String(pitem.Id)))
        return
      }
      favoriteProductsStore.toggleFavoriteProduct(String(pitem.Id))
    }

    const modalOpenAsRequestQuote = (): void => {
      if (!userStore.isLoggedIn) {
        userStore.modalOpenAsLoginWithCallback(() => setModalOpenAs(ProductDetailsOpenAs.requestQuote))
        return
      }
      setModalOpenAs(ProductDetailsOpenAs.requestQuote)
    }

    const modalOpenAsProductDetails = (): void => {
      setModalOpenAs(ProductDetailsOpenAs.productDetails)
    }

    const requestQuoteSubmit = async (): Promise<void | undefined> => {
      if (!deck || deck === '') {
        errorDeckPopUpAutoClose()
        return
      }
      setQuoteRequestProcessing(true)
      try {
        await API.graphql(
          graphqlOperation(createquoteitem, {
            deckid: deck,
            productId: pitem.Id,
            productName: pitem.Name,
            productDescription: pitem.ShortDescription,
            productImage: pitem.ImageUrl,
            productCategory: pitem.Mcategory,
            quantity,
            usernotes: notes,
          })
        )
        resetNotes()
        resetDeck()
      } catch (err) {
        console.log(err)
      }
      setQuoteRequestProcessing(false)
      closeRequestQuote()
    }

    const closeHandler = (event: React.SyntheticEvent): void => {
      event.preventDefault()
      closeRequestQuote()
    }

    const closeRequestQuote = (): void => {
      setIsErrorDeckPopupShow(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = 0
      }
      //resetQuantity(); // not resetting: prevent no value to keep min. quantity at least
      resetNotes()
      resetDeck()
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
      }
    }

    const tabsData = (): ITabData[] => {
      const tabsValue: string[] = Object.keys(pitem.Attributes)
      tabsValue.unshift('Details')
      return tabsValue.map(
        (tabName: string): ITabData => {
          const listOfTabContent: string[] =
            tabName === 'Details' ? [pitem.ShortDescription] : pitem.Attributes[tabName].Values.map(prodAttrName)
          return {
            menuItem: tabName,
            // eslint-disable-next-line react/display-name
            render: () => (
              <Tab.Pane>
                <div>
                  <div className="modal-content-tab-section">
                    <ul className="modal-content-tab-list">
                      {listOfTabContent.map((value: string, index: number) => (
                        <li className="modal-content-tab-item" key={`key_${value}`}>
                          {index === listOfTabContent.length - 1 ? value : `${value},`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tab.Pane>
            ),
          }
        }
      )
    }
    const modalRender = (isModalOpen: boolean, modalOpenAsPassed: number): JSX.Element | null => {
      if (!isModalOpen) {
        return null
      }
      switch (modalOpenAsPassed) {
        case ProductDetailsOpenAs.productDetails: {
          return (
            <>
              <Modal size="large" open={isModalOpen} onClose={modalClose}>
                <Modal.Content>
                  <div className="modal-content">
                    <div className="modal-content-left">
                      {pitem.Images && pitem.Images.length > 0 ? (
                        <>
                          <Slider {...settingsReactSlickSlider}>
                            {pitem.Images.map((imgitem: string) => (
                              <img
                                key={imgitem}
                                src={productCardImgUrlCreater(imgitem, imgSize)}
                                alt="product"
                                onError={onGetImageError}
                              />
                            ))}
                          </Slider>
                          <div style={{ paddingTop: '15px' }} />
                        </>
                      ) : (
                        <div style={{ padding: '10px' }}>
                          <LazyLoadImage
                            style={{ width: '100%' }}
                            delayTime={100}
                            delayMethod="debounce"
                            alt={pitem.Name || ' '}
                            threshold={800}
                            effect="blur"
                            src={productCardImgUrlCreater(pitem.ImageUrl, imgSize)}
                            onError={onGetImageError}
                          />
                        </div>
                      )}
                    </div>
                    <div className="modal-content-right">
                      <h2>{pitem.Name || ' '}</h2>
                      <p className="modal-content-quantity">Min:{pitem.QuantityMin || ''}</p>
                      <p className="modal-content-price">{productDesc}</p>
                      <StyledTab
                        menu={{ secondary: true, pointing: true }}
                        panes={tabsData()}
                        className="modal-content-tab"
                      />
                    </div>
                  </div>
                </Modal.Content>
                <Modal.Actions>
                  <div className="modal-content-footer">
                    <RequestButton size="large" onClick={modalOpenAsRequestQuote}>
                      Request quote
                    </RequestButton>
                    {userStore.isAdmin && (
                      <Button
                        size="large"
                        color="purple"
                        style={{ marginBottom: '10px' }}
                        content="Admin"
                        onClick={() => navigate(`/app/admin/streamitem/${pitem.Id}`)}
                      />
                    )}
                    <ul className="modal-content-group-btn">
                      <li onClick={questionPopUpOpen}>
                        <Icon size="large" name="question" color="grey" />
                      </li>
                      <li>
                        <ProductLinkFlyout prodLink={`/?product=${pitem.Id}`} baseUrl={pageProps.location.origin} />
                      </li>
                      <li onClick={toggleFavoritesProduct}>
                        <Icon size="large" name="star" color={isFavoriteProduct ? 'yellow' : 'grey'} />
                      </li>
                    </ul>
                  </div>
                </Modal.Actions>
              </Modal>
              <ProductInquiry pitem={pitem} open={isQuestionPopUpOpen} onclose={questionPopUpClose} />
            </>
          )
        }
        case ProductDetailsOpenAs.requestQuote: {
          return (
            <Modal as={Form} open={isModalOpen} size="small" style={{ maxWidth: 500 }} onSubmit={requestQuoteSubmit}>
              <Modal.Header>Quote request: {pitem.Name}</Modal.Header>
              <Modal.Content>
                <Form.Input
                  {...bindQuantity}
                  required
                  label="Quantity"
                  type="number"
                  placeholder="Minimum..."
                  min={1}
                />
                <Form.TextArea
                  {...bindNotes}
                  required
                  label="Notes: size, color, etc."
                  placeholder="Please specify..."
                />
                <div ref={contextRef}>
                  <QuoteBoardsDropDown {...bindDeck} />
                </div>
                <Popup
                  context={contextRef}
                  content={errorDeckPopUpConfig.textForDeckPopUp}
                  position={errorDeckPopUpConfig.position}
                  open={isErrorDeckPopupShow}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button type="submit" color="black" content="Request" loading={quoteRequestProcessing} />
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
          <SaveStar>
            <Icon size="large" name="star" color={isFavoriteProduct ? 'yellow' : 'grey'} />
          </SaveStar>
          <div className="productcard-prev-img-holder">
            <LazyLoadImage
              className="productcard-prev-img"
              delayTime={50}
              delayMethod="debounce"
              alt={pitem.Name || ''}
              threshold={800}
              src={productCardImgUrlCreater(pitem.ImageUrl, imgSize)}
              onError={onGetImageError}
            />
          </div>
          <Card.Content>
            <Card.Header>{pitem.Name || ''}</Card.Header>
            <Card.Description>{productDesc}</Card.Description>
          </Card.Content>
        </StyledCard>
        {modalRender(modalOpen, modalOpenAs)}
      </>
    )
  }
)

export default StreamProductDetails
