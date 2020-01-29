import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { API, graphqlOperation } from 'aws-amplify'
import { Header, Message, Segment, Form } from 'semantic-ui-react'
import { createSliderItem } from '../../utils/graphql'

const AdminSliderItemCreate = () => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(false)
  const [seoalt, setSeoalt] = useState('')
  const [linkUri, setLinkUri] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeInput = (_event: React.SyntheticEvent, data: any) => {
    if (data && data.id) {
      if (data.id === 'inputalt') {
        setSeoalt(data.value)
      }
      if (data && data.id && data.id === 'inputuri') {
        setLinkUri(data.value)
      }
    }
  }

  const handleSubmit = async (): Promise<void> => {
    setUpdating(true)
    try {
      const resp = await API.graphql(
        graphqlOperation(createSliderItem, {
          input: {
            seoalt: seoalt.toLowerCase(),
            uri: linkUri,
            status: 'inprogress',
            image: 'noimageyet',
          },
        })
      )
      if (resp.data.createSliderItem) {
        navigate(`/app/admin/slideritem/${resp.data.createSliderItem.id}`)
      }
    } catch (err) {
      console.log('error: ', err)
      setError(true)
    }
    setUpdating(false)
  }

  return (
    <Segment>
      <Header as="h3">Create new slider item</Header>
      <Form error={error} onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <Message error header="Error" content="Operation failed... Try again after reloading this page." />
        <Form.Input
          required
          label="SEO-friendly alt tag"
          type="text"
          placeholder="Specify image alt..."
          id="inputalt"
          onChange={onChangeInput}
        />
        <Form.Input
          required
          label="Relative link e.g. /some-shop"
          type="text"
          placeholder="Start with /..."
          id="inputuri"
          onChange={onChangeInput}
        />
        <Form.Button loading={updating} color="black" content="Create" />
      </Form>
    </Segment>
  )
}

export default AdminSliderItemCreate
