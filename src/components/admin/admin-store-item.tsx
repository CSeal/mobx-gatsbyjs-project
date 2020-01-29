import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import styled from 'styled-components'
import Headroom from 'react-headroom'
import {
  Loader,
  Segment,
  Button,
  Header,
  List,
  Icon,
  Table,
  Input,
  TextArea,
  Form,
  Message,
  Popup,
  Confirm,
  Image,
  Dimmer,
} from 'semantic-ui-react'
import { getQuoteItem, editQuoteItem, getShopItem, editShopItem, IStoreItem } from '../../utils/graphql'
import { quoteCardImgUrlCreater } from '../../utils/urls'
import { QuoteItemAttributeType } from '../../types'
import { ImagePicker, AlbumPicker, TFile, TRenderFucnForUploadButton } from '../../elements/file-management'

// private file upload management: identity id (NOT user sub) in the path:
// https://aws-amplify.github.io/docs/js/storage#file-access-levels
////Storage.configure({ level: 'private' })
//// keeping public-default for now while users (non-admin) are not allowed to put objects to S3

const imageFix1 = (_allMatches: string, fix1: string) => {
  const numberIndex = Number(fix1)
  return `image-${numberIndex > 1 ? 1 : numberIndex + 1}`
}

interface IProps {
  itemId: string
  itemType: 'deck' | 'shop'
}

type TItemCanUpdate = {
  [key: string]: string
}

type TQattr = {
  productImage: string
  productImagesMore: (string | null)[]
  psize: (string | null)[]
  pcolor: (string | null)[]
  pmaterial: (string | null)[]
  pshape: (string | null)[]
  pimprint: (string | null)[]
  pricecents: number | null
  productName: string | null
  productDescription: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type TQItemAttrSerialize = TQattr | null

type TItemUpdating = {
  [key: string]: boolean
}

type TStoregeRespones = {
  key: string
}

type TGetAttrArrayValidationRule = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: (value: any, index: number | undefined) => boolean
  msg: string
  fieldsName: string[]
}

type TItemPlaceholder = {
  itemKey: string
  itemValue: string
}

interface IPricecentsProps {
  allAttrs: TQattr
  fieldNameForUpdate: string
  placeholder: string
  setItemCanUpdate: React.Dispatch<React.SetStateAction<TItemCanUpdate>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpdate: (key: string | React.SyntheticEvent, value: any) => Promise<void>
  headerTitle: string
  itemCanUpdate: TItemCanUpdate
  contentAlign?: 'left' | 'right' | 'center'
  fieldUpdate: React.Dispatch<React.SetStateAction<TQattr>>
}

interface INameProps {
  allAttrs: TQattr
  fieldNameForUpdate: string
  placeholder: string
  setItemCanUpdate: React.Dispatch<React.SetStateAction<TItemCanUpdate>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpdate: (key: string | React.SyntheticEvent, value: any) => Promise<void>
  headerTitle: string
  itemCanUpdate: TItemCanUpdate
  contentAlign?: 'left' | 'right' | 'center'
  fieldUpdate: React.Dispatch<React.SetStateAction<TQattr>>
}

interface IDescriptionProps {
  allAttrs: TQattr
  fieldNameForUpdate: string
  placeholder: string
  setItemCanUpdate: React.Dispatch<React.SetStateAction<TItemCanUpdate>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpdate: (key: string | React.SyntheticEvent, value: any) => Promise<void>
  headerTitle: string
  itemCanUpdate: TItemCanUpdate
  contentAlign?: 'left' | 'right' | 'center'
  fieldUpdate: React.Dispatch<React.SetStateAction<TQattr>>
}

interface IProductAttributeTableProps {
  allAttrs: TQattr
  fieldNameForUpdate: string
  setItemCanUpdate: React.Dispatch<React.SetStateAction<TItemCanUpdate>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpdate: (key: string | React.SyntheticEvent, value: any) => Promise<void>
  headerTitle: string
  itemCanUpdate: TItemCanUpdate
  fieldUpdate: (
    attrItemKeyName: string,
    allAttrs: TQattr
  ) => (
    rowValues: TItemKeyValue,
    index: number | undefined,
    deleteAction: boolean | undefined,
    attrCanUpdateTitle: string
  ) => void
  validationRules: TGetAttrArrayValidationRule[]
  itemPlaceholder: TItemPlaceholder
}

type TItemKeyValue = {
  [key: string]: string
}

interface ITableRowProps {
  item?: string
  index?: number
  validationRules: TGetAttrArrayValidationRule[]
  fieldUpdateHandler: (
    rowValues: TItemKeyValue,
    index: number | undefined,
    deleteAction: boolean | undefined,
    attrCanUpdateTitle: string
  ) => void
  itemPlaceholder: TItemPlaceholder
  attrCanUpdateTitle: string
  editRowsId?: (string | null | undefined)[]
  setEditRowsId?: React.Dispatch<React.SetStateAction<(string | null | undefined)[]>>
  id?: string
}

type TTableRowErrors = {
  [key: string]: (string | null)[]
}

const AdminStoreItem = ({ itemId, itemType }: IProps) => {
  const qItemAttrSerialize = (qitem: TQItemAttrSerialize): TQattr => ({
    productImage: qitem !== null ? qitem.productImage : '',
    productImagesMore: qitem !== null && Array.isArray(qitem.productImagesMore) ? qitem.productImagesMore : [],
    psize: qitem !== null && Array.isArray(qitem.psize) ? qitem.psize : [],
    pcolor: qitem !== null && Array.isArray(qitem.pcolor) ? qitem.pcolor : [],
    pmaterial: qitem !== null && Array.isArray(qitem.pmaterial) ? qitem.pmaterial : [],
    pshape: qitem !== null && Array.isArray(qitem.pshape) ? qitem.pshape : [],
    pimprint: qitem !== null && Array.isArray(qitem.pimprint) ? qitem.pimprint : [],
    pricecents: qitem !== null ? qitem.pricecents : 0,
    productName: qitem !== null ? qitem.productName : '',
    productDescription: qitem !== null ? qitem.productDescription : '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [qitem, setQitem] = useState<null | IStoreItem>(null)
  const [qattr, setQattr] = useState<TQattr>(qItemAttrSerialize(null))
  const [mainImageLoading, setMainImageLoading] = useState(false)
  const [itemCanUpdate, setItemCanUpdate] = useState<TItemCanUpdate>({})
  const [itemUpdating, setItemUpdating] = useState<TItemUpdating>({})

  const queryStoreItem = async () => {
    setLoading(true)
    try {
      switch (itemType) {
        case 'deck': {
          const resp = await API.graphql(graphqlOperation(getQuoteItem, { id: itemId }))
          if (resp.data && resp.data.getQuoteItem && resp.data.getQuoteItem.id === itemId) {
            setQitem(resp.data.getQuoteItem)
            setQattr(qItemAttrSerialize(resp.data.getQuoteItem))
          } else {
            setError('Quote item not found: please check the URL')
          }
          break
        }
        case 'shop': {
          const resp = await API.graphql(graphqlOperation(getShopItem, { id: itemId }))
          if (resp.data && resp.data.getShopItem && resp.data.getShopItem.id === itemId) {
            setQitem(resp.data.getShopItem)
            setQattr(qItemAttrSerialize(resp.data.getShopItem))
          } else {
            setError('Shop item not found: please check the URL')
          }
          break
        }
        default:
          console.log('Could not identify the type of store item provided.')
      }
    } catch (err) {
      console.log('error: ', err)
      setError('Quote item info query failed.')
    }
    setLoading(false)
  }

  useEffect(() => {
    queryStoreItem()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = async (key: string | React.SyntheticEvent, value: any): Promise<void> => {
    setItemUpdating(prevState => {
      if (typeof key !== 'string') {
        setLoading(true)
        return prevState
      }
      return {
        ...prevState,
        [key]: true,
      }
    })
    try {
      const updateItem = typeof key !== 'string' ? { id: itemId, ...qattr } : { id: itemId, [key]: value }
      if (itemType === 'deck') {
        await API.graphql(graphqlOperation(editQuoteItem, { input: updateItem }))
      }
      if (itemType === 'shop') {
        await API.graphql(graphqlOperation(editShopItem, { input: updateItem }))
      }
      if (typeof key !== 'string') {
        setItemCanUpdate({})
      }
    } catch (err) {
      console.error(err.message)
      setError('Failed to update product attributes.')
    } finally {
      setItemUpdating(prevState => {
        if (typeof key !== 'string') {
          setLoading(false)
          return prevState
        }
        return {
          ...prevState,
          [key]: false,
        }
      })
    }
  }

  const handleUpload = async (file: TFile): Promise<void> => {
    if (file && qitem && qitem.productId) {
      const extension = file.name.slice(file.name.lastIndexOf('.') + 1)
      try {
        if (extension === '') {
          throw new Error('Problems with the file')
        }
        const { type: mimeType } = file
        const checkKeyPattern = /image-(\d+)/i
        const removePublicPattern = /^(public\/)*/i
        const key: string = checkKeyPattern.test(qattr.productImage)
          ? qattr.productImage.replace(checkKeyPattern, imageFix1)
          : `products/${qitem.productId}/${itemId}image-1.${extension}`
        if (qattr.productImage !== '') {
          await Storage.remove(qattr.productImage.replace(removePublicPattern, ''))
        }
        const resp: TStoregeRespones = await Storage.put(key.replace(removePublicPattern, ''), file, {
          contentType: mimeType,
        })
        qattr.productImage = `public/${resp.key}`
        await handleUpdate('productImage', qattr.productImage)
        setQattr({ ...qattr })
      } catch (err) {
        console.log('error: ', err)
        setError('Failed to update main image.')
      }
    }
  }

  const handleMultipleUpload = async (files: TFile[]): Promise<void | undefined> => {
    if (!qitem || !qitem.productId) {
      return
    }
    setItemUpdating(prevState => ({ ...prevState, productImagesMore: true }))
    const imagesKey: Array<string | null> = [...qattr.productImagesMore]

    try {
      for (let i = 0; i < files.length; i += 1) {
        const extension: string = files[i].name.slice(files[i].name.lastIndexOf('.') + 1)
        if (extension === '') {
          throw new Error('Problems with the file')
        }
        const { type: mimeType } = files[i]
        const number: number = Date.now()
        const key = `products/${qitem.productId}/${itemId}/${number}.${extension}`
        // eslint-disable-next-line no-await-in-loop
        const resp: TStoregeRespones = await Storage.put(key, files[i], { contentType: mimeType })
        imagesKey.push(`public/${resp.key}`)
        qattr.productImagesMore = imagesKey
      }
    } catch (err) {
      console.log(err)
      setError('Failed to update images.')
    }

    try {
      await handleUpdate('productImagesMore', qattr.productImagesMore)
      setQattr({ ...qattr })
    } catch (err) {
      console.log(err)
      setError('Failed to update images.')
    }
  }

  const deleteSelectedMoreImages = async (deleteSelected: string[]): Promise<void> => {
    const removePictures: string[] = []
    setItemUpdating(prevState => ({ ...prevState, productImagesMore: true }))
    try {
      for (let i = 0; i < deleteSelected.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Storage.remove(deleteSelected[i].replace(/^public\//, ''))
        removePictures.push(deleteSelected[i])
      }
    } catch (err) {
      console.log(err)
      setError('Failed to delete images.')
    } finally {
      qattr.productImagesMore = qattr.productImagesMore.filter((moreImageUrl: string | null): boolean => {
        const index = removePictures.findIndex((id: string): boolean => id === moreImageUrl)
        if (index === -1) {
          return true
        }
        removePictures.splice(index, 1)
        return false
      })
    }
    try {
      await handleUpdate('productImagesMore', qattr.productImagesMore)
      setQattr({ ...qattr })
    } catch (err) {
      console.log(err)
      setError('Failed to delete images.')
    }
  }

  const loadingStatusForComponent = (
    component: JSX.Element,
    loadingcomp: boolean,
    loadingContent = 'loading'
  ): JSX.Element => (
    <Segment style={{ textAlign: 'center' }}>
      <Dimmer active={loadingcomp} disabled={!loadingcomp}>
        <Loader content={loadingContent} />
      </Dimmer>
      {component}
    </Segment>
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldUpdate = (attrItemKeyName: string, allAttrs: any): any => (
    rowValues: TItemKeyValue,
    index: number | undefined,
    deleteAction: boolean | undefined,
    attrCanUpdateTitle: string
  ): void => {
    const valueForUpdate: string = Object.values(rowValues).join('$')
    const currentAttrValue: Array<string | null> = allAttrs[attrItemKeyName]
    if (
      (index !== undefined && valueForUpdate !== currentAttrValue[index]) ||
      index === undefined ||
      (index !== undefined && deleteAction)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQattr((prevState: any): any => {
        if (index === undefined) {
          currentAttrValue.push(Object.values(rowValues).join('$'))
        } else if (deleteAction) {
          currentAttrValue.splice(index, 1)
        } else {
          currentAttrValue[index] = Object.values(rowValues).join('$')
        }
        return {
          ...prevState,
          [attrItemKeyName]: currentAttrValue,
        }
      })
      setItemCanUpdate(prevState => ({
        ...prevState,
        [attrItemKeyName]: attrCanUpdateTitle,
      }))
    }
  }

  const renderButtonFuncForImgUpload: TRenderFucnForUploadButton = (file, clearPreviewFunc) => (
    <Button
      onClick={async () => {
        try {
          setMainImageLoading(true)
          await handleUpload(file)
          if (typeof clearPreviewFunc === 'function') {
            clearPreviewFunc()
          }
        } catch (err) {
          console.log(err.message)
        } finally {
          setMainImageLoading(false)
        }
      }}
      content="Update main image"
      color="green"
      style={{
        dispaly: 'block',
      }}
      size="medium"
    />
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAttrArray = (attrItems: any, attrType: number) => {
    const numberPattern = /^\d+(\.\d+)?$/
    const validationRules: TGetAttrArrayValidationRule[] = [
      {
        func: value => value !== '',
        msg: 'Field is required',
        fieldsName: ['itemKey', 'itemValue'],
      },
      {
        func: value => value.indexOf('$') === -1,
        msg: 'Do not include $ character',
        fieldsName: ['itemKey', 'itemValue'],
      },
      {
        func: value => numberPattern.test(value) && Number.parseInt(value, 10) >= 0,
        msg: 'must be a non-negative number (integer)',
        fieldsName: ['itemValue'],
      },
    ]
    switch (attrType) {
      case QuoteItemAttributeType.propductSize: {
        const attrFieldName = 'Product Size'
        const itemPlaceholder: TItemPlaceholder = {
          itemKey: 'XL, L, S, etc.',
          itemValue: '0, 10, 12, etc.',
        }
        const attrItemKeyName = 'psize'
        const uniqRule: TGetAttrArrayValidationRule = {
          func: (value, index) =>
            attrItems[attrItemKeyName].findIndex((item: string, i: number): boolean =>
              index === i ? false : item.slice(0, item.indexOf('$')) === value
            ) === -1,
          msg: 'value must be unique',
          fieldsName: ['itemKey'],
        }
        validationRules.push(uniqRule)
        return loadingStatusForComponent(
          <ProductAttributeTable
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            validationRules={validationRules}
            itemPlaceholder={itemPlaceholder}
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            fieldUpdate={fieldUpdate}
            itemCanUpdate={itemCanUpdate}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.productColor: {
        const attrFieldName = 'Product Color'
        const itemPlaceholder: TItemPlaceholder = {
          itemKey: 'Black, Blue, Red, etc.',
          itemValue: '0, 10, 12, etc.',
        }
        const attrItemKeyName = 'pcolor'
        const uniqRule: TGetAttrArrayValidationRule = {
          func: (value, index) =>
            attrItems[attrItemKeyName].findIndex((item: string, i: number): boolean =>
              index === i ? false : item.slice(0, item.indexOf('$')) === value
            ) === -1,
          msg: 'value must be unique',
          fieldsName: ['itemKey'],
        }
        validationRules.push(uniqRule)
        return loadingStatusForComponent(
          <ProductAttributeTable
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            validationRules={validationRules}
            itemPlaceholder={itemPlaceholder}
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            fieldUpdate={fieldUpdate}
            itemCanUpdate={itemCanUpdate}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.productMaterial: {
        const attrFieldName = 'Product Material'
        const itemPlaceholder: TItemPlaceholder = {
          itemKey: 'Wool, Leather, Plastic, etc.',
          itemValue: '0, 10, 12, etc.',
        }
        const attrItemKeyName = 'pmaterial'
        const uniqRule: TGetAttrArrayValidationRule = {
          func: (value, index) =>
            attrItems[attrItemKeyName].findIndex((item: string, i: number): boolean =>
              index === i ? false : item.slice(0, item.indexOf('$')) === value
            ) === -1,
          msg: 'value must be unique',
          fieldsName: ['itemKey'],
        }
        validationRules.push(uniqRule)
        return loadingStatusForComponent(
          <ProductAttributeTable
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            validationRules={validationRules}
            itemPlaceholder={itemPlaceholder}
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            fieldUpdate={fieldUpdate}
            itemCanUpdate={itemCanUpdate}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.productImprint: {
        const attrFieldName = 'Product Imprint'
        const itemPlaceholder: TItemPlaceholder = {
          itemKey: 'Screen print 3-color, etc.',
          itemValue: '0, 10, 12, etc.',
        }
        const attrItemKeyName = 'pimprint'
        const uniqRule: TGetAttrArrayValidationRule = {
          func: (value, index) =>
            attrItems[attrItemKeyName].findIndex((item: string, i: number): boolean =>
              index === i ? false : item.slice(0, item.indexOf('$')) === value
            ) === -1,
          msg: 'value must be unique',
          fieldsName: ['itemKey'],
        }
        validationRules.push(uniqRule)
        return loadingStatusForComponent(
          <ProductAttributeTable
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            validationRules={validationRules}
            itemPlaceholder={itemPlaceholder}
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            fieldUpdate={fieldUpdate}
            itemCanUpdate={itemCanUpdate}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.productShape: {
        const attrFieldName = 'Product Shape'
        const itemPlaceholder: TItemPlaceholder = {
          itemKey: 'Cubic box, etc.',
          itemValue: '0, 10, 12, etc.',
        }
        const attrItemKeyName = 'pshape'
        const uniqRule: TGetAttrArrayValidationRule = {
          func: (value, index) =>
            attrItems[attrItemKeyName].findIndex((item: string, i: number): boolean =>
              index === i ? false : item.slice(0, item.indexOf('$')) === value
            ) === -1,
          msg: 'value must be unique',
          fieldsName: ['itemKey'],
        }
        validationRules.push(uniqRule)
        return loadingStatusForComponent(
          <ProductAttributeTable
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            validationRules={validationRules}
            itemPlaceholder={itemPlaceholder}
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            fieldUpdate={fieldUpdate}
            itemCanUpdate={itemCanUpdate}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.pricecents: {
        const attrFieldName = 'Price Cents'
        const attrItemKeyName = 'pricecents'
        return loadingStatusForComponent(
          <Pricecents
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            placeholder="0"
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            itemCanUpdate={itemCanUpdate}
            fieldUpdate={setQattr}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.productName: {
        const attrFieldName = 'Product Name'
        const attrItemKeyName = 'productName'
        return loadingStatusForComponent(
          <Name
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            placeholder="0"
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            itemCanUpdate={itemCanUpdate}
            fieldUpdate={setQattr}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      case QuoteItemAttributeType.productDescription: {
        const attrFieldName = 'Product Description'
        const attrItemKeyName = 'productDescription'
        return loadingStatusForComponent(
          <Description
            allAttrs={attrItems}
            headerTitle={attrFieldName}
            fieldNameForUpdate={attrItemKeyName}
            placeholder="0"
            setItemCanUpdate={setItemCanUpdate}
            handleUpdate={handleUpdate}
            itemCanUpdate={itemCanUpdate}
            fieldUpdate={setQattr}
          />,
          Boolean(itemUpdating[attrItemKeyName]),
          `${attrFieldName} is updating`
        )
      }
      default:
        return null
    }
  }
  const updateItemTitle: (string | undefined)[] = Object.values(itemCanUpdate).filter(
    (updateItem: string | undefined): boolean => updateItem !== undefined
  )
  const updateItemsCount: number = updateItemTitle.length
  const itemUpdatingNow: boolean = Object.values(itemUpdating).some(attrUpdating => attrUpdating)
  const isBulkUpdateButtonDisabled: boolean = updateItemsCount === 0 || itemUpdatingNow

  return (
    <Segment>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          {error !== null && error !== '' ? (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ paddingBottom: '10px' }}>
                <Button
                  onClick={handleUpdate}
                  content="Update item"
                  color="green"
                  disabled={isBulkUpdateButtonDisabled}
                  size="large"
                  style={{ display: 'inline' }}
                />
              </div>
              {updateItemsCount !== 0 && (
                <CanUpdateMessegeBlock
                  disableInlineStyles
                  pinStart={280}
                  itemscount={updateItemsCount}
                  headerheight={40}
                  itemheight={25}
                >
                  <Message warning>
                    <Message.Header>Pending attributes</Message.Header>
                    <Message.List>
                      {updateItemTitle.map(
                        (attrName: string | undefined): JSX.Element => (
                          <Message.Item key={attrName}>{attrName}</Message.Item>
                        )
                      )}
                    </Message.List>
                  </Message>
                </CanUpdateMessegeBlock>
              )}
            </div>
          )}
          {qitem && (
            <>
              {itemType === 'deck' && qitem.board && qitem.board.id && (
                <>
                  <Header as="h3" dividing>
                    Quote deck
                  </Header>
                  <List>
                    <List.Item>
                      <List.Icon name="linkify" />
                      <List.Content>
                        <Link to={`/app/decks/${qitem.board.id}`}>{qitem.board.name || ''}</Link>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="paperclip" />
                      <List.Content>{qitem.board.description || ''}</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="clipboard outline" />
                      <List.Content>{qitem.board.imprintdesign || ''}</List.Content>
                    </List.Item>
                  </List>
                </>
              )}
              {itemType === 'shop' && qitem.shop && qitem.shop.id && (
                <>
                  <Header as="h3" dividing>
                    Shop
                  </Header>
                  <List>
                    <List.Item>
                      <List.Icon name="linkify" />
                      <List.Content>
                        <Link to={`/app/shops/${qitem.shop.id}`}>{qitem.shop.seotitle || ''}</Link>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="users" />
                      <List.Content>{qitem.shop.status.toUpperCase()}</List.Content>
                    </List.Item>
                    {qitem.shop.status === 'live' && (
                      <List.Item>
                        <List.Icon name="users" />
                        <List.Icon name="linkify" />
                        <List.Content>
                          <Link to={`/${qitem.shop.slug}`}>{`/${qitem.shop.slug}`}</Link>
                        </List.Content>
                      </List.Item>
                    )}
                  </List>
                </>
              )}
              <Header as="h3" dividing>
                Product settings
              </Header>
              <List>
                <List.Item>
                  <Icon name="linkify" />
                  <List.Content>
                    <List.Header>
                      <Link to={`/app/admin/streamitem/${qitem.productId}`}>Original stream product</Link>
                    </List.Header>
                    <List.Description>Supplier info, other quotes etc.</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="comment" />
                  <List.Content>
                    <List.Header>User notes</List.Header>
                    <List.Description>{qitem.usernotes || ''}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="hand point right" />
                  <List.Content>
                    <List.Header>Quantity</List.Header>
                    <List.Description>{qitem.quantity || ''}</List.Description>
                  </List.Content>
                </List.Item>
              </List>

              <Header as="h4">Price (cents per item)</Header>
              {getAttrArray(qattr, QuoteItemAttributeType.pricecents)}
              <Header as="h4">Product Name</Header>
              {getAttrArray(qattr, QuoteItemAttributeType.productName)}
              <Header as="h4">Product Description</Header>
              {getAttrArray(qattr, QuoteItemAttributeType.productDescription)}

              <Header as="h4">Product attributes</Header>
              {getAttrArray(qattr, QuoteItemAttributeType.propductSize)}
              {getAttrArray(qattr, QuoteItemAttributeType.productColor)}
              {getAttrArray(qattr, QuoteItemAttributeType.productMaterial)}
              {getAttrArray(qattr, QuoteItemAttributeType.productShape)}
              {getAttrArray(qattr, QuoteItemAttributeType.productImprint)}
              <Header as="h4">Main image</Header>
              {loadingStatusForComponent(
                <>
                  {qattr.productImage !== '' && (
                    <Image
                      src={quoteCardImgUrlCreater(qattr.productImage, 'large')}
                      size="large"
                      style={{ display: 'inline' }}
                    />
                  )}
                  <ImagePicker renderFucnForUploadButton={renderButtonFuncForImgUpload} />
                </>,
                mainImageLoading,
                'Main Image is updating'
              )}
              <Header as="h4">Additional images</Header>
              {loadingStatusForComponent(
                <AlbumPicker
                  imagesKey={qattr.productImagesMore}
                  handleMultipleUpload={handleMultipleUpload}
                  deleteSelected={deleteSelectedMoreImages}
                  imageUrlCreater={quoteCardImgUrlCreater}
                  countColumnsInAlbum={3}
                />,
                Boolean(itemUpdating.productImagesMore),
                'Updating...'
              )}
            </>
          )}
        </>
      )}
    </Segment>
  )
}

export default AdminStoreItem

const Pricecents = ({
  allAttrs,
  fieldNameForUpdate,
  placeholder,
  setItemCanUpdate,
  handleUpdate,
  headerTitle,
  itemCanUpdate,
  contentAlign,
  fieldUpdate,
}: IPricecentsProps): JSX.Element => {
  const pricecentsValue: number = allAttrs[fieldNameForUpdate]
  const [inputValue, setInputValue] = useState<number>(pricecentsValue)
  const [editMode, setEditMode] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (_event: React.SyntheticEvent, { value }: any): void => {
    setInputValue(value)
  }
  useEffect((): void => {
    if (pricecentsValue !== inputValue) {
      setInputValue(pricecentsValue)
    }
  }, [pricecentsValue])

  const clearHandler = (): void => {
    setInputValue(pricecentsValue)
  }

  const updateHandler = (): void => {
    handleUpdate(fieldNameForUpdate, inputValue)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItemCanUpdate((prevState: any): any => {
      delete prevState[fieldNameForUpdate]
      return { ...prevState }
    })
  }
  return (
    <div style={{ textAlign: contentAlign || 'left' }}>
      {!editMode ? (
        <>
          <p style={{ padding: '10px', border: '1px solid #d8d8d8' }}>{pricecentsValue}</p>
          <Button
            color="black"
            content="Edit"
            icon="edit outline"
            size="medium"
            onClick={(): void => {
              setEditMode(true)
            }}
          />
          {itemCanUpdate[fieldNameForUpdate] && (
            <Button color="green" content="Update" size="medium" onClick={updateHandler} />
          )}
        </>
      ) : (
        <>
          <Button content="Undo" color="grey" icon="erase" size="medium" onClick={clearHandler} />
          <div style={{ marginBottom: '10px' }} />
          <Input type="number" min={0} placeholder={placeholder} value={inputValue} onChange={inputChangeHandler} />
          <div style={{ marginTop: '10px' }} />
          <Button
            content="Save"
            color="orange"
            size="medium"
            icon="save outline"
            onClick={(): void => {
              setEditMode(false)
              if (inputValue !== pricecentsValue) {
                setItemCanUpdate(prevState =>
                  prevState[fieldNameForUpdate] ? prevState : { ...prevState, [fieldNameForUpdate]: headerTitle }
                )
              }
              fieldUpdate({ ...allAttrs, [fieldNameForUpdate]: inputValue })
            }}
          />
        </>
      )}
    </div>
  )
}

const Name = ({
  allAttrs,
  fieldNameForUpdate,
  placeholder,
  setItemCanUpdate,
  handleUpdate,
  headerTitle,
  itemCanUpdate,
  contentAlign,
  fieldUpdate,
}: INameProps): JSX.Element => {
  const productNameValue: string = allAttrs[fieldNameForUpdate]
  const [inputValue, setInputValue] = useState<string>(productNameValue)
  const [editMode, setEditMode] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (_event: React.SyntheticEvent, { value }: any): void => {
    setInputValue(value)
  }
  useEffect((): void => {
    if (productNameValue !== inputValue) {
      setInputValue(productNameValue)
    }
  }, [productNameValue])

  const clearHandler = (): void => {
    setInputValue(productNameValue)
  }

  const updateHandler = (): void => {
    handleUpdate(fieldNameForUpdate, inputValue)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItemCanUpdate((prevState: any): any => {
      delete prevState[fieldNameForUpdate]
      return { ...prevState }
    })
  }
  return (
    <div style={{ textAlign: contentAlign || 'left' }}>
      {!editMode ? (
        <>
          <p style={{ padding: '10px', border: '1px solid #d8d8d8' }}>{productNameValue}</p>
          <Button
            color="black"
            content="Edit"
            icon="edit outline"
            size="medium"
            onClick={(): void => {
              setEditMode(true)
            }}
          />
          {itemCanUpdate[fieldNameForUpdate] && (
            <Button color="green" content="Update" size="medium" onClick={updateHandler} />
          )}
        </>
      ) : (
        <>
          <Button content="Undo" color="grey" icon="erase" size="medium" onClick={clearHandler} />
          <div style={{ marginBottom: '10px' }} />
          <Input placeholder={placeholder} value={inputValue} onChange={inputChangeHandler} />
          <div style={{ marginTop: '10px' }} />
          <Button
            content="Save"
            color="orange"
            size="medium"
            icon="save outline"
            onClick={(): void => {
              setEditMode(false)
              if (inputValue !== productNameValue) {
                setItemCanUpdate(prevState =>
                  prevState[fieldNameForUpdate] ? prevState : { ...prevState, [fieldNameForUpdate]: headerTitle }
                )
              }
              fieldUpdate({ ...allAttrs, [fieldNameForUpdate]: inputValue })
            }}
          />
        </>
      )}
    </div>
  )
}

const Description = ({
  allAttrs,
  fieldNameForUpdate,
  placeholder,
  setItemCanUpdate,
  handleUpdate,
  headerTitle,
  itemCanUpdate,
  contentAlign,
  fieldUpdate,
}: IDescriptionProps): JSX.Element => {
  const productDescriptionValue: string = allAttrs[fieldNameForUpdate]
  const [inputValue, setInputValue] = useState<string>(productDescriptionValue)
  const [editMode, setEditMode] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputChangeHandler = (_event: React.SyntheticEvent, { value }: any): void => {
    setInputValue(value)
  }
  useEffect((): void => {
    if (productDescriptionValue !== inputValue) {
      setInputValue(productDescriptionValue)
    }
  }, [productDescriptionValue])

  const clearHandler = (): void => {
    setInputValue(productDescriptionValue)
  }

  const updateHandler = (): void => {
    handleUpdate(fieldNameForUpdate, inputValue)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItemCanUpdate((prevState: any): any => {
      delete prevState[fieldNameForUpdate]
      return { ...prevState }
    })
  }
  return (
    <div style={{ textAlign: contentAlign || 'left' }}>
      <Form>
        {!editMode ? (
          <>
            <p style={{ border: '1px solid #d8d8d8', padding: '10px' }}>{productDescriptionValue}</p>
            <Button
              color="black"
              content="Edit"
              icon="edit outline"
              size="medium"
              onClick={(): void => {
                setEditMode(true)
              }}
            />
            {itemCanUpdate[fieldNameForUpdate] && (
              <Button color="green" content="Update" size="medium" onClick={updateHandler} />
            )}
          </>
        ) : (
          <>
            <Button content="Undo" color="grey" icon="erase" size="medium" onClick={clearHandler} />
            <div style={{ marginBottom: '10px' }} />
            <TextArea placeholder={placeholder} value={inputValue} onChange={inputChangeHandler} />
            <div style={{ marginTop: '10px' }} />
            <Button
              content="Save"
              color="orange"
              size="medium"
              icon="save outline"
              onClick={(): void => {
                setEditMode(false)
                if (inputValue !== productDescriptionValue) {
                  setItemCanUpdate(prevState =>
                    prevState[fieldNameForUpdate] ? prevState : { ...prevState, [fieldNameForUpdate]: headerTitle }
                  )
                }
                fieldUpdate({ ...allAttrs, [fieldNameForUpdate]: inputValue })
              }}
            />
          </>
        )}
      </Form>
    </div>
  )
}

const CanUpdateMessegeBlock = styled(Headroom)`
  .headroom {
    display: inline-block;
    z-index: 10;
  }
  .headroom--unfixed {
    position: static;
    height: auto;
  }
  .headroom--unpinned {
    transition: all 500ms ease-in-out;
    position: fixed;
    height: ${({ headerheight }) => headerheight}px;
    bottom: 0;
    right: 5px;
    cursor: pointer;
    animation: shadow infinite;
  }
  .headroom--pinned {
    transition: all 500ms ease-in-out;
    height: ${({ headerheight }) => headerheight}px;
    position: fixed;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
  .headroom--unpinned:hover,
  .headroom--pinned:hover {
    height: ${({ headerheight, itemscount, itemheight }) => itemscount * itemheight + headerheight}px;
    bottom: 10px;
  }
`

const ProductAttributeTable = ({
  allAttrs,
  headerTitle,
  fieldNameForUpdate,
  validationRules,
  itemPlaceholder,
  setItemCanUpdate,
  handleUpdate,
  fieldUpdate,
  itemCanUpdate,
}: IProductAttributeTableProps): JSX.Element | null => {
  const [editRowsId, setEditRowsId] = useState<Array<string | null | undefined>>([])
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

  const updateItemAction = async (): Promise<void> => {
    if (confirmOpen) {
      setConfirmOpen(false)
    }
    try {
      await handleUpdate(fieldNameForUpdate, allAttrs[fieldNameForUpdate])
      setItemCanUpdate(prevState => {
        const newState = { ...prevState }
        delete newState[fieldNameForUpdate]
        return newState
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  const updateItemButtonClickHandler = (): void | undefined => {
    if (editRowsId.length) {
      setConfirmOpen(true)
      return
    }
    updateItemAction()
  }

  if (Array.isArray(allAttrs[fieldNameForUpdate])) {
    const itemsForRendering: Array<string | null> = allAttrs[fieldNameForUpdate]
    return (
      <>
        <Header as="h5" dividing>
          {headerTitle}
        </Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Attribute name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Price increment (cents)</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemsForRendering.map((item: string | null, index: number) => {
              if (item === null) {
                return null
              }
              const key: string = item.slice(0, item.indexOf('$'))
              return (
                <TableRow
                  key={key}
                  id={key}
                  item={item}
                  index={index}
                  itemPlaceholder={itemPlaceholder}
                  validationRules={validationRules}
                  fieldUpdateHandler={fieldUpdate(fieldNameForUpdate, allAttrs)}
                  attrCanUpdateTitle={headerTitle}
                  setEditRowsId={setEditRowsId}
                  editRowsId={editRowsId}
                />
              )
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">Create {headerTitle} Attribute</Table.HeaderCell>
            </Table.Row>
            <TableRow
              itemPlaceholder={itemPlaceholder}
              validationRules={validationRules}
              attrCanUpdateTitle={headerTitle}
              fieldUpdateHandler={fieldUpdate(fieldNameForUpdate, allAttrs)}
            />
            {itemCanUpdate[fieldNameForUpdate] && (
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Button
                    onClick={updateItemButtonClickHandler}
                    content={`Update ${headerTitle}`}
                    color="green"
                    style={{
                      dispaly: 'block',
                    }}
                    size="medium"
                  />
                  <Confirm
                    open={confirmOpen}
                    header={`Update ${headerTitle}`}
                    content={`You have ${editRowsId.length} ${
                      editRowsId.length > 1 ? 'rows' : 'row'
                    } in Edit mode. Are you sure?`}
                    confirmButton="Yes"
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={updateItemAction}
                  />
                </Table.HeaderCell>
              </Table.Row>
            )}
          </Table.Footer>
        </Table>
      </>
    )
  }
  return null
}

const TableRow = ({
  item,
  index,
  validationRules,
  fieldUpdateHandler,
  itemPlaceholder,
  attrCanUpdateTitle,
  editRowsId,
  setEditRowsId,
  id,
}: ITableRowProps): JSX.Element => {
  const [isEditMode, setEditMode] = useState(index === undefined)
  const keyRef: React.MutableRefObject<null> = useRef(null)
  const valueRef: React.MutableRefObject<null> = useRef(null)
  const itemToKeqValueObj = (iitem: string | undefined): TItemKeyValue => ({
    itemKey: iitem !== undefined ? iitem.slice(0, iitem.indexOf('$')) : '',
    itemValue: iitem !== undefined ? iitem.slice(iitem.indexOf('$') + 1) : '',
  })

  const [itemKeyValue, setItemKeyValue] = useState<TItemKeyValue>(itemToKeqValueObj(item))
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const clearItemErrors = (): TTableRowErrors => ({
    itemKey: [],
    itemValue: [],
  })
  const [itemKeyValueErrors, setItemKeyValueErrors] = useState<TTableRowErrors>(clearItemErrors())

  const toggleToShowOrEditMode = (): void => {
    setEditMode(!isEditMode)
  }

  const checkErrors = (inputsNameForCheck: string[], iindex: number | undefined): TTableRowErrors => {
    const errors: TTableRowErrors = clearItemErrors()
    validationRules.forEach(({ func, fieldsName, msg }): void => {
      inputsNameForCheck.forEach((name: string): void => {
        if (fieldsName.includes(name) && func(itemKeyValue[name], iindex) === false) {
          errors[name].push(msg)
        }
      })
    })
    return errors
  }

  useEffect(() => {
    if (isEditMode) {
      checkErrors(['itemKey', 'itemValue'], index)
    }
  }, [editRowsId])

  useEffect(() => {
    if (editRowsId !== undefined && typeof setEditRowsId === 'function') {
      setEditRowsId(prevState => {
        if (isEditMode && Array.isArray(prevState)) {
          return [...prevState, id]
        }
        const indexKeyInState: number = prevState.findIndex(keyInState => keyInState === id)
        if (indexKeyInState !== -1) {
          prevState.splice(indexKeyInState, 1)
          return [...prevState]
        }
        return prevState
      })
    }
    return (): void => {
      if (editRowsId !== undefined && typeof setEditRowsId === 'function') {
        setEditRowsId(prevState => {
          const indexKeyInState: number = prevState.findIndex(keyInState => keyInState === id)
          if (indexKeyInState !== -1) {
            prevState.splice(indexKeyInState, 1)
            return [...prevState]
          }
          return prevState
        })
      }
    }
  }, [isEditMode])

  const closeEditAction = (inputsNameForCheck: string[], iindex: number | undefined): (() => void) => (): void => {
    const errors = checkErrors(inputsNameForCheck, iindex)
    if (Object.values(errors).findIndex((iitem: Array<string | null>): boolean => Boolean(iitem.length)) === -1) {
      fieldUpdateHandler(itemKeyValue, iindex, false, attrCanUpdateTitle)
      if (iindex !== undefined && item !== undefined) {
        toggleToShowOrEditMode()
      } else {
        setItemKeyValue(itemToKeqValueObj(undefined))
      }
    }
    setItemKeyValueErrors(errors)
  }

  const editAction = (): void => {
    toggleToShowOrEditMode()
  }

  const clearAction = (): void => {
    setItemKeyValueErrors(clearItemErrors())
    setItemKeyValue(itemToKeqValueObj(item))
  }

  const deleteAction = (): void => {
    fieldUpdateHandler(itemKeyValue, index, true, attrCanUpdateTitle)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHandler = (_event: React.SyntheticEvent, { name, value }: any): void => {
    const errors = { ...itemKeyValueErrors }
    errors[name] = clearItemErrors()[name]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationRules.forEach(({ func, fieldsName, msg }: any): void => {
      if (fieldsName.includes(name) && func(value) === false) {
        errors[name].push(msg)
      }
    })
    setItemKeyValue(prevState => ({ ...prevState, [name]: value }))
    setItemKeyValueErrors(errors)
  }

  const getErrorMessage = (errors: Array<string | null>): JSX.Element | null => {
    if (errors.length) {
      return <Message error header="Validation error" list={errors} />
    }
    return null
  }
  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        {isEditMode ? (
          <>
            <div ref={keyRef}>
              <Input
                name="itemKey"
                error={Boolean(itemKeyValueErrors.itemKey.length)}
                value={itemKeyValue.itemKey}
                onChange={changeHandler}
                placeholder={(itemPlaceholder && itemPlaceholder.itemKey) || ''}
              />
            </div>
            <Popup context={keyRef} position="top center" open={Boolean(itemKeyValueErrors.itemKey.length)}>
              <Popup.Content>{getErrorMessage(itemKeyValueErrors.itemKey)}</Popup.Content>
            </Popup>
          </>
        ) : (
          itemKeyValue.itemKey
        )}
      </Table.Cell>
      <Table.Cell textAlign="center">
        {isEditMode ? (
          <>
            <div ref={valueRef}>
              <Input
                name="itemValue"
                error={Boolean(itemKeyValueErrors.itemValue.length)}
                value={itemKeyValue.itemValue}
                onChange={changeHandler}
                placeholder={(itemPlaceholder && itemPlaceholder.itemValue) || ''}
              />
            </div>
            <Popup context={valueRef} position="top center" open={Boolean(itemKeyValueErrors.itemValue.length)}>
              <Popup.Content>{getErrorMessage(itemKeyValueErrors.itemValue)}</Popup.Content>
            </Popup>
          </>
        ) : (
          itemKeyValue.itemValue
        )}
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          color={(index !== undefined && (isEditMode ? 'orange' : 'black')) || 'orange'}
          content={(index !== undefined && (isEditMode ? 'Save' : 'Edit')) || 'Create'}
          onClick={isEditMode ? closeEditAction(['itemKey', 'itemValue'], index) : editAction}
          icon={(index !== undefined && (isEditMode ? 'save outline' : 'edit outline')) || 'write'}
          size="small"
        />
        <div style={{ paddingTop: '5px' }} />
        <Button
          color={isEditMode ? 'grey' : 'red'}
          content={isEditMode ? 'Undo' : 'Delete'}
          // eslint-disable-next-line prettier/prettier
          onClick={isEditMode ? clearAction : () => { setConfirmOpen(true) }}
          icon={isEditMode ? 'erase' : 'trash'}
          size="small"
        />
        <Confirm
          open={confirmOpen}
          header="Confirmation required"
          content="Delete this item?"
          confirmButton="Yes"
          onCancel={() => {
            setConfirmOpen(false)
          }}
          onConfirm={() => {
            deleteAction()
          }}
        />
      </Table.Cell>
    </Table.Row>
  )
}
