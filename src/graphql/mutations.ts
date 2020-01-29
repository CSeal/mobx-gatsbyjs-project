// tslint:disable
// this is an auto generated file. This will be overwritten

export const updateVisitorInquiry = `mutation UpdateVisitorInquiry(
  $input: UpdateVisitorInquiryInput!
  $condition: ModelVisitorInquiryConditionInput
) {
  updateVisitorInquiry(input: $input, condition: $condition) {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const deleteVisitorInquiry = `mutation DeleteVisitorInquiry(
  $input: DeleteVisitorInquiryInput!
  $condition: ModelVisitorInquiryConditionInput
) {
  deleteVisitorInquiry(input: $input, condition: $condition) {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const createSliderItem = `mutation CreateSliderItem(
  $input: CreateSliderItemInput!
  $condition: ModelSliderItemConditionInput
) {
  createSliderItem(input: $input, condition: $condition) {
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
export const updateSliderItem = `mutation UpdateSliderItem(
  $input: UpdateSliderItemInput!
  $condition: ModelSliderItemConditionInput
) {
  updateSliderItem(input: $input, condition: $condition) {
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
export const deleteSliderItem = `mutation DeleteSliderItem(
  $input: DeleteSliderItemInput!
  $condition: ModelSliderItemConditionInput
) {
  deleteSliderItem(input: $input, condition: $condition) {
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
export const createProdSaved = `mutation CreateProdSaved(
  $input: CreateProdSavedInput!
  $condition: ModelProdSavedConditionInput
) {
  createProdSaved(input: $input, condition: $condition) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const updateProdSaved = `mutation UpdateProdSaved(
  $input: UpdateProdSavedInput!
  $condition: ModelProdSavedConditionInput
) {
  updateProdSaved(input: $input, condition: $condition) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const deleteProdSaved = `mutation DeleteProdSaved(
  $input: DeleteProdSavedInput!
  $condition: ModelProdSavedConditionInput
) {
  deleteProdSaved(input: $input, condition: $condition) {
    id
    userId
    productId
    updatedAt
  }
}
`;
export const createEditor = `mutation CreateEditor(
  $input: CreateEditorInput!
  $condition: ModelEditorConditionInput
) {
  createEditor(input: $input, condition: $condition) {
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
export const deleteEditor = `mutation DeleteEditor(
  $input: DeleteEditorInput!
  $condition: ModelEditorConditionInput
) {
  deleteEditor(input: $input, condition: $condition) {
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
export const createQuoteBoard = `mutation CreateQuoteBoard(
  $input: CreateQuoteBoardInput!
  $condition: ModelQuoteBoardConditionInput
) {
  createQuoteBoard(input: $input, condition: $condition) {
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
export const deleteQuoteBoard = `mutation DeleteQuoteBoard(
  $input: DeleteQuoteBoardInput!
  $condition: ModelQuoteBoardConditionInput
) {
  deleteQuoteBoard(input: $input, condition: $condition) {
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
export const deleteQuoteItem = `mutation DeleteQuoteItem(
  $input: DeleteQuoteItemInput!
  $condition: ModelQuoteItemConditionInput
) {
  deleteQuoteItem(input: $input, condition: $condition) {
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
export const createShop = `mutation CreateShop(
  $input: CreateShopInput!
  $condition: ModelShopConditionInput
) {
  createShop(input: $input, condition: $condition) {
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
export const deleteShop = `mutation DeleteShop(
  $input: DeleteShopInput!
  $condition: ModelShopConditionInput
) {
  deleteShop(input: $input, condition: $condition) {
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
export const deleteShopItem = `mutation DeleteShopItem(
  $input: DeleteShopItemInput!
  $condition: ModelShopItemConditionInput
) {
  deleteShopItem(input: $input, condition: $condition) {
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
export const createCartItem = `mutation CreateCartItem(
  $input: CreateCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  createCartItem(input: $input, condition: $condition) {
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
export const updateCartItem = `mutation UpdateCartItem(
  $input: UpdateCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  updateCartItem(input: $input, condition: $condition) {
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
export const deleteCartItem = `mutation DeleteCartItem(
  $input: DeleteCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  deleteCartItem(input: $input, condition: $condition) {
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
export const updateOrder = `mutation UpdateOrder(
  $input: UpdateOrderInput!
  $condition: ModelOrderConditionInput
) {
  updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = `mutation DeleteOrder(
  $input: DeleteOrderInput!
  $condition: ModelOrderConditionInput
) {
  deleteOrder(input: $input, condition: $condition) {
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
export const createOrderItem = `mutation CreateOrderItem(
  $input: CreateOrderItemInput!
  $condition: ModelOrderItemConditionInput
) {
  createOrderItem(input: $input, condition: $condition) {
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
export const updateOrderItem = `mutation UpdateOrderItem(
  $input: UpdateOrderItemInput!
  $condition: ModelOrderItemConditionInput
) {
  updateOrderItem(input: $input, condition: $condition) {
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
export const deleteOrderItem = `mutation DeleteOrderItem(
  $input: DeleteOrderItemInput!
  $condition: ModelOrderItemConditionInput
) {
  deleteOrderItem(input: $input, condition: $condition) {
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
export const createVisitorInquiry = `mutation CreateVisitorInquiry(
  $input: CreateVisitorInquiryInput!
  $condition: ModelVisitorInquiryConditionInput
) {
  createVisitorInquiry(input: $input, condition: $condition) {
    id
    sender
    subject
    message
    sendsns
    createdAt
  }
}
`;
export const updateEditor = `mutation UpdateEditor(
  $input: UpdateEditorInput!
  $condition: ModelEditorConditionInput
) {
  updateEditor(input: $input, condition: $condition) {
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
export const updateQuoteBoard = `mutation UpdateQuoteBoard(
  $input: UpdateQuoteBoardInput!
  $condition: ModelQuoteBoardConditionInput
) {
  updateQuoteBoard(input: $input, condition: $condition) {
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
export const createQuoteBoardEditor = `mutation CreateQuoteBoardEditor(
  $input: CreateQuoteBoardEditorInput!
  $condition: ModelQuoteBoardEditorConditionInput
) {
  createQuoteBoardEditor(input: $input, condition: $condition) {
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
export const updateQuoteBoardEditor = `mutation UpdateQuoteBoardEditor(
  $input: UpdateQuoteBoardEditorInput!
  $condition: ModelQuoteBoardEditorConditionInput
) {
  updateQuoteBoardEditor(input: $input, condition: $condition) {
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
export const deleteQuoteBoardEditor = `mutation DeleteQuoteBoardEditor(
  $input: DeleteQuoteBoardEditorInput!
  $condition: ModelQuoteBoardEditorConditionInput
) {
  deleteQuoteBoardEditor(input: $input, condition: $condition) {
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
export const createQuoteItem = `mutation CreateQuoteItem(
  $input: CreateQuoteItemInput!
  $condition: ModelQuoteItemConditionInput
) {
  createQuoteItem(input: $input, condition: $condition) {
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
export const updateQuoteItem = `mutation UpdateQuoteItem(
  $input: UpdateQuoteItemInput!
  $condition: ModelQuoteItemConditionInput
) {
  updateQuoteItem(input: $input, condition: $condition) {
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
export const updateShop = `mutation UpdateShop(
  $input: UpdateShopInput!
  $condition: ModelShopConditionInput
) {
  updateShop(input: $input, condition: $condition) {
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
export const createShopEditor = `mutation CreateShopEditor(
  $input: CreateShopEditorInput!
  $condition: ModelShopEditorConditionInput
) {
  createShopEditor(input: $input, condition: $condition) {
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
export const updateShopEditor = `mutation UpdateShopEditor(
  $input: UpdateShopEditorInput!
  $condition: ModelShopEditorConditionInput
) {
  updateShopEditor(input: $input, condition: $condition) {
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
export const deleteShopEditor = `mutation DeleteShopEditor(
  $input: DeleteShopEditorInput!
  $condition: ModelShopEditorConditionInput
) {
  deleteShopEditor(input: $input, condition: $condition) {
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
export const createShopItem = `mutation CreateShopItem(
  $input: CreateShopItemInput!
  $condition: ModelShopItemConditionInput
) {
  createShopItem(input: $input, condition: $condition) {
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
export const updateShopItem = `mutation UpdateShopItem(
  $input: UpdateShopItemInput!
  $condition: ModelShopItemConditionInput
) {
  updateShopItem(input: $input, condition: $condition) {
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
