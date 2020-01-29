import React, { useState } from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Button, Segment, Loader, Message, List } from 'semantic-ui-react'
import { quoteItemByProdIdAdmin, shopItemByProdIdAdmin, IStoreItem } from '../../utils/graphql'
import AdminStoreItemsTable from './admin-store-items-table'

const withHttp = (url: string): string => (!/^https?:\/\//i.test(url) ? `http://${url}` : url)

const supInfoListItem = (textKey: string, textVal: string, link?: string): JSX.Element => {
  if (link) {
    return (
      <List.Item key={textKey}>
        <List.Content>
          <List.Header>{textKey}</List.Header>
          <List.Description href={withHttp(link)}>{textVal}</List.Description>
        </List.Content>
      </List.Item>
    )
  }
  return (
    <List.Item key={textKey}>
      <List.Content>
        <List.Header>{textKey}</List.Header>
        <List.Description>{textVal}</List.Description>
      </List.Content>
    </List.Item>
  )
}

const supInfoSKUitem = (item: { SKU: string; Values: Array<IProductSKUentry> }) => {
  if (item.Values.length > 0) {
    return (
      <List.List key={item.SKU}>
        <List.Item>
          <strong>{item.SKU}</strong>
        </List.Item>
        {item.Values.map((isku: IProductSKUentry) => (
          <List.Item key={isku.Code}>{`Code: ${isku.Code}; ${isku.Name}`}</List.Item>
        ))}
      </List.List>
    )
  }
  return item.SKU
}

interface IProductSupplier {
  Id: number
  Name: string
  AsiNumber: string
  Websites: null | string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface IProductSKUentry {
  Code: string
  Name: string
  [key: string]: string
}

interface IProductDetails {
  Id: number
  UpdateDate: string
  Name: string
  Description: string
  Number: null | string
  Numbers: null | string[]
  Supplier: IProductSupplier
  SKU: null | Array<{ SKU: string; Values: Array<IProductSKUentry> }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface IProps {
  productId: string
}

const AdminStreamItem = ({ productId }: IProps) => {
  const [loadingSup, setLoadingSup] = useState(false)
  const [errorSup, setErrorSup] = useState(false)
  const [supInfo, updateSupInfo] = useState<null | IProductDetails>(null)

  const [loadingQIs, setLoadingQIs] = useState(false)
  const [errorQIs, setErrorQIs] = useState(false)
  const [listQIs, updateListQIs] = useState<null | IStoreItem[]>(null)

  const [loadingSIs, setLoadingSIs] = useState(false)
  const [errorSIs, setErrorSIs] = useState(false)
  const [listSIs, updateListSIs] = useState<null | IStoreItem[]>(null)

  const listQuoteItems = async (prodId: string) => {
    setLoadingQIs(true)
    try {
      const resp = await API.graphql(
        graphqlOperation(quoteItemByProdIdAdmin, {
          productId: prodId,
        })
      )
      if (resp.data && resp.data.quoteItemByProdId && resp.data.quoteItemByProdId.items) {
        updateListQIs(resp.data.quoteItemByProdId.items)
      }
    } catch (err) {
      console.log('error: ', err)
      setErrorQIs(true)
    }
    setLoadingQIs(false)
  }

  const listShopItems = async (prodId: string) => {
    setLoadingSIs(true)
    try {
      const resp = await API.graphql(
        graphqlOperation(shopItemByProdIdAdmin, {
          productId: prodId,
        })
      )
      if (resp.data && resp.data.shopItemByProdId && resp.data.shopItemByProdId.items) {
        updateListSIs(resp.data.shopItemByProdId.items)
      }
    } catch (err) {
      console.log('error: ', err)
      setErrorSIs(true)
    }
    setLoadingSIs(false)
  }

  const querySupplier = async (prodId: string) => {
    setLoadingSup(true)
    try {
      const apiName = 'AdminQueries'
      const path = '/queryProductASI'
      const query = {
        queryStringParameters: {
          productId: prodId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      }
      const resp = await API.get(apiName, path, query)
      if (resp && resp.Id && `${resp.Id}` === prodId) {
        updateSupInfo(resp)
      } else {
        console.log(resp)
        setErrorSup(true)
      }
    } catch (err) {
      console.log('error: ', err)
      setErrorSup(true)
    }
    setLoadingSup(false)
  }

  return (
    <>
      <Segment>
        {loadingSIs ? (
          <Loader active inline="centered" />
        ) : (
          <>
            {errorSIs && (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{`Shop products query failed... Please check the URL (product ID ${productId}).`}</p>
              </Message>
            )}
            {!listSIs && (
              <Button
                onClick={() => listShopItems(productId)}
                content="List shop products"
                color="purple"
                size="small"
              />
            )}
            {listSIs && listSIs.length === 0 && <p>{`No shop products for product ID ${productId}.`}</p>}
            {listSIs && listSIs.length > 0 && <AdminStoreItemsTable itemList={listSIs} itemType="shop" />}
          </>
        )}
      </Segment>
      <Segment>
        {loadingQIs ? (
          <Loader active inline="centered" />
        ) : (
          <>
            {errorQIs && (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{`Quoted products query failed... Please check the URL (product ID ${productId}).`}</p>
              </Message>
            )}
            {!listQIs && (
              <Button onClick={() => listQuoteItems(productId)} content="List quotes" color="purple" size="small" />
            )}
            {listQIs && listQIs.length === 0 && <p>{`No quoted items for product ID ${productId}.`}</p>}
            {listQIs && listQIs.length > 0 && <AdminStoreItemsTable itemList={listQIs} itemType="deck" />}
          </>
        )}
      </Segment>
      <Segment>
        {loadingSup ? (
          <Loader active inline="centered" />
        ) : (
          <>
            {errorSup && (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{`Supplier query failed... Please check the URL (product ID ${productId}).`}</p>
              </Message>
            )}
            {supInfo ? (
              <List bulleted>
                {supInfoListItem('Name', supInfo.Name)}
                {supInfoListItem('Last updated', supInfo.UpdateDate)}
                {supInfoListItem('Full description', supInfo.Description)}
                {supInfoListItem('Supplier ASI number', supInfo.Supplier.AsiNumber)}
                {supInfoListItem('Supplier name', supInfo.Supplier.Name)}
                {supInfo.Supplier.Websites &&
                  supInfo.Supplier.Websites.length > 0 &&
                  supInfo.Supplier.Websites.map((link: string) => supInfoListItem('Supplier website', link, link))}
                {supInfo.Number && supInfoListItem('Supplier number', supInfo.Number)}
                {supInfo.Numbers &&
                  supInfo.Numbers.length > 1 &&
                  supInfoListItem('Supplier numbers (more)', supInfo.Numbers.join())}
                <List.Item key="SKUs">
                  <List.Content>
                    <List.Header>Supplier SKUs</List.Header>
                    <List.Description>
                      {supInfo.SKU && supInfo.SKU.length > 0 ? supInfo.SKU.map(supInfoSKUitem) : `No SKUs provided.`}
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            ) : (
              <Button
                onClick={() => querySupplier(productId)}
                content="Query supplier info"
                color="purple"
                size="small"
              />
            )}
          </>
        )}
      </Segment>
    </>
  )
}

export default AdminStreamItem
