// tslint:disable
// selected GraphQL operations (curated/edited manually after amplify codegen)

export const createVisitorInquiry = `mutation CreateVisitorInquiry($input: CreateVisitorInquiryInput!) {
  createVisitorInquiry(input: $input) {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`

export const sendsnssiteadmin = `query Sendsnssiteadmin($sender: String, $subject: String, $message: String) {
  sendsnssiteadmin(sender: $sender, subject: $subject, message: $message)
}
`

export const sendemail = `query Sendemail(
  $sender: String
  $emailto: AWSEmail
  $subject: String
  $message: String
) {
  sendemail(
    sender: $sender
    emailto: $emailto
    subject: $subject
    message: $message
  )
}
`

export const createProdSaved = `mutation CreateProdSaved($input: CreateProdSavedInput!) {
  createProdSaved(input: $input) {
    id
    userId
    productId
  }
}
`

export const deleteProdSaved = `mutation DeleteProdSaved($input: DeleteProdSavedInput!) {
  deleteProdSaved(input: $input) {
    id
    userId
    productId
  }
}
`

export interface IListProdSavedsItem {
  id: string
  userId: string
  productId: string
  updatedAt: string
}

export const prodSavedsAllByUserId = `query ProdSavedsByUserId($userId: String) {
  prodSavedsByUserId(
    userId: $userId
    sortDirection: DESC
    limit: 9999
  ) {
    items {
      id
      userId
      productId
      updatedAt
    }
  }
}
`

// NOTE: when used by admin, check nextToken
// could also apply filters by updatedAt etc. if needed
export const prodSavedByProdId = `query ProdSavedByProdId($productId: String, $nextToken: String) {
  prodSavedByProdId(
    productId: $productId
    sortDirection: DESC
    limit: 9999
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      productId
      updatedAt
    }
    nextToken
  }
}
`

export const createEditor = `mutation CreateEditor($input: CreateEditorInput!) {
  createEditor(input: $input) {
    id
    username
  }
}
`

export const getEditorExists = `query GetEditor($id: ID!) {
  getEditor(id: $id) {
    id
    username
  }
}
`

// QuoteBoard (aka Deck) with join-type to users
export const createQuoteBoard = `mutation CreateQuoteBoard($input: CreateQuoteBoardInput!) {
  createQuoteBoard(input: $input) {
    id
    owner
    members
    name
    pendingquotes
    description
    imprintdesign
    inhandsdate
    invites
  }
}
`
export const createQuoteBoardEditor = `mutation CreateQuoteBoardEditor($input: CreateQuoteBoardEditorInput!) {
  createQuoteBoardEditor(input: $input) {
    id
    qboardID
    editorID
  }
}
`
export const deckEditorId = (deckId: string, userName: string) => `${deckId}_${userName}`
export const deleteQuoteBoard = `mutation DeleteQuoteBoard($input: DeleteQuoteBoardInput!) {
  deleteQuoteBoard(input: $input) {
    id
  }
}
`
export const deleteQuoteBoardEditor = `mutation DeleteQuoteBoardEditor($input: DeleteQuoteBoardEditorInput!) {
  deleteQuoteBoardEditor(input: $input) {
    id
    qboardID
    editorID
  }
}
`

// list all decks at once to prevent paginated responses
// https://github.com/aws-amplify/amplify-cli/issues/1290
// https://stackoverflow.com/questions/56286888/aws-appsync-only-returns-10-items-on-query-on-connection
export const getEditorDecks = `query GetEditor($id: ID!) {
  getEditor(id: $id) {
    id
    username
    qboards(limit:9999) {
      items {
        board {
          id
          owner
          members
          name
          pendingquotes
          updatedAt
        }
      }
      nextToken
    }
  }
}
`

export interface IDeck {
  id: string
  owner: string
  members: string[]
  name: string
  pendingquotes: boolean
  updatedAt: string
  inhandsdate?: string
}

export const listQuoteBoards = `query ListQuoteBoards(
  $filter: ModelQuoteBoardFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuoteBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      members
      name
      pendingquotes
      inhandsdate
      updatedAt
    }
    nextToken
  }
}
`

export const subscribeToNewDecks = `subscription OnCreateQuoteBoard($owner: String) {
  onCreateQuoteBoard(owner: $owner) {
    id
    owner
    members
    name
    pendingquotes
    updatedAt
  }
}
`

export const updateQuoteBoard = `mutation UpdateQuoteBoard($input: UpdateQuoteBoardInput!) {
  updateQuoteBoard(input: $input) {
    id
    owner
    members
    name
    pendingquotes
    description
    imprintdesign
    inhandsdate
    createdAt
    updatedAt
    invites
  }
}
`

export const inviteacceptdeck = `query Inviteacceptdeck($deckid: String) {
  inviteacceptdeck(deckid: $deckid)
}
`
export const deletedeckuserjoins = `query Deletedeckuserjoins($deckid: String, $usernames: [String]) {
  deletedeckuserjoins(deckid: $deckid, usernames: $usernames)
}
`

// list all board items at once to prevent paginated responses
// https://github.com/aws-amplify/amplify-cli/issues/1290
// https://stackoverflow.com/questions/56286888/aws-appsync-only-returns-10-items-on-query-on-connection
export const getQuoteBoard = `query GetQuoteBoard($id: ID!) {
  getQuoteBoard(id: $id) {
    id
    owner
    members
    name
    pendingquotes
    description
    imprintdesign
    inhandsdate
    createdAt
    updatedAt
    invites
    qitems(limit:9999, sortDirection: DESC) {
      items {
        id
        createdAt
        updatedAt
        productId
        productName
        productDescription
        productImage
        productImagesMore
        productCategory
        quantity
        pricecents
        usernotes
        psize
        pcolor
        pmaterial
        pshape
        pimprint
      }
      nextToken
    }
  }
}
`

export const createquoteitem = `query Createquoteitem(
  $deckid: String
  $productId: String
  $productName: String
  $productDescription: String
  $productImage: String
  $productCategory: String
  $quantity: Int
  $usernotes: String
) {
  createquoteitem(
    deckid: $deckid
    productId: $productId
    productName: $productName
    productDescription: $productDescription
    productImage: $productImage
    productCategory: $productCategory
    quantity: $quantity
    usernotes: $usernotes
  )
}
`

export const updatequoteitemsdeck = `query Updatequoteitemsdeck($qitemid: String, $newdeckid: String) {
  updatequoteitemsdeck(qitemid: $qitemid, newdeckid: $newdeckid)
}
`

export const getQuoteItem = `query GetQuoteItem($id: ID!) {
  getQuoteItem(id: $id) {
    id
    createdAt
    updatedAt
    productId
    productName
    productDescription
    productImage
    productImagesMore
    productCategory
    quantity
    pricecents
    usernotes
    psize
    pcolor
    pmaterial
    pshape
    pimprint
    board {
      id
      owner
      members
      name
      pendingquotes
      description
      imprintdesign
      inhandsdate
      createdAt
      updatedAt
    }
  }
}
`

export const editQuoteItem = `mutation UpdateQuoteItem(
  $input: UpdateQuoteItemInput!
  $condition: ModelQuoteItemConditionInput
) {
  updateQuoteItem(input: $input, condition: $condition) {
    id
    productName
    productDescription
    productImage
    productImagesMore
    pricecents
    psize
    pcolor
    pmaterial
    pshape
    pimprint
  }
}
`

// for admin stream item table
export const quoteItemByProdIdAdmin = `query QuoteItemByProdId($productId: String) {
  quoteItemByProdId(
    productId: $productId
    sortDirection: DESC
    limit: 9999
  ) {
    items {
      id
      createdAt
      updatedAt
      productId
      productName
      quantity
      pricecents
      usernotes
      psize
      pcolor
      pmaterial
      pshape
      pimprint
      board {
        id
        name
        pendingquotes
      }
    }
  }
}
`

// Shop with many-to-many join-type to users
export const createShop = `mutation CreateShop($input: CreateShopInput!) {
  createShop(input: $input) {
    id
    owner
    shopadmins
    members
    status
    seotitle
    slug
    invites
  }
}
`
export const createShopEditor = `mutation CreateShopEditor($input: CreateShopEditorInput!) {
  createShopEditor(input: $input) {
    id
    shopID
    editorID
  }
}
`
export const shopEditorId = (shopId: string, userName: string) => `${shopId}_${userName}`
export const deleteShop = `mutation DeleteShop($input: DeleteShopInput!) {
  deleteShop(input: $input) {
    id
  }
}
`
export const deleteShopEditor = `mutation DeleteShopEditor($input: DeleteShopEditorInput!) {
  deleteShopEditor(input: $input) {
    id
    shopID
    editorID
  }
}
`

export const getEditorShops = `query GetEditor($id: ID!) {
  getEditor(id: $id) {
    id
    username
    shops(limit:9999) {
      items {
        shop {
          id
          owner
          shopadmins
          members
          status
          seotitle
          slug
          updatedAt
        }
      }
      nextToken
    }
  }
}
`

export const listShops = `query ListShops(
  $filter: ModelShopFilterInput
  $limit: Int
  $nextToken: String
) {
  listShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner
      shopadmins
      members
      status
      seotitle
      slug
      createdAt
      updatedAt
    }
    nextToken
  }
}
`

export const shopsByStatus = `query ShopsByStatus(
  $status: String
  $sortDirection: ModelSortDirection
  $limit: Int
  $nextToken: String
) {
  shopsByStatus(
    status: $status
    sortDirection: $sortDirection
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      shopadmins
      members
      status
      seotitle
      slug
      createdAt
      updatedAt
      invites
    }
    nextToken
  }
}
`

export const getShopInfo = `query GetShop($id: ID!) {
  getShop(id: $id) {
    id
    owner
    shopadmins
    members
    status
    seotitle
    slug
    createdAt
    updatedAt
    invites
  }
}
`

export const getShopRecentItems = `query GetShop($id: ID!) {
  getShop(id: $id) {
    id
    owner
    shopadmins
    members
    status
    seotitle
    slug
    createdAt
    updatedAt
    invites
    sitems(limit:60, sortDirection: DESC) {
      items {
        id
        createdAt
        updatedAt
        access
        productId
        productName
        productDescription
        productImage
        productImagesMore
        productCategory
        quantity
        pricecents
        usernotes
        psize
        pcolor
        pmaterial
        pshape
        pimprint
      }
    }
  }
}
`

export const checkshopslugavail = `query Checkshopslugavail($slug: String) {
  checkshopslugavail(slug: $slug)
}
`

export const updateShop = `mutation UpdateShop($input: UpdateShopInput!) {
  updateShop(input: $input) {
    id
    owner
    shopadmins
    members
    status
    seotitle
    slug
    createdAt
    updatedAt
    invites
  }
}
`

export const inviteaddtoshop = `query Inviteaddtoshop($shopid: String, $inviteemail: String) {
  inviteaddtoshop(shopid: $shopid, inviteemail: $inviteemail)
}
`

export const inviteacceptshop = `query Inviteacceptshop($shopid: String) {
  inviteacceptshop(shopid: $shopid)
}
`

export const deleteshopuserjoins = `query Deleteshopuserjoins($shopid: String, $usernames: [String]) {
  deleteshopuserjoins(shopid: $shopid, usernames: $usernames)
}
`

export const createshopitem = `query Createshopitem(
  $shopid: String
  $access: String
  $productId: String
  $productName: String
  $productDescription: String
  $productImage: String
  $productImagesMore: [String]
  $productCategory: String
  $quantity: Int
  $pricecents: Int
  $usernotes: String
  $psize: [String]
  $pcolor: [String]
  $pmaterial: [String]
  $pshape: [String]
  $pimprint: [String]
) {
  createshopitem(
    shopid: $shopid
    access: $access
    productId: $productId
    productName: $productName
    productDescription: $productDescription
    productImage: $productImage
    productImagesMore: $productImagesMore
    productCategory: $productCategory
    quantity: $quantity
    pricecents: $pricecents
    usernotes: $usernotes
    psize: $psize
    pcolor: $pcolor
    pmaterial: $pmaterial
    pshape: $pshape
    pimprint: $pimprint
  )
}
`

// NOTE: response field selection should match createShopItem in query.js
//  of merchacha{...}begraphql, except for the shop-part (return type does not handle it)
export const getshopitemforeditor = `query Getshopitemforeditor($sitemid: String) {
  getshopitemforeditor(sitemid: $sitemid) {
    id
    access
    productName
  }
}
`

export const updateshopitemsshop = `query Updateshopitemsshop($sitemid: String, $newshopid: String) {
  updateshopitemsshop(sitemid: $sitemid, newshopid: $newshopid)
}
`

export const updateshopitemsaccess = `query Updateshopitemsaccess($sitemid: String, $newaccess: String) {
  updateshopitemsaccess(sitemid: $sitemid, newaccess: $newaccess)
}
`

export const getShopItem = `query GetShopItem($id: ID!) {
  getShopItem(id: $id) {
    id
    createdAt
    updatedAt
    access
    productId
    productName
    productDescription
    productImage
    productImagesMore
    productCategory
    quantity
    pricecents
    usernotes
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
      createdAt
      updatedAt
      invites
    }
  }
}
`

export const editShopItem = `mutation UpdateShopItem(
  $input: UpdateShopItemInput!
  $condition: ModelShopItemConditionInput
) {
  updateShopItem(input: $input, condition: $condition) {
    id
    access
    productId
    productName
    productDescription
    productImage
    productImagesMore
    pricecents
    psize
    pcolor
    pmaterial
    pshape
    pimprint
  }
}
`

// for admin stream item table
export const shopItemByProdIdAdmin = `query ShopItemByProdId($productId: String) {
  shopItemByProdId(
    productId: $productId
    sortDirection: DESC
    limit: 9999
  ) {
    items {
      id
      createdAt
      updatedAt
      access
      productId
      productName
      quantity
      pricecents
      usernotes
      psize
      pcolor
      pmaterial
      pshape
      pimprint
      shop {
        id
        status
        seotitle
        slug
      }
    }
  }
}
`

interface IItemAttributes {
  psize: Array<string | null> | null
  pcolor: Array<string | null> | null
  pmaterial: Array<string | null> | null
  pshape: Array<string | null> | null
  pimprint: Array<string | null> | null
}
interface IItemAttrsStreamProps extends IItemAttributes {
  productId: string
  productName: string
  productDescription: string
  productImage: string
  productImagesMore: Array<string | null> | null
  productCategory: string | null
}
// Array element type from GetQuoteBoardQuery qitems
export interface IQuoteItem extends IItemAttrsStreamProps {
  id: string
  createdAt: string | null
  updatedAt: string | null
  quantity: number | null
  pricecents: number | null
  usernotes: string | null
}
// Array element type from GetShopQuery sitems
interface IShopItemsItem extends IItemAttrsStreamProps {
  id: string
  createdAt: string | null
  updatedAt: string | null
  access: string
  quantity: number | null
  pricecents: number | null
  usernotes: string | null
}
export type IShopItem = IShopItemsItem | null

// combined interface for admin tools store item component
export interface IStoreItem extends IItemAttrsStreamProps {
  id: string
  createdAt: string | null
  updatedAt: string | null
  access?: string
  quantity: number | null
  pricecents: number | null
  usernotes: string | null
  board?: {
    id: string
    pendingquotes: boolean | null
    name: string
    description: string
    imprintdesign: string
  }
  shop?: {
    id: string
    status: string
    seotitle: string
    slug: string
  }
}

interface IAttributeField {
  field: keyof IItemAttributes
  text: string
}

export const attributeFields: Array<IAttributeField> = [
  { field: 'psize', text: 'SIZE' },
  { field: 'pcolor', text: 'COLOR' },
  { field: 'pmaterial', text: 'MATERIAL' },
  { field: 'pshape', text: 'SHAPE' },
  { field: 'pimprint', text: 'IMPRINT' },
]

export const createCartItem = `mutation CreateCartItem(
  $input: CreateCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  createCartItem(input: $input, condition: $condition) {
    id
    username
    pitemId
    pitemSource
    pitemSourceId
    productId
    productName
    pitemQuantity
    pitemPricecentsSel
    psize
    pcolor
    pmaterial
    pshape
    pimprint
  }
}
`

export const getUserCartItems = `query CartItemByUsername($username: String) {
  cartItemByUsername(
    username: $username
    sortDirection: DESC
    limit: 9999
  ) {
    items {
      id
      pitemId
      pitemSource
      pitemSourceId
      productId
      productName
      pitemQuantity
      pitemPricecentsSel
      psize
      pcolor
      pmaterial
      pshape
      pimprint
    }
  }
}
`

export const deleteCartItem = `mutation DeleteCartItem($input: DeleteCartItemInput!) {
  deleteCartItem(input: $input) {
    id
  }
}
`

export const createOrder = `mutation CreateOrder(
  $input: CreateOrderInput!
  $condition: ModelOrderConditionInput
) {
  createOrder(input: $input, condition: $condition) {
    id
    username
    contactEmail
    contactPhone
    status
    totalCentsIncrement
  }
}
`

export const createOrderItem = `mutation CreateOrderItem(
  $input: CreateOrderItemInput!
  $condition: ModelOrderItemConditionInput
) {
  createOrderItem(input: $input, condition: $condition) {
    id
    username
    orderID
    pitemId
    pitemSource
    pitemSourceId
    productId
    productName
    pitemQuantity
    pitemPricecentsSel
    psize
    pcolor
    pmaterial
    pshape
    pimprint
  }
}
`

export const getUserOrders = `query OrderByUsername($username: String) {
  orderByUsername(
    username: $username
    sortDirection: DESC
    limit: 9999
  ) {
    items {
      id
      username
      status
      createdAt
      products(limit:9999, sortDirection: DESC) {
        items {
          id
          pitemQuantity
          pitemPricecentsSel
        }
      }
    }
  }
}
`

export const listOrdersByStatus = `query OrderByStatus(
  $status: String
  $updatedAt: ModelStringKeyConditionInput
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  orderByStatus(
    status: $status
    updatedAt: $updatedAt
    sortDirection: DESC
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      username
      contactEmail
      contactPhone
      status
      createdAt
      updatedAt
      totalCentsIncrement
      products(limit:9999, sortDirection: DESC) {
        items {
          id
          pitemQuantity
          pitemPricecentsSel
        }
      }
    }
    nextToken
  }
}
`

export const getOrder = `query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    username
    contactEmail
    contactPhone
    status
    createdAt
    updatedAt
    totalCentsIncrement
    products(limit:9999, sortDirection: DESC) {
      items {
        id
        pitemId
        pitemSource
        pitemSourceId
        productId
        productName
        pitemQuantity
        pitemPricecentsSel
        psize
        pcolor
        pmaterial
        pshape
        pimprint
      }
    }
  }
}
`

export const updateOrder = `mutation UpdateOrder($input: UpdateOrderInput!) {
  updateOrder(input: $input) {
    id
    username
    contactEmail
    contactPhone
    status
    totalCentsIncrement
  }
}
`

export const createSliderItem = `mutation CreateSliderItem($input: CreateSliderItemInput!) {
  createSliderItem(input: $input) {
    id
    seoalt
    uri
    status
    image
  }
}
`

export const getSliderItem = `query GetSliderItem($id: ID!) {
  getSliderItem(id: $id) {
    id
    seoalt
    uri
    status
    image
    createdAt
    updatedAt
  }
}
`

export const listSliderItems = `query ListSliderItems($filter: ModelSliderItemFilterInput) {
  listSliderItems(filter: $filter, limit: 9999) {
    items {
      id
      seoalt
      uri
      status
      image
      createdAt
      updatedAt
    }
  }
}
`

export const updateSliderItem = `mutation UpdateSliderItem($input: UpdateSliderItemInput!) {
  updateSliderItem(input: $input) {
    id
    seoalt
    uri
    status
    image
  }
}
`

export const deleteSliderItem = `mutation DeleteSliderItem($input: DeleteSliderItemInput!) {
  deleteSliderItem(input: $input) {
    id
  }
}
`
