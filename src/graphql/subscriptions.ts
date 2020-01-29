// tslint:disable
// this is an auto generated file. This will be overwritten

export const onUpdateVisitorInquiry = `subscription OnUpdateVisitorInquiry {
  onUpdateVisitorInquiry {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const onDeleteVisitorInquiry = `subscription OnDeleteVisitorInquiry {
  onDeleteVisitorInquiry {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const onCreateSliderItem = `subscription OnCreateSliderItem {
  onCreateSliderItem {
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
export const onUpdateSliderItem = `subscription OnUpdateSliderItem {
  onUpdateSliderItem {
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
export const onDeleteSliderItem = `subscription OnDeleteSliderItem {
  onDeleteSliderItem {
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
export const onCreateProdSaved = `subscription OnCreateProdSaved($userId: String) {
  onCreateProdSaved(userId: $userId) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const onUpdateProdSaved = `subscription OnUpdateProdSaved($userId: String) {
  onUpdateProdSaved(userId: $userId) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const onDeleteProdSaved = `subscription OnDeleteProdSaved($userId: String) {
  onDeleteProdSaved(userId: $userId) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const onCreateEditor = `subscription OnCreateEditor($username: String) {
  onCreateEditor(username: $username) {
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
export const onDeleteEditor = `subscription OnDeleteEditor {
  onDeleteEditor {
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
export const onCreateQuoteBoard = `subscription OnCreateQuoteBoard($owner: String) {
  onCreateQuoteBoard(owner: $owner) {
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
export const onDeleteQuoteBoard = `subscription OnDeleteQuoteBoard($owner: String, $members: String) {
  onDeleteQuoteBoard(owner: $owner, members: $members) {
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
export const onDeleteQuoteItem = `subscription OnDeleteQuoteItem {
  onDeleteQuoteItem {
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
export const onCreateShop = `subscription OnCreateShop($owner: String, $shopadmins: String) {
  onCreateShop(owner: $owner, shopadmins: $shopadmins) {
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
export const onDeleteShop = `subscription OnDeleteShop($owner: String, $shopadmins: String) {
  onDeleteShop(owner: $owner, shopadmins: $shopadmins) {
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
export const onDeleteShopItem = `subscription OnDeleteShopItem {
  onDeleteShopItem {
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
export const onCreateCartItem = `subscription OnCreateCartItem($username: String) {
  onCreateCartItem(username: $username) {
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
export const onUpdateCartItem = `subscription OnUpdateCartItem($username: String) {
  onUpdateCartItem(username: $username) {
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
export const onDeleteCartItem = `subscription OnDeleteCartItem($username: String) {
  onDeleteCartItem(username: $username) {
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
export const onCreateOrder = `subscription OnCreateOrder($username: String) {
  onCreateOrder(username: $username) {
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
export const onUpdateOrder = `subscription OnUpdateOrder($username: String) {
  onUpdateOrder(username: $username) {
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
export const onDeleteOrder = `subscription OnDeleteOrder {
  onDeleteOrder {
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
export const onCreateOrderItem = `subscription OnCreateOrderItem($username: String) {
  onCreateOrderItem(username: $username) {
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
export const onUpdateOrderItem = `subscription OnUpdateOrderItem($username: String) {
  onUpdateOrderItem(username: $username) {
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
export const onDeleteOrderItem = `subscription OnDeleteOrderItem($username: String) {
  onDeleteOrderItem(username: $username) {
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
export const onCreateVisitorInquiry = `subscription OnCreateVisitorInquiry {
  onCreateVisitorInquiry {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const onUpdateEditor = `subscription OnUpdateEditor($username: String) {
  onUpdateEditor(username: $username) {
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
export const onUpdateQuoteBoard = `subscription OnUpdateQuoteBoard($owner: String, $members: String) {
  onUpdateQuoteBoard(owner: $owner, members: $members) {
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
export const onCreateQuoteBoardEditor = `subscription OnCreateQuoteBoardEditor($editorUsername: String) {
  onCreateQuoteBoardEditor(editorUsername: $editorUsername) {
    id
    qboardID
    editorID
    editor {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
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
export const onUpdateQuoteBoardEditor = `subscription OnUpdateQuoteBoardEditor($editorUsername: String) {
  onUpdateQuoteBoardEditor(editorUsername: $editorUsername) {
    id
    qboardID
    editorID
    editor {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
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
export const onDeleteQuoteBoardEditor = `subscription OnDeleteQuoteBoardEditor($editorUsername: String) {
  onDeleteQuoteBoardEditor(editorUsername: $editorUsername) {
    id
    qboardID
    editorID
    editor {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
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
export const onCreateQuoteItem = `subscription OnCreateQuoteItem {
  onCreateQuoteItem {
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
export const onUpdateQuoteItem = `subscription OnUpdateQuoteItem {
  onUpdateQuoteItem {
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
export const onUpdateShop = `subscription OnUpdateShop($owner: String, $shopadmins: String) {
  onUpdateShop(owner: $owner, shopadmins: $shopadmins) {
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
export const onCreateShopEditor = `subscription OnCreateShopEditor($editorUsername: String) {
  onCreateShopEditor(editorUsername: $editorUsername) {
    id
    shopID
    editorID
    editor {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
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
export const onUpdateShopEditor = `subscription OnUpdateShopEditor($editorUsername: String) {
  onUpdateShopEditor(editorUsername: $editorUsername) {
    id
    shopID
    editorID
    editor {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
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
export const onDeleteShopEditor = `subscription OnDeleteShopEditor($editorUsername: String) {
  onDeleteShopEditor(editorUsername: $editorUsername) {
    id
    shopID
    editorID
    editor {
      id
      username
      qboards {
        nextToken
      }
      shops {
        nextToken
      }
    }
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
export const onCreateShopItem = `subscription OnCreateShopItem {
  onCreateShopItem {
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
export const onUpdateShopItem = `subscription OnUpdateShopItem {
  onUpdateShopItem {
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
