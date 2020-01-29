export type ResultElement = {
  Id: number
  Name: string
  ShortDescription: string
  PriceMinCents: number
  QuantityMin: number
  ImageUrl: string
  Images?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Attributes: any
  Mcategory: string
}

export enum SignUpLoginModalShowType {
  SignUp,
  VerifyCode,
  Login,
  ResetPasswordInit,
  ResetPasswordComplete,
}

export enum ProductDetailsOpenAs {
  productDetails,
  requestQuote,
}

export enum QuoteItemDetailsOpenAs {
  productDetails,
  addToShop,
}

export enum UserSettingsOperationType {
  default,
  changeEmail,
  activateEmail,
  changePassword,
}

export enum QuoteItemAttributeType {
  productImage,
  productImagesMore,
  propductSize,
  productShape,
  productColor,
  productMaterial,
  productImprint,
  pricecents,
  productName,
  productDescription,
}
