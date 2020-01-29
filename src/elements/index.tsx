/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import { Container, Dropdown, Card, Tab, Button, Form } from 'semantic-ui-react'
import theme from '../../config/theme'
import { IDropDowMenuProps, ISliderConfig } from './interface'

// top menu dropdown
export const DropDownMenu = (props: IDropDowMenuProps): JSX.Element => {
  const {
    options,
    floating = true,
    icon = 'dropdown',
    trigger = <></>,
    className = '',
    onFocus = () => {},
    onBlur = () => {},
    scrolling = false,
    onClose = () => {},
    ...rest
  } = props
  return (
    <Dropdown
      floating={floating}
      icon={icon}
      trigger={trigger}
      scrolling={scrolling}
      options={options}
      className={className}
      onFocus={onFocus}
      onBlur={onBlur}
      onClose={onClose}
      lazyLoad
      {...rest}
    />
  )
}

// ReactiveSearch pages and product/quote details modals
export const GlobalStylesSearch = createGlobalStyle`

.test-classs {
}

.ui .sticky{
  position: relative;
}

.mainGoodsList {
  position: relative;
  padding-top: 20px;

  .card > div:first-child {
    z-index: 1;
  }
}

.mainFilters {
  position: relative;
  z-index: 5;
}

.category .category-select {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  min-width: 120px;
  max-width: 160px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 17px;
}

.category .category-select:focus,
.category .category-select:hover {
  background-color: #000;
}

.datasearch .searchbox {
  border: none;
  background-color: ${theme.colors.mlightgrey};
  color: #C2C2C2;
  width: 300px;
  margin-right: 10px;
  font-size: 17px;
}
.datasearch .searchbox + div > div:first-child {
  top: calc(50% - 10px);
  @media only screen and (min-width: 768px) {
    padding-right: 18px;
  }
}

.datasearch .searchbox:focus {
  color: #000;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
}

.pricerange  .pricerange-select {
  width: 125px;
  font-size: 17px;
}

.mainGoodsList .resultsort {
  height: 42px;
  position: absolute;
  top: -92px;
  right: 0;
  font-size: 17px;
  padding: 0 20px;
  z-index: 801;
}

.selectedfilters {
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${theme.colors.primary};
  }
}

.results {
  padding: 15px 15px 10px 0;

  @media (max-width: ${theme.breakpoints[1]}) {
    padding-top: 50px;
  }
}

.results .resultsort {
  outline: 1px solid ${theme.colors.primary};
}

.results .resultsinfo {
  padding: 15px 0 20px 0;
}
  
@media only screen and (max-width: 992px) {
  .mainGoodsList .resultsort {
    position: static;
    width: calc(290px + 290px + 18px);
    margin: 0 auto;
    margin-bottom: 10px;
    z-index: auto;
  }
}

@media only screen and (max-width: 767px) {
  .mainGoodsList .resultsort {
    width: 100%;
  }
}

.modal-content-tab .ui.secondary.menu {
  flex-wrap: wrap !important;
}

.modal-content {
  display: flex;
  padding: 30px 20px;
}

.modal-content-footer {
  display: flex;
}

.modal-content-tab-title {
  font-size: 16px;
  letter-spacing: 1px;
  padding-right: 10px;
}

.modal-content-tab-section {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #D4D4D5;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.modal-content-group-btn {
  list-style: none ;
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: flex-end;
  width: 100%;
}

.modal-content-group-btn li{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #F2F2F2;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.modal-content-group-btn li i{
  margin: 0 auto !important; 
}

.modal-content-group-btn li:hover i {
  color: lightsteelblue !important;
}

.modal-content-tab-section:last-child {
  border: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.modal-content-tab-item {
  color: #888181;
  font-size: 14px;
  padding-left: 3px;
  padding-right: 3px;
  line-height: 24px;
}

.modal-content-quantity {
   font-size: 16px;
   color: #847c7c;
   letter-spacing: 2px;
}

.modal-content-price {
  font-size: 20px;
  line-height: 22px;
  color: #000;
  letter-spacing: 2px;
}

.modal-content-tab-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 70%;
}

.modal-content .modal-content-left {
  width: 45%;
  padding-left: 20px;
  padding-right: 20px;
  margin-right: 5%;
}

@media (max-width: 470px) {
  .modal-content {
    padding: 0 20px;
  }
}

.modal-content .modal-content-right {
  width: 50%;
  padding-left: 10px;

  @media (max-width: 470px) {
    p {
      display: inline-block;
    }

    .modal-content-price {
      text-align: center;
    }

    .modal-content-tab > div:first-child {
      border-bottom: none;

      .item {
        display: block;
        width: 48%;
        text-align: center;
        border-bottom: 2px solid rgba(34, 36, 38, 0.15);
        margin: 0 1%;
      }
    }

    .modal-content-tab > div:last-child {
      height: 150px;
      overflow-y: auto;
    }
  }
}
  
.modal-content .slick-next,
.modal-content .slick-prev {
  height: 100%;
  top: 50%;
  background: rgba(0,0,0,0.3);
  opacity: 0.2;
  transition: all linear 0.2s;
}

.modal-content .slick-next:hover,
.modal-content .slick-prev:hover {
  opacity: 1;
  background: rgba(0,0,0,0.5);
}

.modal-content .slick-next:before {
  content: '';
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-bottom: none;
  border-right: none;
  transform: rotate(135deg);
  display: block;
  margin: 0 auto;
}

.modal-content .slick-prev:before {
  content: '';
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-bottom: none;
  border-right: none;
  transform: rotate(-45deg);
  margin: 0 auto;
  display: block;
}

.modal-content .slick-dots {
  bottom: -15px;
  position: relative;
}

.modal-content .slick-dots li{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #757474;
  background-color: #fff;
}

.modal-content .slick-dots li button:before {
  content: '';
}

.modal-content .slick-dots li.slick-active {
  background-color: #757474;
}

.ui.modal > .actions {
  @media (max-width: 440px) {
    border-top: none;

    .modal-content-footer {
      -webkit-flex-direction: column-reverse;
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;

      .modal-content-group-btn{
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-bottom: 5%;
      }
    }
  }
}
 
@media (max-width: 768px) {
  .modal-content {
    flex-wrap: wrap;
  }

  .modal-content .modal-content-left {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 0%;
    margin-bottom: 60px;
  }

  .modal-content .modal-content-right {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }

  .ui.modal > .actions {
    padding-bottom: 20px !important;
  }
}
.productcard-prev-img-holder{
  margin-right: 10px;
  margin-left: 14%;
  min-height: 300px;
  line-height: 300px;
  text-align: right;
}
.productcard-prev-img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: bottom;
}
`

export const StyledContainerReactiveSearch = styled(Container)`
  @media only screen and (min-width: 1200px) {
    width: 1210px !important;
  }

  .poweredby {
    display: none;
  }
`

export const StyledCard = styled(Card)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  background-color: #fff !important;
  
  .image {
    background-color: #fff !important;
    flex: 1 1 auto !important; 
    padding: 20px !important;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    }
  }
  
  .content {
    flex-grow: inherit  !important;
  }
`

export const CardCornerIcon = styled.div`
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
  .icon {
    margin: auto;
  }
`

export const StyledTab = styled(Tab)`
  .ui.secondary.pointing.menu .active.item {
    border-bottom-color: rgb(227, 149, 184) !important;
  }
`

export const RequestButton = styled(Button)`
  background-color: #000 !important;
  color: #fff !important;
  flex: 0 0 auto;
`

// deck and shop settings header
export const SaveHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const StyledButton = styled(Button)`
  text-transform: uppercase !important;
  letter-spacing: 2px;
  font-weight: bold;
  margin-right: 10px !important;
  margin-left: 10px !important;
  margin-top: 10px !important;

  @media only screen and (max-width: 768px) {
    margin-left: 10px !important;
    margin-right: 10px !important;
    margin-top: 10px !important;
    width: 100%;
  }
`

export const StyledButtonMargin = styled(StyledButton)`
  margin-left: 22% !important;
  margin-right: 0 !important;
  padding-left: 60px !important;
  position: relative;

  span {
    position: absolute;
    width: 26px;
    height: 26px;
    display: block;
    top: 50%;
    left: 12px;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-top: -13px;

    &:after,
    &:before {
      content: '';
      display: block;
      width: 14px;
      height: 1px;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-color: #fff;
    }

    &:after {
      transform: rotate(90deg);
    }
  }

  @media only screen and (max-width: 768px) {
    margin-left: 10px !important;
    margin-right: 10px !important;
    margin-top: 10px !important;
    width: 100%;
  }
`

// quote decks listing
export const ButtonLinkDiv = styled.div`
  border: 2px solid #dededf;
  background-color: #f2f2f2;
  border-radius: 5px;
  margin-right: 5px;
  display: block;
  outline: none;
  text-align: center;
  max-width: 280px;
`

export const ButtonLink = styled(Link)`
  text-decoration: none;
`

export const CreateButtonHover = styled.div`
  :hover {
    color: #b91d85;
    cursor: pointer;
  }
`

export const settingsReactSlickSlider: ISliderConfig = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  lazyLoad: 'progressive',
}

export const QuantityInput = styled(Form.Input)`
  @media only screen and (max-width: 380px) {
    margin-bottom: 10px !important;
  }
`
