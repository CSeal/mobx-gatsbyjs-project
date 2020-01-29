/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UpdateVisitorInquiryInput = {
  id: string,
  sender?: string | null,
  subject?: string | null,
  message?: string | null,
  sendsns?: boolean | null,
  createdAt?: string | null,
};

export type ModelVisitorInquiryConditionInput = {
  sender?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  message?: ModelStringInput | null,
  sendsns?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelVisitorInquiryConditionInput | null > | null,
  or?: Array< ModelVisitorInquiryConditionInput | null > | null,
  not?: ModelVisitorInquiryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type DeleteVisitorInquiryInput = {
  id?: string | null,
};

export type CreateSliderItemInput = {
  id?: string | null,
  seoalt: string,
  uri: string,
  status: string,
  image: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelSliderItemConditionInput = {
  seoalt?: ModelStringInput | null,
  uri?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSliderItemConditionInput | null > | null,
  or?: Array< ModelSliderItemConditionInput | null > | null,
  not?: ModelSliderItemConditionInput | null,
};

export type UpdateSliderItemInput = {
  id: string,
  seoalt?: string | null,
  uri?: string | null,
  status?: string | null,
  image?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteSliderItemInput = {
  id?: string | null,
};

export type CreateProdSavedInput = {
  id?: string | null,
  userId?: string | null,
  productId: string,
  updatedAt?: string | null,
};

export type ModelProdSavedConditionInput = {
  productId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProdSavedConditionInput | null > | null,
  or?: Array< ModelProdSavedConditionInput | null > | null,
  not?: ModelProdSavedConditionInput | null,
};

export type UpdateProdSavedInput = {
  id: string,
  userId?: string | null,
  productId?: string | null,
  updatedAt?: string | null,
};

export type DeleteProdSavedInput = {
  id?: string | null,
};

export type CreateEditorInput = {
  id?: string | null,
  username: string,
};

export type ModelEditorConditionInput = {
  and?: Array< ModelEditorConditionInput | null > | null,
  or?: Array< ModelEditorConditionInput | null > | null,
  not?: ModelEditorConditionInput | null,
};

export type DeleteEditorInput = {
  id?: string | null,
};

export type CreateQuoteBoardInput = {
  id?: string | null,
  owner?: string | null,
  members?: Array< string | null > | null,
  name: string,
  pendingquotes?: boolean | null,
  description?: string | null,
  imprintdesign?: string | null,
  inhandsdate?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  invites?: Array< string | null > | null,
};

export type ModelQuoteBoardConditionInput = {
  name?: ModelStringInput | null,
  pendingquotes?: ModelBooleanInput | null,
  description?: ModelStringInput | null,
  imprintdesign?: ModelStringInput | null,
  inhandsdate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  invites?: ModelStringInput | null,
  and?: Array< ModelQuoteBoardConditionInput | null > | null,
  or?: Array< ModelQuoteBoardConditionInput | null > | null,
  not?: ModelQuoteBoardConditionInput | null,
};

export type DeleteQuoteBoardInput = {
  id?: string | null,
};

export type DeleteQuoteItemInput = {
  id?: string | null,
};

export type ModelQuoteItemConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  productDescription?: ModelStringInput | null,
  productImage?: ModelStringInput | null,
  productImagesMore?: ModelStringInput | null,
  productCategory?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  pricecents?: ModelIntInput | null,
  usernotes?: ModelStringInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelQuoteItemConditionInput | null > | null,
  or?: Array< ModelQuoteItemConditionInput | null > | null,
  not?: ModelQuoteItemConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CreateShopInput = {
  id?: string | null,
  owner?: string | null,
  shopadmins?: Array< string | null > | null,
  members?: Array< string | null > | null,
  status: string,
  seotitle: string,
  slug: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  invites?: Array< string | null > | null,
};

export type ModelShopConditionInput = {
  status?: ModelStringInput | null,
  seotitle?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  invites?: ModelStringInput | null,
  and?: Array< ModelShopConditionInput | null > | null,
  or?: Array< ModelShopConditionInput | null > | null,
  not?: ModelShopConditionInput | null,
};

export type DeleteShopInput = {
  id?: string | null,
};

export type DeleteShopItemInput = {
  id?: string | null,
};

export type ModelShopItemConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  access?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  productDescription?: ModelStringInput | null,
  productImage?: ModelStringInput | null,
  productImagesMore?: ModelStringInput | null,
  productCategory?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  pricecents?: ModelIntInput | null,
  usernotes?: ModelStringInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelShopItemConditionInput | null > | null,
  or?: Array< ModelShopItemConditionInput | null > | null,
  not?: ModelShopItemConditionInput | null,
};

export type CreateCartItemInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  username: string,
  pitemId: string,
  pitemSource: string,
  pitemSourceId: string,
  productId: string,
  productName: string,
  pitemQuantity: number,
  pitemPricecentsSel: number,
  psize?: string | null,
  pcolor?: string | null,
  pmaterial?: string | null,
  pshape?: string | null,
  pimprint?: string | null,
};

export type ModelCartItemConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  pitemId?: ModelStringInput | null,
  pitemSource?: ModelStringInput | null,
  pitemSourceId?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  pitemQuantity?: ModelIntInput | null,
  pitemPricecentsSel?: ModelIntInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelCartItemConditionInput | null > | null,
  or?: Array< ModelCartItemConditionInput | null > | null,
  not?: ModelCartItemConditionInput | null,
};

export type UpdateCartItemInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  username?: string | null,
  pitemId?: string | null,
  pitemSource?: string | null,
  pitemSourceId?: string | null,
  productId?: string | null,
  productName?: string | null,
  pitemQuantity?: number | null,
  pitemPricecentsSel?: number | null,
  psize?: string | null,
  pcolor?: string | null,
  pmaterial?: string | null,
  pshape?: string | null,
  pimprint?: string | null,
};

export type DeleteCartItemInput = {
  id?: string | null,
};

export type CreateOrderInput = {
  id?: string | null,
  username: string,
  contactEmail: string,
  contactPhone?: string | null,
  status: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  totalCentsIncrement: number,
};

export type ModelOrderConditionInput = {
  contactEmail?: ModelStringInput | null,
  contactPhone?: ModelStringInput | null,
  status?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  totalCentsIncrement?: ModelIntInput | null,
  and?: Array< ModelOrderConditionInput | null > | null,
  or?: Array< ModelOrderConditionInput | null > | null,
  not?: ModelOrderConditionInput | null,
};

export type UpdateOrderInput = {
  id: string,
  username?: string | null,
  contactEmail?: string | null,
  contactPhone?: string | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  totalCentsIncrement?: number | null,
};

export type DeleteOrderInput = {
  id?: string | null,
};

export type CreateOrderItemInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  username: string,
  orderID: string,
  pitemId: string,
  pitemSource: string,
  pitemSourceId: string,
  productId: string,
  productName: string,
  pitemQuantity: number,
  pitemPricecentsSel: number,
  psize?: string | null,
  pcolor?: string | null,
  pmaterial?: string | null,
  pshape?: string | null,
  pimprint?: string | null,
};

export type ModelOrderItemConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  orderID?: ModelIDInput | null,
  pitemId?: ModelStringInput | null,
  pitemSource?: ModelStringInput | null,
  pitemSourceId?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  pitemQuantity?: ModelIntInput | null,
  pitemPricecentsSel?: ModelIntInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelOrderItemConditionInput | null > | null,
  or?: Array< ModelOrderItemConditionInput | null > | null,
  not?: ModelOrderItemConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateOrderItemInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  username?: string | null,
  orderID?: string | null,
  pitemId?: string | null,
  pitemSource?: string | null,
  pitemSourceId?: string | null,
  productId?: string | null,
  productName?: string | null,
  pitemQuantity?: number | null,
  pitemPricecentsSel?: number | null,
  psize?: string | null,
  pcolor?: string | null,
  pmaterial?: string | null,
  pshape?: string | null,
  pimprint?: string | null,
};

export type DeleteOrderItemInput = {
  id?: string | null,
};

export type CreateVisitorInquiryInput = {
  id?: string | null,
  sender: string,
  subject: string,
  message: string,
  sendsns?: boolean | null,
  createdAt?: string | null,
};

export type UpdateEditorInput = {
  id: string,
  username?: string | null,
};

export type UpdateQuoteBoardInput = {
  id: string,
  owner?: string | null,
  members?: Array< string | null > | null,
  name?: string | null,
  pendingquotes?: boolean | null,
  description?: string | null,
  imprintdesign?: string | null,
  inhandsdate?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  invites?: Array< string | null > | null,
};

export type CreateQuoteBoardEditorInput = {
  id?: string | null,
  qboardID: string,
  editorID: string,
};

export type ModelQuoteBoardEditorConditionInput = {
  qboardID?: ModelIDInput | null,
  editorID?: ModelIDInput | null,
  and?: Array< ModelQuoteBoardEditorConditionInput | null > | null,
  or?: Array< ModelQuoteBoardEditorConditionInput | null > | null,
  not?: ModelQuoteBoardEditorConditionInput | null,
};

export type UpdateQuoteBoardEditorInput = {
  id: string,
  qboardID?: string | null,
  editorID?: string | null,
};

export type DeleteQuoteBoardEditorInput = {
  id?: string | null,
};

export type CreateQuoteItemInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  productId: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productImagesMore?: Array< string | null > | null,
  productCategory?: string | null,
  quantity?: number | null,
  pricecents?: number | null,
  usernotes?: string | null,
  psize?: Array< string | null > | null,
  pcolor?: Array< string | null > | null,
  pmaterial?: Array< string | null > | null,
  pshape?: Array< string | null > | null,
  pimprint?: Array< string | null > | null,
  quoteItemBoardId?: string | null,
};

export type UpdateQuoteItemInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  productId?: string | null,
  productName?: string | null,
  productDescription?: string | null,
  productImage?: string | null,
  productImagesMore?: Array< string | null > | null,
  productCategory?: string | null,
  quantity?: number | null,
  pricecents?: number | null,
  usernotes?: string | null,
  psize?: Array< string | null > | null,
  pcolor?: Array< string | null > | null,
  pmaterial?: Array< string | null > | null,
  pshape?: Array< string | null > | null,
  pimprint?: Array< string | null > | null,
  quoteItemBoardId?: string | null,
};

export type UpdateShopInput = {
  id: string,
  owner?: string | null,
  shopadmins?: Array< string | null > | null,
  members?: Array< string | null > | null,
  status?: string | null,
  seotitle?: string | null,
  slug?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  invites?: Array< string | null > | null,
};

export type CreateShopEditorInput = {
  id?: string | null,
  shopID: string,
  editorID: string,
};

export type ModelShopEditorConditionInput = {
  shopID?: ModelIDInput | null,
  editorID?: ModelIDInput | null,
  and?: Array< ModelShopEditorConditionInput | null > | null,
  or?: Array< ModelShopEditorConditionInput | null > | null,
  not?: ModelShopEditorConditionInput | null,
};

export type UpdateShopEditorInput = {
  id: string,
  shopID?: string | null,
  editorID?: string | null,
};

export type DeleteShopEditorInput = {
  id?: string | null,
};

export type CreateShopItemInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  access: string,
  productId: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productImagesMore?: Array< string | null > | null,
  productCategory?: string | null,
  quantity?: number | null,
  pricecents?: number | null,
  usernotes?: string | null,
  psize?: Array< string | null > | null,
  pcolor?: Array< string | null > | null,
  pmaterial?: Array< string | null > | null,
  pshape?: Array< string | null > | null,
  pimprint?: Array< string | null > | null,
  shopItemShopId?: string | null,
};

export type UpdateShopItemInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  access?: string | null,
  productId?: string | null,
  productName?: string | null,
  productDescription?: string | null,
  productImage?: string | null,
  productImagesMore?: Array< string | null > | null,
  productCategory?: string | null,
  quantity?: number | null,
  pricecents?: number | null,
  usernotes?: string | null,
  psize?: Array< string | null > | null,
  pcolor?: Array< string | null > | null,
  pmaterial?: Array< string | null > | null,
  pshape?: Array< string | null > | null,
  pimprint?: Array< string | null > | null,
  shopItemShopId?: string | null,
};

export type ModelVisitorInquiryFilterInput = {
  id?: ModelIDInput | null,
  sender?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  message?: ModelStringInput | null,
  sendsns?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelVisitorInquiryFilterInput | null > | null,
  or?: Array< ModelVisitorInquiryFilterInput | null > | null,
  not?: ModelVisitorInquiryFilterInput | null,
};

export type ModelProdSavedFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProdSavedFilterInput | null > | null,
  or?: Array< ModelProdSavedFilterInput | null > | null,
  not?: ModelProdSavedFilterInput | null,
};

export type ModelCartItemFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
  pitemId?: ModelStringInput | null,
  pitemSource?: ModelStringInput | null,
  pitemSourceId?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  pitemQuantity?: ModelIntInput | null,
  pitemPricecentsSel?: ModelIntInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelCartItemFilterInput | null > | null,
  or?: Array< ModelCartItemFilterInput | null > | null,
  not?: ModelCartItemFilterInput | null,
};

export type ModelOrderFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  contactEmail?: ModelStringInput | null,
  contactPhone?: ModelStringInput | null,
  status?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  totalCentsIncrement?: ModelIntInput | null,
  and?: Array< ModelOrderFilterInput | null > | null,
  or?: Array< ModelOrderFilterInput | null > | null,
  not?: ModelOrderFilterInput | null,
};

export type ModelOrderItemFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  username?: ModelStringInput | null,
  orderID?: ModelIDInput | null,
  pitemId?: ModelStringInput | null,
  pitemSource?: ModelStringInput | null,
  pitemSourceId?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  pitemQuantity?: ModelIntInput | null,
  pitemPricecentsSel?: ModelIntInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelOrderItemFilterInput | null > | null,
  or?: Array< ModelOrderItemFilterInput | null > | null,
  not?: ModelOrderItemFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSliderItemFilterInput = {
  id?: ModelIDInput | null,
  seoalt?: ModelStringInput | null,
  uri?: ModelStringInput | null,
  status?: ModelStringInput | null,
  image?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSliderItemFilterInput | null > | null,
  or?: Array< ModelSliderItemFilterInput | null > | null,
  not?: ModelSliderItemFilterInput | null,
};

export type ModelEditorFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelEditorFilterInput | null > | null,
  or?: Array< ModelEditorFilterInput | null > | null,
  not?: ModelEditorFilterInput | null,
};

export type ModelQuoteBoardFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  members?: ModelStringInput | null,
  name?: ModelStringInput | null,
  pendingquotes?: ModelBooleanInput | null,
  description?: ModelStringInput | null,
  imprintdesign?: ModelStringInput | null,
  inhandsdate?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  invites?: ModelStringInput | null,
  and?: Array< ModelQuoteBoardFilterInput | null > | null,
  or?: Array< ModelQuoteBoardFilterInput | null > | null,
  not?: ModelQuoteBoardFilterInput | null,
};

export type ModelQuoteItemFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  productDescription?: ModelStringInput | null,
  productImage?: ModelStringInput | null,
  productImagesMore?: ModelStringInput | null,
  productCategory?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  pricecents?: ModelIntInput | null,
  usernotes?: ModelStringInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelQuoteItemFilterInput | null > | null,
  or?: Array< ModelQuoteItemFilterInput | null > | null,
  not?: ModelQuoteItemFilterInput | null,
};

export type ModelShopFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  shopadmins?: ModelStringInput | null,
  members?: ModelStringInput | null,
  status?: ModelStringInput | null,
  seotitle?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  invites?: ModelStringInput | null,
  and?: Array< ModelShopFilterInput | null > | null,
  or?: Array< ModelShopFilterInput | null > | null,
  not?: ModelShopFilterInput | null,
};

export type ModelShopItemFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  access?: ModelStringInput | null,
  productId?: ModelStringInput | null,
  productName?: ModelStringInput | null,
  productDescription?: ModelStringInput | null,
  productImage?: ModelStringInput | null,
  productImagesMore?: ModelStringInput | null,
  productCategory?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  pricecents?: ModelIntInput | null,
  usernotes?: ModelStringInput | null,
  psize?: ModelStringInput | null,
  pcolor?: ModelStringInput | null,
  pmaterial?: ModelStringInput | null,
  pshape?: ModelStringInput | null,
  pimprint?: ModelStringInput | null,
  and?: Array< ModelShopItemFilterInput | null > | null,
  or?: Array< ModelShopItemFilterInput | null > | null,
  not?: ModelShopItemFilterInput | null,
};

export type UpdateVisitorInquiryMutationVariables = {
  input: UpdateVisitorInquiryInput,
  condition?: ModelVisitorInquiryConditionInput | null,
};

export type UpdateVisitorInquiryMutation = {
  updateVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type DeleteVisitorInquiryMutationVariables = {
  input: DeleteVisitorInquiryInput,
  condition?: ModelVisitorInquiryConditionInput | null,
};

export type DeleteVisitorInquiryMutation = {
  deleteVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type CreateSliderItemMutationVariables = {
  input: CreateSliderItemInput,
  condition?: ModelSliderItemConditionInput | null,
};

export type CreateSliderItemMutation = {
  createSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateSliderItemMutationVariables = {
  input: UpdateSliderItemInput,
  condition?: ModelSliderItemConditionInput | null,
};

export type UpdateSliderItemMutation = {
  updateSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteSliderItemMutationVariables = {
  input: DeleteSliderItemInput,
  condition?: ModelSliderItemConditionInput | null,
};

export type DeleteSliderItemMutation = {
  deleteSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateProdSavedMutationVariables = {
  input: CreateProdSavedInput,
  condition?: ModelProdSavedConditionInput | null,
};

export type CreateProdSavedMutation = {
  createProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type UpdateProdSavedMutationVariables = {
  input: UpdateProdSavedInput,
  condition?: ModelProdSavedConditionInput | null,
};

export type UpdateProdSavedMutation = {
  updateProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type DeleteProdSavedMutationVariables = {
  input: DeleteProdSavedInput,
  condition?: ModelProdSavedConditionInput | null,
};

export type DeleteProdSavedMutation = {
  deleteProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type CreateEditorMutationVariables = {
  input: CreateEditorInput,
  condition?: ModelEditorConditionInput | null,
};

export type CreateEditorMutation = {
  createEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteEditorMutationVariables = {
  input: DeleteEditorInput,
  condition?: ModelEditorConditionInput | null,
};

export type DeleteEditorMutation = {
  deleteEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateQuoteBoardMutationVariables = {
  input: CreateQuoteBoardInput,
  condition?: ModelQuoteBoardConditionInput | null,
};

export type CreateQuoteBoardMutation = {
  createQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteQuoteBoardMutationVariables = {
  input: DeleteQuoteBoardInput,
  condition?: ModelQuoteBoardConditionInput | null,
};

export type DeleteQuoteBoardMutation = {
  deleteQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteQuoteItemMutationVariables = {
  input: DeleteQuoteItemInput,
  condition?: ModelQuoteItemConditionInput | null,
};

export type DeleteQuoteItemMutation = {
  deleteQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateShopMutationVariables = {
  input: CreateShopInput,
  condition?: ModelShopConditionInput | null,
};

export type CreateShopMutation = {
  createShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteShopMutationVariables = {
  input: DeleteShopInput,
  condition?: ModelShopConditionInput | null,
};

export type DeleteShopMutation = {
  deleteShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteShopItemMutationVariables = {
  input: DeleteShopItemInput,
  condition?: ModelShopItemConditionInput | null,
};

export type DeleteShopItemMutation = {
  deleteShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateCartItemMutationVariables = {
  input: CreateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type CreateCartItemMutation = {
  createCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type UpdateCartItemMutationVariables = {
  input: UpdateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type UpdateCartItemMutation = {
  updateCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type DeleteCartItemMutationVariables = {
  input: DeleteCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type DeleteCartItemMutation = {
  deleteCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type CreateOrderMutation = {
  createOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateOrderMutationVariables = {
  input: UpdateOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type UpdateOrderMutation = {
  updateOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteOrderMutationVariables = {
  input: DeleteOrderInput,
  condition?: ModelOrderConditionInput | null,
};

export type DeleteOrderMutation = {
  deleteOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateOrderItemMutationVariables = {
  input: CreateOrderItemInput,
  condition?: ModelOrderItemConditionInput | null,
};

export type CreateOrderItemMutation = {
  createOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateOrderItemMutationVariables = {
  input: UpdateOrderItemInput,
  condition?: ModelOrderItemConditionInput | null,
};

export type UpdateOrderItemMutation = {
  updateOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteOrderItemMutationVariables = {
  input: DeleteOrderItemInput,
  condition?: ModelOrderItemConditionInput | null,
};

export type DeleteOrderItemMutation = {
  deleteOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateVisitorInquiryMutationVariables = {
  input: CreateVisitorInquiryInput,
  condition?: ModelVisitorInquiryConditionInput | null,
};

export type CreateVisitorInquiryMutation = {
  createVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type UpdateEditorMutationVariables = {
  input: UpdateEditorInput,
  condition?: ModelEditorConditionInput | null,
};

export type UpdateEditorMutation = {
  updateEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateQuoteBoardMutationVariables = {
  input: UpdateQuoteBoardInput,
  condition?: ModelQuoteBoardConditionInput | null,
};

export type UpdateQuoteBoardMutation = {
  updateQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateQuoteBoardEditorMutationVariables = {
  input: CreateQuoteBoardEditorInput,
  condition?: ModelQuoteBoardEditorConditionInput | null,
};

export type CreateQuoteBoardEditorMutation = {
  createQuoteBoardEditor:  {
    __typename: "QuoteBoardEditor",
    id: string,
    qboardID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type UpdateQuoteBoardEditorMutationVariables = {
  input: UpdateQuoteBoardEditorInput,
  condition?: ModelQuoteBoardEditorConditionInput | null,
};

export type UpdateQuoteBoardEditorMutation = {
  updateQuoteBoardEditor:  {
    __typename: "QuoteBoardEditor",
    id: string,
    qboardID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteQuoteBoardEditorMutationVariables = {
  input: DeleteQuoteBoardEditorInput,
  condition?: ModelQuoteBoardEditorConditionInput | null,
};

export type DeleteQuoteBoardEditorMutation = {
  deleteQuoteBoardEditor:  {
    __typename: "QuoteBoardEditor",
    id: string,
    qboardID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreateQuoteItemMutationVariables = {
  input: CreateQuoteItemInput,
  condition?: ModelQuoteItemConditionInput | null,
};

export type CreateQuoteItemMutation = {
  createQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateQuoteItemMutationVariables = {
  input: UpdateQuoteItemInput,
  condition?: ModelQuoteItemConditionInput | null,
};

export type UpdateQuoteItemMutation = {
  updateQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateShopMutationVariables = {
  input: UpdateShopInput,
  condition?: ModelShopConditionInput | null,
};

export type UpdateShopMutation = {
  updateShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateShopEditorMutationVariables = {
  input: CreateShopEditorInput,
  condition?: ModelShopEditorConditionInput | null,
};

export type CreateShopEditorMutation = {
  createShopEditor:  {
    __typename: "ShopEditor",
    id: string,
    shopID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type UpdateShopEditorMutationVariables = {
  input: UpdateShopEditorInput,
  condition?: ModelShopEditorConditionInput | null,
};

export type UpdateShopEditorMutation = {
  updateShopEditor:  {
    __typename: "ShopEditor",
    id: string,
    shopID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type DeleteShopEditorMutationVariables = {
  input: DeleteShopEditorInput,
  condition?: ModelShopEditorConditionInput | null,
};

export type DeleteShopEditorMutation = {
  deleteShopEditor:  {
    __typename: "ShopEditor",
    id: string,
    shopID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type CreateShopItemMutationVariables = {
  input: CreateShopItemInput,
  condition?: ModelShopItemConditionInput | null,
};

export type CreateShopItemMutation = {
  createShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateShopItemMutationVariables = {
  input: UpdateShopItemInput,
  condition?: ModelShopItemConditionInput | null,
};

export type UpdateShopItemMutation = {
  updateShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type SendsnssiteadminQueryVariables = {
  sender?: string | null,
  subject?: string | null,
  message?: string | null,
};

export type SendsnssiteadminQuery = {
  sendsnssiteadmin: boolean | null,
};

export type SendemailQueryVariables = {
  sender?: string | null,
  emailto?: string | null,
  subject?: string | null,
  message?: string | null,
};

export type SendemailQuery = {
  sendemail: boolean | null,
};

export type GetdeckanyauthenticatedQueryVariables = {
  id?: string | null,
};

export type GetdeckanyauthenticatedQuery = {
  getdeckanyauthenticated:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type InviteacceptdeckQueryVariables = {
  deckid?: string | null,
};

export type InviteacceptdeckQuery = {
  inviteacceptdeck: boolean | null,
};

export type DeletedeckuserjoinsQueryVariables = {
  deckid?: string | null,
  usernames?: Array< string | null > | null,
};

export type DeletedeckuserjoinsQuery = {
  deletedeckuserjoins: boolean | null,
};

export type CreatequoteitemQueryVariables = {
  deckid?: string | null,
  productId?: string | null,
  productName?: string | null,
  productDescription?: string | null,
  productImage?: string | null,
  productCategory?: string | null,
  quantity?: number | null,
  usernotes?: string | null,
};

export type CreatequoteitemQuery = {
  createquoteitem: boolean | null,
};

export type UpdatequoteitemsdeckQueryVariables = {
  qitemid?: string | null,
  newdeckid?: string | null,
};

export type UpdatequoteitemsdeckQuery = {
  updatequoteitemsdeck: boolean | null,
};

export type CheckshopslugavailQueryVariables = {
  slug?: string | null,
};

export type CheckshopslugavailQuery = {
  checkshopslugavail: boolean | null,
};

export type InviteaddtoshopQueryVariables = {
  shopid?: string | null,
  inviteemail?: string | null,
};

export type InviteaddtoshopQuery = {
  inviteaddtoshop: boolean | null,
};

export type InviteacceptshopQueryVariables = {
  shopid?: string | null,
};

export type InviteacceptshopQuery = {
  inviteacceptshop: boolean | null,
};

export type DeleteshopuserjoinsQueryVariables = {
  shopid?: string | null,
  usernames?: Array< string | null > | null,
};

export type DeleteshopuserjoinsQuery = {
  deleteshopuserjoins: boolean | null,
};

export type CreateshopitemQueryVariables = {
  shopid?: string | null,
  access?: string | null,
  productId?: string | null,
  productName?: string | null,
  productDescription?: string | null,
  productImage?: string | null,
  productImagesMore?: Array< string | null > | null,
  productCategory?: string | null,
  quantity?: number | null,
  pricecents?: number | null,
  usernotes?: string | null,
  psize?: Array< string | null > | null,
  pcolor?: Array< string | null > | null,
  pmaterial?: Array< string | null > | null,
  pshape?: Array< string | null > | null,
  pimprint?: Array< string | null > | null,
};

export type CreateshopitemQuery = {
  createshopitem: boolean | null,
};

export type GetshopitemforeditorQueryVariables = {
  sitemid?: string | null,
};

export type GetshopitemforeditorQuery = {
  getshopitemforeditor:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateshopitemsshopQueryVariables = {
  sitemid?: string | null,
  newshopid?: string | null,
};

export type UpdateshopitemsshopQuery = {
  updateshopitemsshop: boolean | null,
};

export type UpdateshopitemsaccessQueryVariables = {
  sitemid?: string | null,
  newaccess?: string | null,
};

export type UpdateshopitemsaccessQuery = {
  updateshopitemsaccess: boolean | null,
};

export type GetVisitorInquiryQueryVariables = {
  id: string,
};

export type GetVisitorInquiryQuery = {
  getVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type ListVisitorInquirysQueryVariables = {
  filter?: ModelVisitorInquiryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVisitorInquirysQuery = {
  listVisitorInquirys:  {
    __typename: "ModelVisitorInquiryConnection",
    items:  Array< {
      __typename: "VisitorInquiry",
      id: string,
      sender: string,
      subject: string,
      message: string,
      sendsns: boolean | null,
      createdAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetProdSavedQueryVariables = {
  id: string,
};

export type GetProdSavedQuery = {
  getProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type ListProdSavedsQueryVariables = {
  filter?: ModelProdSavedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProdSavedsQuery = {
  listProdSaveds:  {
    __typename: "ModelProdSavedConnection",
    items:  Array< {
      __typename: "ProdSaved",
      id: string,
      userId: string | null,
      productId: string,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCartItemQueryVariables = {
  id: string,
};

export type GetCartItemQuery = {
  getCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type ListCartItemsQueryVariables = {
  filter?: ModelCartItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCartItemsQuery = {
  listCartItems:  {
    __typename: "ModelCartItemConnection",
    items:  Array< {
      __typename: "CartItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      username: string,
      pitemId: string,
      pitemSource: string,
      pitemSourceId: string,
      productId: string,
      productName: string,
      pitemQuantity: number,
      pitemPricecentsSel: number,
      psize: string | null,
      pcolor: string | null,
      pmaterial: string | null,
      pshape: string | null,
      pimprint: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetOrderQueryVariables = {
  id: string,
};

export type GetOrderQuery = {
  getOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListOrdersQueryVariables = {
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrdersQuery = {
  listOrders:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetOrderItemQueryVariables = {
  id: string,
};

export type GetOrderItemQuery = {
  getOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListOrderItemsQueryVariables = {
  filter?: ModelOrderItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrderItemsQuery = {
  listOrderItems:  {
    __typename: "ModelOrderItemConnection",
    items:  Array< {
      __typename: "OrderItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      username: string,
      orderID: string,
      pitemId: string,
      pitemSource: string,
      pitemSourceId: string,
      productId: string,
      productName: string,
      pitemQuantity: number,
      pitemPricecentsSel: number,
      psize: string | null,
      pcolor: string | null,
      pmaterial: string | null,
      pshape: string | null,
      pimprint: string | null,
      order:  {
        __typename: "Order",
        id: string,
        username: string,
        contactEmail: string,
        contactPhone: string | null,
        status: string,
        createdAt: string | null,
        updatedAt: string | null,
        totalCentsIncrement: number,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ProdSavedsByUserIdQueryVariables = {
  userId?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProdSavedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProdSavedsByUserIdQuery = {
  prodSavedsByUserId:  {
    __typename: "ModelProdSavedConnection",
    items:  Array< {
      __typename: "ProdSaved",
      id: string,
      userId: string | null,
      productId: string,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ProdSavedByProdIdQueryVariables = {
  productId?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProdSavedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProdSavedByProdIdQuery = {
  prodSavedByProdId:  {
    __typename: "ModelProdSavedConnection",
    items:  Array< {
      __typename: "ProdSaved",
      id: string,
      userId: string | null,
      productId: string,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type CartItemByUsernameQueryVariables = {
  username?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCartItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CartItemByUsernameQuery = {
  cartItemByUsername:  {
    __typename: "ModelCartItemConnection",
    items:  Array< {
      __typename: "CartItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      username: string,
      pitemId: string,
      pitemSource: string,
      pitemSourceId: string,
      productId: string,
      productName: string,
      pitemQuantity: number,
      pitemPricecentsSel: number,
      psize: string | null,
      pcolor: string | null,
      pmaterial: string | null,
      pshape: string | null,
      pimprint: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OrderByUsernameQueryVariables = {
  username?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrderByUsernameQuery = {
  orderByUsername:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OrderByContactEmailQueryVariables = {
  contactEmail?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrderByContactEmailQuery = {
  orderByContactEmail:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OrderByStatusQueryVariables = {
  status?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrderByStatusQuery = {
  orderByStatus:  {
    __typename: "ModelOrderConnection",
    items:  Array< {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OrderItemByUsernameQueryVariables = {
  username?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelOrderItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type OrderItemByUsernameQuery = {
  orderItemByUsername:  {
    __typename: "ModelOrderItemConnection",
    items:  Array< {
      __typename: "OrderItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      username: string,
      orderID: string,
      pitemId: string,
      pitemSource: string,
      pitemSourceId: string,
      productId: string,
      productName: string,
      pitemQuantity: number,
      pitemPricecentsSel: number,
      psize: string | null,
      pcolor: string | null,
      pmaterial: string | null,
      pshape: string | null,
      pimprint: string | null,
      order:  {
        __typename: "Order",
        id: string,
        username: string,
        contactEmail: string,
        contactPhone: string | null,
        status: string,
        createdAt: string | null,
        updatedAt: string | null,
        totalCentsIncrement: number,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSliderItemQueryVariables = {
  id: string,
};

export type GetSliderItemQuery = {
  getSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListSliderItemsQueryVariables = {
  filter?: ModelSliderItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSliderItemsQuery = {
  listSliderItems:  {
    __typename: "ModelSliderItemConnection",
    items:  Array< {
      __typename: "SliderItem",
      id: string,
      seoalt: string,
      uri: string,
      status: string,
      image: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SliderItemByStatusQueryVariables = {
  status?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSliderItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SliderItemByStatusQuery = {
  sliderItemByStatus:  {
    __typename: "ModelSliderItemConnection",
    items:  Array< {
      __typename: "SliderItem",
      id: string,
      seoalt: string,
      uri: string,
      status: string,
      image: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListEditorsQueryVariables = {
  filter?: ModelEditorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEditorsQuery = {
  listEditors:  {
    __typename: "ModelEditorConnection",
    items:  Array< {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetEditorQueryVariables = {
  id: string,
};

export type GetEditorQuery = {
  getEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type EditorByUsernameQueryVariables = {
  username?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEditorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EditorByUsernameQuery = {
  editorByUsername:  {
    __typename: "ModelEditorConnection",
    items:  Array< {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListQuoteBoardsQueryVariables = {
  filter?: ModelQuoteBoardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuoteBoardsQuery = {
  listQuoteBoards:  {
    __typename: "ModelQuoteBoardConnection",
    items:  Array< {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuoteBoardQueryVariables = {
  id: string,
};

export type GetQuoteBoardQuery = {
  getQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetQuoteItemQueryVariables = {
  id: string,
};

export type GetQuoteItemQuery = {
  getQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListQuoteItemsQueryVariables = {
  filter?: ModelQuoteItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuoteItemsQuery = {
  listQuoteItems:  {
    __typename: "ModelQuoteItemConnection",
    items:  Array< {
      __typename: "QuoteItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      productId: string,
      productName: string,
      productDescription: string,
      productImage: string,
      productImagesMore: Array< string | null > | null,
      productCategory: string | null,
      quantity: number | null,
      pricecents: number | null,
      usernotes: string | null,
      psize: Array< string | null > | null,
      pcolor: Array< string | null > | null,
      pmaterial: Array< string | null > | null,
      pshape: Array< string | null > | null,
      pimprint: Array< string | null > | null,
      board:  {
        __typename: "QuoteBoard",
        id: string,
        owner: string | null,
        members: Array< string | null > | null,
        name: string,
        pendingquotes: boolean | null,
        description: string | null,
        imprintdesign: string | null,
        inhandsdate: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        invites: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type QuoteItemByProdIdQueryVariables = {
  productId?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuoteItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QuoteItemByProdIdQuery = {
  quoteItemByProdId:  {
    __typename: "ModelQuoteItemConnection",
    items:  Array< {
      __typename: "QuoteItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      productId: string,
      productName: string,
      productDescription: string,
      productImage: string,
      productImagesMore: Array< string | null > | null,
      productCategory: string | null,
      quantity: number | null,
      pricecents: number | null,
      usernotes: string | null,
      psize: Array< string | null > | null,
      pcolor: Array< string | null > | null,
      pmaterial: Array< string | null > | null,
      pshape: Array< string | null > | null,
      pimprint: Array< string | null > | null,
      board:  {
        __typename: "QuoteBoard",
        id: string,
        owner: string | null,
        members: Array< string | null > | null,
        name: string,
        pendingquotes: boolean | null,
        description: string | null,
        imprintdesign: string | null,
        inhandsdate: string | null,
        createdAt: string | null,
        updatedAt: string | null,
        invites: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListShopsQueryVariables = {
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShopsQuery = {
  listShops:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShopQueryVariables = {
  id: string,
};

export type GetShopQuery = {
  getShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ShopsByStatusQueryVariables = {
  status?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ShopsByStatusQuery = {
  shopsByStatus:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ShopBySlugQueryVariables = {
  slug?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShopFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ShopBySlugQuery = {
  shopBySlug:  {
    __typename: "ModelShopConnection",
    items:  Array< {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShopItemQueryVariables = {
  id: string,
};

export type GetShopItemQuery = {
  getShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListShopItemsQueryVariables = {
  filter?: ModelShopItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShopItemsQuery = {
  listShopItems:  {
    __typename: "ModelShopItemConnection",
    items:  Array< {
      __typename: "ShopItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      access: string,
      productId: string,
      productName: string,
      productDescription: string,
      productImage: string,
      productImagesMore: Array< string | null > | null,
      productCategory: string | null,
      quantity: number | null,
      pricecents: number | null,
      usernotes: string | null,
      psize: Array< string | null > | null,
      pcolor: Array< string | null > | null,
      pmaterial: Array< string | null > | null,
      pshape: Array< string | null > | null,
      pimprint: Array< string | null > | null,
      shop:  {
        __typename: "Shop",
        id: string,
        owner: string | null,
        shopadmins: Array< string | null > | null,
        members: Array< string | null > | null,
        status: string,
        seotitle: string,
        slug: string,
        createdAt: string | null,
        updatedAt: string | null,
        invites: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ShopItemsByAccessQueryVariables = {
  access?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShopItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ShopItemsByAccessQuery = {
  shopItemsByAccess:  {
    __typename: "ModelShopItemConnection",
    items:  Array< {
      __typename: "ShopItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      access: string,
      productId: string,
      productName: string,
      productDescription: string,
      productImage: string,
      productImagesMore: Array< string | null > | null,
      productCategory: string | null,
      quantity: number | null,
      pricecents: number | null,
      usernotes: string | null,
      psize: Array< string | null > | null,
      pcolor: Array< string | null > | null,
      pmaterial: Array< string | null > | null,
      pshape: Array< string | null > | null,
      pimprint: Array< string | null > | null,
      shop:  {
        __typename: "Shop",
        id: string,
        owner: string | null,
        shopadmins: Array< string | null > | null,
        members: Array< string | null > | null,
        status: string,
        seotitle: string,
        slug: string,
        createdAt: string | null,
        updatedAt: string | null,
        invites: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ShopItemByProdIdQueryVariables = {
  productId?: string | null,
  updatedAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelShopItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ShopItemByProdIdQuery = {
  shopItemByProdId:  {
    __typename: "ModelShopItemConnection",
    items:  Array< {
      __typename: "ShopItem",
      id: string,
      createdAt: string | null,
      updatedAt: string | null,
      access: string,
      productId: string,
      productName: string,
      productDescription: string,
      productImage: string,
      productImagesMore: Array< string | null > | null,
      productCategory: string | null,
      quantity: number | null,
      pricecents: number | null,
      usernotes: string | null,
      psize: Array< string | null > | null,
      pcolor: Array< string | null > | null,
      pmaterial: Array< string | null > | null,
      pshape: Array< string | null > | null,
      pimprint: Array< string | null > | null,
      shop:  {
        __typename: "Shop",
        id: string,
        owner: string | null,
        shopadmins: Array< string | null > | null,
        members: Array< string | null > | null,
        status: string,
        seotitle: string,
        slug: string,
        createdAt: string | null,
        updatedAt: string | null,
        invites: Array< string | null > | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnUpdateVisitorInquirySubscription = {
  onUpdateVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type OnDeleteVisitorInquirySubscription = {
  onDeleteVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type OnCreateSliderItemSubscription = {
  onCreateSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateSliderItemSubscription = {
  onUpdateSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteSliderItemSubscription = {
  onDeleteSliderItem:  {
    __typename: "SliderItem",
    id: string,
    seoalt: string,
    uri: string,
    status: string,
    image: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateProdSavedSubscriptionVariables = {
  userId?: string | null,
};

export type OnCreateProdSavedSubscription = {
  onCreateProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateProdSavedSubscriptionVariables = {
  userId?: string | null,
};

export type OnUpdateProdSavedSubscription = {
  onUpdateProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteProdSavedSubscriptionVariables = {
  userId?: string | null,
};

export type OnDeleteProdSavedSubscription = {
  onDeleteProdSaved:  {
    __typename: "ProdSaved",
    id: string,
    userId: string | null,
    productId: string,
    updatedAt: string | null,
  } | null,
};

export type OnCreateEditorSubscriptionVariables = {
  username?: string | null,
};

export type OnCreateEditorSubscription = {
  onCreateEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteEditorSubscription = {
  onDeleteEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateQuoteBoardSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateQuoteBoardSubscription = {
  onCreateQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteQuoteBoardSubscriptionVariables = {
  owner?: string | null,
  members?: string | null,
};

export type OnDeleteQuoteBoardSubscription = {
  onDeleteQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteQuoteItemSubscription = {
  onDeleteQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateShopSubscriptionVariables = {
  owner?: string | null,
  shopadmins?: string | null,
};

export type OnCreateShopSubscription = {
  onCreateShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteShopSubscriptionVariables = {
  owner?: string | null,
  shopadmins?: string | null,
};

export type OnDeleteShopSubscription = {
  onDeleteShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteShopItemSubscription = {
  onDeleteShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateCartItemSubscriptionVariables = {
  username?: string | null,
};

export type OnCreateCartItemSubscription = {
  onCreateCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type OnUpdateCartItemSubscriptionVariables = {
  username?: string | null,
};

export type OnUpdateCartItemSubscription = {
  onUpdateCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type OnDeleteCartItemSubscriptionVariables = {
  username?: string | null,
};

export type OnDeleteCartItemSubscription = {
  onDeleteCartItem:  {
    __typename: "CartItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
  username?: string | null,
};

export type OnCreateOrderSubscription = {
  onCreateOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
  username?: string | null,
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder:  {
    __typename: "Order",
    id: string,
    username: string,
    contactEmail: string,
    contactPhone: string | null,
    status: string,
    createdAt: string | null,
    updatedAt: string | null,
    totalCentsIncrement: number,
    products:  {
      __typename: "ModelOrderItemConnection",
      items:  Array< {
        __typename: "OrderItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        username: string,
        orderID: string,
        pitemId: string,
        pitemSource: string,
        pitemSourceId: string,
        productId: string,
        productName: string,
        pitemQuantity: number,
        pitemPricecentsSel: number,
        psize: string | null,
        pcolor: string | null,
        pmaterial: string | null,
        pshape: string | null,
        pimprint: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateOrderItemSubscriptionVariables = {
  username?: string | null,
};

export type OnCreateOrderItemSubscription = {
  onCreateOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateOrderItemSubscriptionVariables = {
  username?: string | null,
};

export type OnUpdateOrderItemSubscription = {
  onUpdateOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteOrderItemSubscriptionVariables = {
  username?: string | null,
};

export type OnDeleteOrderItemSubscription = {
  onDeleteOrderItem:  {
    __typename: "OrderItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    username: string,
    orderID: string,
    pitemId: string,
    pitemSource: string,
    pitemSourceId: string,
    productId: string,
    productName: string,
    pitemQuantity: number,
    pitemPricecentsSel: number,
    psize: string | null,
    pcolor: string | null,
    pmaterial: string | null,
    pshape: string | null,
    pimprint: string | null,
    order:  {
      __typename: "Order",
      id: string,
      username: string,
      contactEmail: string,
      contactPhone: string | null,
      status: string,
      createdAt: string | null,
      updatedAt: string | null,
      totalCentsIncrement: number,
      products:  {
        __typename: "ModelOrderItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateVisitorInquirySubscription = {
  onCreateVisitorInquiry:  {
    __typename: "VisitorInquiry",
    id: string,
    sender: string,
    subject: string,
    message: string,
    sendsns: boolean | null,
    createdAt: string | null,
  } | null,
};

export type OnUpdateEditorSubscriptionVariables = {
  username?: string | null,
};

export type OnUpdateEditorSubscription = {
  onUpdateEditor:  {
    __typename: "Editor",
    id: string,
    username: string,
    qboards:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    shops:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateQuoteBoardSubscriptionVariables = {
  owner?: string | null,
  members?: string | null,
};

export type OnUpdateQuoteBoardSubscription = {
  onUpdateQuoteBoard:  {
    __typename: "QuoteBoard",
    id: string,
    owner: string | null,
    members: Array< string | null > | null,
    name: string,
    pendingquotes: boolean | null,
    description: string | null,
    imprintdesign: string | null,
    inhandsdate: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelQuoteBoardEditorConnection",
      items:  Array< {
        __typename: "QuoteBoardEditor",
        id: string,
        qboardID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    qitems:  {
      __typename: "ModelQuoteItemConnection",
      items:  Array< {
        __typename: "QuoteItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateQuoteBoardEditorSubscriptionVariables = {
  editorUsername?: string | null,
};

export type OnCreateQuoteBoardEditorSubscription = {
  onCreateQuoteBoardEditor:  {
    __typename: "QuoteBoardEditor",
    id: string,
    qboardID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateQuoteBoardEditorSubscriptionVariables = {
  editorUsername?: string | null,
};

export type OnUpdateQuoteBoardEditorSubscription = {
  onUpdateQuoteBoardEditor:  {
    __typename: "QuoteBoardEditor",
    id: string,
    qboardID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteQuoteBoardEditorSubscriptionVariables = {
  editorUsername?: string | null,
};

export type OnDeleteQuoteBoardEditorSubscription = {
  onDeleteQuoteBoardEditor:  {
    __typename: "QuoteBoardEditor",
    id: string,
    qboardID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateQuoteItemSubscription = {
  onCreateQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateQuoteItemSubscription = {
  onUpdateQuoteItem:  {
    __typename: "QuoteItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    board:  {
      __typename: "QuoteBoard",
      id: string,
      owner: string | null,
      members: Array< string | null > | null,
      name: string,
      pendingquotes: boolean | null,
      description: string | null,
      imprintdesign: string | null,
      inhandsdate: string | null,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      qitems:  {
        __typename: "ModelQuoteItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateShopSubscriptionVariables = {
  owner?: string | null,
  shopadmins?: string | null,
};

export type OnUpdateShopSubscription = {
  onUpdateShop:  {
    __typename: "Shop",
    id: string,
    owner: string | null,
    shopadmins: Array< string | null > | null,
    members: Array< string | null > | null,
    status: string,
    seotitle: string,
    slug: string,
    createdAt: string | null,
    updatedAt: string | null,
    invites: Array< string | null > | null,
    editors:  {
      __typename: "ModelShopEditorConnection",
      items:  Array< {
        __typename: "ShopEditor",
        id: string,
        shopID: string,
        editorID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    sitems:  {
      __typename: "ModelShopItemConnection",
      items:  Array< {
        __typename: "ShopItem",
        id: string,
        createdAt: string | null,
        updatedAt: string | null,
        access: string,
        productId: string,
        productName: string,
        productDescription: string,
        productImage: string,
        productImagesMore: Array< string | null > | null,
        productCategory: string | null,
        quantity: number | null,
        pricecents: number | null,
        usernotes: string | null,
        psize: Array< string | null > | null,
        pcolor: Array< string | null > | null,
        pmaterial: Array< string | null > | null,
        pshape: Array< string | null > | null,
        pimprint: Array< string | null > | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateShopEditorSubscriptionVariables = {
  editorUsername?: string | null,
};

export type OnCreateShopEditorSubscription = {
  onCreateShopEditor:  {
    __typename: "ShopEditor",
    id: string,
    shopID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateShopEditorSubscriptionVariables = {
  editorUsername?: string | null,
};

export type OnUpdateShopEditorSubscription = {
  onUpdateShopEditor:  {
    __typename: "ShopEditor",
    id: string,
    shopID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteShopEditorSubscriptionVariables = {
  editorUsername?: string | null,
};

export type OnDeleteShopEditorSubscription = {
  onDeleteShopEditor:  {
    __typename: "ShopEditor",
    id: string,
    shopID: string,
    editorID: string,
    editor:  {
      __typename: "Editor",
      id: string,
      username: string,
      qboards:  {
        __typename: "ModelQuoteBoardEditorConnection",
        nextToken: string | null,
      } | null,
      shops:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
    },
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateShopItemSubscription = {
  onCreateShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateShopItemSubscription = {
  onUpdateShopItem:  {
    __typename: "ShopItem",
    id: string,
    createdAt: string | null,
    updatedAt: string | null,
    access: string,
    productId: string,
    productName: string,
    productDescription: string,
    productImage: string,
    productImagesMore: Array< string | null > | null,
    productCategory: string | null,
    quantity: number | null,
    pricecents: number | null,
    usernotes: string | null,
    psize: Array< string | null > | null,
    pcolor: Array< string | null > | null,
    pmaterial: Array< string | null > | null,
    pshape: Array< string | null > | null,
    pimprint: Array< string | null > | null,
    shop:  {
      __typename: "Shop",
      id: string,
      owner: string | null,
      shopadmins: Array< string | null > | null,
      members: Array< string | null > | null,
      status: string,
      seotitle: string,
      slug: string,
      createdAt: string | null,
      updatedAt: string | null,
      invites: Array< string | null > | null,
      editors:  {
        __typename: "ModelShopEditorConnection",
        nextToken: string | null,
      } | null,
      sitems:  {
        __typename: "ModelShopItemConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
