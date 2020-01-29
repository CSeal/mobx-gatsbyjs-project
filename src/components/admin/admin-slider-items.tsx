import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Loader, Message, Segment, Table, Icon, Image } from 'semantic-ui-react'
import moment from 'moment'
import { listSliderItems } from '../../utils/graphql'
import { ListSliderItemsQuery } from '../../API'
import { sliderImgUrlCreater } from '../../utils/urls'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemsSortUpdatedAt = (prevItem: any, nextItem: any): number =>
  // most recent timestamps first
  moment(prevItem.updatedAt).isBefore(nextItem.updatedAt) ? 1 : -1

const AdminSliderItems = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [itemsList, updateItemsList] = useState<ListSliderItemsQuery['listSliderItems'] | null>(null)

  useEffect(() => {
    async function queryItems() {
      try {
        const resp = await API.graphql(graphqlOperation(listSliderItems))
        if (
          resp.data.listSliderItems &&
          resp.data.listSliderItems.items &&
          resp.data.listSliderItems.items.length > 0
        ) {
          updateItemsList(resp.data.listSliderItems)
        }
      } catch (err) {
        console.log('error: ', err)
        setError(true)
      }
      setLoading(false)
    }
    queryItems()
  }, [])

  return (
    <Segment>
      <Header as="h3">Slider items</Header>
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
          {!loading && !error && (
            <Link to="/app/admin/newslideritem">
              <Icon name="add circle" />
              Create new slider item
            </Link>
          )}
          {itemsList && itemsList.items && itemsList.items.length > 0 ? (
            <Table size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Alt tag content</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Image</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {itemsList.items.sort(itemsSortUpdatedAt).map(item => {
                  if (!item) return null
                  return (
                    <Table.Row key={`row_${item.id}`}>
                      <Table.Cell key={`seoalt_${item.id}`}>
                        <Link to={`/app/admin/slideritem/${item.id}`}>{item.seoalt}</Link>
                      </Table.Cell>
                      <Table.Cell key={`status_${item.id}`}>{item.status.toUpperCase()}</Table.Cell>
                      <Table.Cell key={`img_${item.id}`}>
                        {item.image.split('/')[0] === 'public' ? (
                          <Image src={sliderImgUrlCreater(item.image)} size="small" />
                        ) : (
                          'NO image'
                        )}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          ) : (
            <p style={{ paddingTop: '20px' }}>No slider items.</p>
          )}
        </>
      )}
    </Segment>
  )
}

export default AdminSliderItems
