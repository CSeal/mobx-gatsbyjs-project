module.exports = {
  getQuoteBoardUsers: `query GetQuoteBoard($id: ID!) {
    getQuoteBoard(id: $id) {
      id
      owner
      members
      invites
    }
  }
  `,
  
  getQuoteBoardWithAllItems: `query GetQuoteBoard($id: ID!) {
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
      qitems(limit:9999) {
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
  `,
  
  updateQuoteBoardUsers: `mutation UpdateQuoteBoard($input: UpdateQuoteBoardInput!) {
    updateQuoteBoard(input: $input) {
      id
      members
      invites
    }
  }
  `,

  updateQuoteBoardStatus: `mutation UpdateQuoteBoard($input: UpdateQuoteBoardInput!) {
    updateQuoteBoard(input: $input) {
      id
      pendingquotes
    }
  }
  `,
  
  deleteQuoteBoardEditor: `mutation DeleteQuoteBoardEditor($input: DeleteQuoteBoardEditorInput!) {
    deleteQuoteBoardEditor(input: $input) {
      id
      qboardID
      editorID
    }
  }
  `,

  createQuoteItemPending: `mutation CreateQuoteItem($input: CreateQuoteItemInput!) {
    createQuoteItem(input: $input) {
      id
      productId
      productName
      productDescription
      productImage
      productImagesMore
      productCategory
      quantity
      pricecents
      usernotes
      board {
        id
      }
    }
  }
  `,

  getQuoteItemsBoardUsers: `query GetQuoteItem($id: ID!) {
    getQuoteItem(id: $id) {
      id
      board {
        id
        owner
        members
      }
    }
  }
  `,

  updateQuoteItemsDeck: `mutation UpdateQuoteItem($input: UpdateQuoteItemInput!) {
    updateQuoteItem(input: $input) {
      id
      board {
        id
        owner
        members
      }
    }
  }
  `,

  shopBySlug: `query ShopBySlug($slug: String) {
    shopBySlug(slug: $slug) {
      items {
        id
        slug
      }
    }
  }
  `,

  getShopUsers: `query GetShop($id: ID!) {
    getShop(id: $id) {
      id
      owner
      shopadmins
      members
      invites
    }
  }
  `,

  updateShopUsers: `mutation UpdateShop($input: UpdateShopInput!) {
    updateShop(input: $input) {
      id
      shopadmins
      members
      invites
    }
  }
  `,

  deleteShopEditor: `mutation DeleteShopEditor($input: DeleteShopEditorInput!) {
    deleteShopEditor(input: $input) {
      id
      shopID
      editorID
    }
  }
  `,

  createShopItem: `mutation CreateShopItem($input: CreateShopItemInput!) {
    createShopItem(input: $input) {
      id
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
      }
    }
  }
  `,

  getShopItemsShopUsers: `query GetShopItem($id: ID!) {
    getShopItem(id: $id) {
      id
      access
      productName
      shop {
        id
        owner
        shopadmins
        members
      }
    }
  }
  `,

  updateShopItemsShop: `mutation UpdateShopItem($input: UpdateShopItemInput!) {
    updateShopItem(input: $input) {
      id
      shop {
        id
      }
    }
  }
  `,

  updateShopItemsAccess: `mutation UpdateShopItem($input: UpdateShopItemInput!) {
    updateShopItem(input: $input) {
      id
      access
    }
  }
  `,
}