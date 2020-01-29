import React from 'react'
import { navigate } from '@reach/router'
import { Segment, Header, Button } from 'semantic-ui-react'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout seotitle="404: Not found" activeUri="/404">
    <>
      <Segment>
        <Header as="h3">Page not found.</Header>
        <Button onClick={() => navigate('/')} color="black" content="Go Home..." />
      </Segment>
      <div style={{ paddingTop: '20px' }} />
    </>
  </Layout>
)

export default NotFoundPage
