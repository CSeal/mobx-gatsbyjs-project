// tslint:disable
// this is an auto generated file. This will be overwritten

export const sendsnssiteadmin = `query Sendsnssiteadmin($sender: String, $subject: String, $message: String) {
  sendsnssiteadmin(sender: $sender, subject: $subject, message: $message)
}
`;
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
`;
export const getdeckanyauthenticated = `query Getdeckanyauthenticated($id: String) {
  getdeckanyauthenticated(id: $id) {
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
    editors {
      items {
        id
        qboardID
        editorID
      }
      nextToken
    }
    qitems {
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
`;
export const inviteacceptdeck = `query Inviteacceptdeck($deckid: String) {
  inviteacceptdeck(deckid: $deckid)
}
`;
export const deletedeckuserjoins = `query Deletedeckuserjoins($deckid: String, $usernames: [String]) {
  deletedeckuserjoins(deckid: $deckid, usernames: $usernames)
}
`;
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
`;
export const updatequoteitemsdeck = `query Updatequoteitemsdeck($qitemid: String, $newdeckid: String) {
  updatequoteitemsdeck(qitemid: $qitemid, newdeckid: $newdeckid)
}
`;
export const checkshopslugavail = `query Checkshopslugavail($slug: String) {
  checkshopslugavail(slug: $slug)
}
`;
export const inviteaddtoshop = `query Inviteaddtoshop($shopid: String, $inviteemail: String) {
  inviteaddtoshop(shopid: $shopid, inviteemail: $inviteemail)
}
`;
export const inviteacceptshop = `query Inviteacceptshop($shopid: String) {
  inviteacceptshop(shopid: $shopid)
}
`;
export const deleteshopuserjoins = `query Deleteshopuserjoins($shopid: String, $usernames: [String]) {
  deleteshopuserjoins(shopid: $shopid, usernames: $usernames)
}
`;
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
`;
export const getshopitemforeditor = `query Getshopitemforeditor($sitemid: String) {
  getshopitemforeditor(sitemid: $sitemid) {
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
      editors {
        nextToken
      }
      sitems {
        nextToken
      }
    }
  }
}
`;
export const updateshopitemsshop = `query Updateshopitemsshop($sitemid: String, $newshopid: String) {
  updateshopitemsshop(sitemid: $sitemid, newshopid: $newshopid)
}
`;
export const updateshopitemsaccess = `query Updateshopitemsaccess($sitemid: String, $newaccess: String) {
  updateshopitemsaccess(sitemid: $sitemid, newaccess: $newaccess)
}
`;
export const getVisitorInquiry = `query GetVisitorInquiry($id: ID!) {
  getVisitorInquiry(id: $id) {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const listVisitorInquirys = `query ListVisitorInquirys(
  $filter: ModelVisitorInquiryFilterInput
  $limit: Int
  $nextToken: String
) {
  listVisitorInquirys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      sender
      subject
      message
      sendsns
      createdAt
    }
    nextToken
  }
}
`;
export const getProdSaved = `query GetProdSaved($id: ID!) {
  getProdSaved(id: $id) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const listProdSaveds = `query ListProdSaveds(
  $filter: ModelProdSavedFilterInput
  $limit: Int
  $nextToken: String
) {
  listProdSaveds(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      productId
      updatedAt
    }
    nextToken
  }
}
`;
export const getCartItem = `query GetCartItem($id: ID!) {
  getCartItem(id: $id) {
    id
    createdAt
    updatedAt
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
`;
export const listCartItems = `query ListCartItems(
  $filter: ModelCartItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listCartItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
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
    nextToken
  }
}
`;
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
    products {
      items {
        id
        createdAt
        updatedAt
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
      nextToken
    }
  }
}
`;
export const listOrders = `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      contactEmail
      contactPhone
      status
      createdAt
      updatedAt
      totalCentsIncrement
      products {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getOrderItem = `query GetOrderItem($id: ID!) {
  getOrderItem(id: $id) {
    id
    createdAt
    updatedAt
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
    order {
      id
      username
      contactEmail
      contactPhone
      status
      createdAt
      updatedAt
      totalCentsIncrement
      products {
        nextToken
      }
    }
  }
}
`;
export const listOrderItems = `query ListOrderItems(
  $filter: ModelOrderItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
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
      order {
        id
        username
        contactEmail
        contactPhone
        status
        createdAt
        updatedAt
        totalCentsIncrement
      }
    }
    nextToken
  }
}
`;
export const prodSavedsByUserId = `query ProdSavedsByUserId(
  $userId: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelProdSavedFilterInput
  $limit: Int
  $nextToken: String
) {
  prodSavedsByUserId(
    userId: $userId
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
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
`;
export const prodSavedByProdId = `query ProdSavedByProdId(
  $productId: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelProdSavedFilterInput
  $limit: Int
  $nextToken: String
) {
  prodSavedByProdId(
    productId: $productId
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
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
`;
export const cartItemByUsername = `query CartItemByUsername(
  $username: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCartItemFilterInput
  $limit: Int
  $nextToken: String
) {
  cartItemByUsername(
    username: $username
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      updatedAt
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
    nextToken
  }
}
`;
export const orderByUsername = `query OrderByUsername(
  $username: String
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  orderByUsername(
    username: $username
    createdAt: $createdAt
    sortDirection: $sortDirection
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
      products {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const orderByContactEmail = `query OrderByContactEmail(
  $contactEmail: String
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  orderByContactEmail(
    contactEmail: $contactEmail
    createdAt: $createdAt
    sortDirection: $sortDirection
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
      products {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const orderByStatus = `query OrderByStatus(
  $status: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  orderByStatus(
    status: $status
    updatedAt: $updatedAt
    sortDirection: $sortDirection
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
      products {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const orderItemByUsername = `query OrderItemByUsername(
  $username: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelOrderItemFilterInput
  $limit: Int
  $nextToken: String
) {
  orderItemByUsername(
    username: $username
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      updatedAt
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
      order {
        id
        username
        contactEmail
        contactPhone
        status
        createdAt
        updatedAt
        totalCentsIncrement
      }
    }
    nextToken
  }
}
`;
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
`;
export const listSliderItems = `query ListSliderItems(
  $filter: ModelSliderItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listSliderItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      seoalt
      uri
      status
      image
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const sliderItemByStatus = `query SliderItemByStatus(
  $status: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelSliderItemFilterInput
  $limit: Int
  $nextToken: String
) {
  sliderItemByStatus(
    status: $status
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      seoalt
      uri
      status
      image
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const listEditors = `query ListEditors(
  $filter: ModelEditorFilterInput
  $limit: Int
  $nextToken: String
) {
  listEditors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getEditor = `query GetEditor($id: ID!) {
  getEditor(id: $id) {
    id
    username
    qboards {
      items {
        id
        qboardID
        editorID
      }
      nextToken
    }
    shops {
      items {
        id
        shopID
        editorID
      }
      nextToken
    }
  }
}
`;
export const editorByUsername = `query EditorByUsername(
  $username: String
  $sortDirection: ModelSortDirection
  $filter: ModelEditorFilterInput
  $limit: Int
  $nextToken: String
) {
  editorByUsername(
    username: $username
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
    nextToken
  }
}
`;
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
      description
      imprintdesign
      inhandsdate
      createdAt
      updatedAt
      invites
      editors {
        nextToken
      }
      qitems {
        nextToken
      }
    }
    nextToken
  }
}
`;
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
    editors {
      items {
        id
        qboardID
        editorID
      }
      nextToken
    }
    qitems {
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
`;
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
      invites
      editors {
        nextToken
      }
      qitems {
        nextToken
      }
    }
  }
}
`;
export const listQuoteItems = `query ListQuoteItems(
  $filter: ModelQuoteItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuoteItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        invites
      }
    }
    nextToken
  }
}
`;
export const quoteItemByProdId = `query QuoteItemByProdId(
  $productId: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelQuoteItemFilterInput
  $limit: Int
  $nextToken: String
) {
  quoteItemByProdId(
    productId: $productId
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
        invites
      }
    }
    nextToken
  }
}
`;
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
      invites
      editors {
        nextToken
      }
      sitems {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getShop = `query GetShop($id: ID!) {
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
    editors {
      items {
        id
        shopID
        editorID
      }
      nextToken
    }
    sitems {
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
      nextToken
    }
  }
}
`;
export const shopsByStatus = `query ShopsByStatus(
  $status: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelShopFilterInput
  $limit: Int
  $nextToken: String
) {
  shopsByStatus(
    status: $status
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
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
      editors {
        nextToken
      }
      sitems {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const shopBySlug = `query ShopBySlug(
  $slug: String
  $sortDirection: ModelSortDirection
  $filter: ModelShopFilterInput
  $limit: Int
  $nextToken: String
) {
  shopBySlug(
    slug: $slug
    sortDirection: $sortDirection
    filter: $filter
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
      editors {
        nextToken
      }
      sitems {
        nextToken
      }
    }
    nextToken
  }
}
`;
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
      editors {
        nextToken
      }
      sitems {
        nextToken
      }
    }
  }
}
`;
export const listShopItems = `query ListShopItems(
  $filter: ModelShopItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listShopItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    nextToken
  }
}
`;
export const shopItemsByAccess = `query ShopItemsByAccess(
  $access: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelShopItemFilterInput
  $limit: Int
  $nextToken: String
) {
  shopItemsByAccess(
    access: $access
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
    nextToken
  }
}
`;
export const shopItemByProdId = `query ShopItemByProdId(
  $productId: String
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelShopItemFilterInput
  $limit: Int
  $nextToken: String
) {
  shopItemByProdId(
    productId: $productId
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
    nextToken
  }
}
`;
