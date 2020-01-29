import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Loader, Message, Segment } from 'semantic-ui-react'
import { shopsByStatus } from '../../utils/graphql'
import { ShopsByStatusQuery } from '../../API'
import AdminShopsTable from './admin-shops-table'

const AdminShops = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [shopPendList, updateShopPendList] = useState<null | ShopsByStatusQuery['shopsByStatus']>(null)
  const [shopLiveList, updateShopLiveList] = useState<null | ShopsByStatusQuery['shopsByStatus']>(null)

  useEffect(() => {
    async function queryRecentShops() {
      try {
        // recently updated pending shops
        const respPend = await API.graphql(
          graphqlOperation(shopsByStatus, {
            status: 'pending',
            sortDirection: 'DESC',
            limit: 100,
          })
        )
        if (
          respPend.data.shopsByStatus &&
          respPend.data.shopsByStatus.items &&
          respPend.data.shopsByStatus.items.length > 0
        ) {
          updateShopPendList(respPend.data.shopsByStatus)
        }

        // recently updated live shops
        const respLive = await API.graphql(
          graphqlOperation(shopsByStatus, {
            status: 'live',
            sortDirection: 'DESC',
            limit: 100,
          })
        )
        if (
          respLive.data.shopsByStatus &&
          respLive.data.shopsByStatus.items &&
          respLive.data.shopsByStatus.items.length > 0
        ) {
          updateShopLiveList(respLive.data.shopsByStatus)
        }
      } catch (err) {
        console.log('error: ', err)
        setError(true)
      }
      setLoading(false)
    }
    queryRecentShops()
  }, [])

  return (
    <>
      <Segment>
        <Header as="h3">Pending shops, recently updated</Header>
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <>
            {error && (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>Some admin queries failed... Try reloading this page.</p>
              </Message>
            )}
            {shopPendList && shopPendList.items && shopPendList.items.length > 0 ? (
              <AdminShopsTable shopList={shopPendList} />
            ) : (
              <p>No pending shops.</p>
            )}
          </>
        )}
      </Segment>
      <Segment>
        <Header as="h3">Live shops, recently updated</Header>
        {!loading && !error && shopLiveList && shopLiveList.items && shopLiveList.items.length > 0 && (
          <AdminShopsTable shopList={shopLiveList} />
        )}
      </Segment>
    </>
  )
}

export default AdminShops
