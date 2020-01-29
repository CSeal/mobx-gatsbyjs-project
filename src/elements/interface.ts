/* eslint-disable @typescript-eslint/no-explicit-any */
type TDropDownMenuItemClick = (event: React.SyntheticEvent, data: any) => void

export interface IDropDownMenuItems {
  key: string
  children?: JSX.Element | undefined
  value?: string
  text?: string | JSX.Element
  onClick?: TDropDownMenuItemClick
  content?: string
  className?: string
  active?: boolean
}

export interface IDropDowMenuProps {
  options: IDropDownMenuItems[]
  floating?: boolean
  icon?: JSX.Element | undefined
  trigger?: JSX.Element | undefined
  scrolling?: boolean
  className?: string
  onFocus?: TDropDownMenuItemClick
  onBlur?: TDropDownMenuItemClick
  onClose?: TDropDownMenuItemClick
  [key: string]: any
}

export interface ITabData {
  menuItem: string
  render: () => JSX.Element
}

export interface ISliderConfig {
  dots: boolean
  infinite: boolean
  speed: number
  slidesToShow: number
  slidesToScroll: number
  arrows: boolean
  lazyLoad: string
}
