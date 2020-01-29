import React from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Button } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'
import compose from 'recompose/compose'
import uuid from 'uuid'

interface IProps {
  userStore: any
  path?: string
}

const shopBySlug = `query ShopBySlug($slug: String) {
  shopBySlug(slug: $slug) {
    items {
      id
      slug
    }
  }
}
`;

const checkshopslugavail = `query Checkshopslugavail($slug: String) {
  checkshopslugavail(slug: $slug)
}
`;

const getshopitemforeditor = `query Getshopitemforeditor($sitemid: String) {
  getshopitemforeditor(sitemid: $sitemid) {
    id
    access
    productName
  }
}
`

const getUserOrders = `query OrderByUsername($username: String) {
  orderByUsername(
    username: $username
    sortDirection: DESC
    limit: 9999
  ) {
    items {
      id
      username
      status
      createdAt
      products(limit:9999, sortDirection: DESC) {
        items {
          id
          pitemId
        }
      }
    }
  }
}
`

const AuxilQuery = compose<any, any>(inject('userStore'), observer)(
  ({ userStore }: IProps) => {
    //console.log(uuid.v4())

    const handleQuery = async () => {
      console.log('Running query...');

      /*const cuser = await Auth.currentAuthenticatedUser();
      console.log(cuser);
      console.log(userStore.isAdmin);*/

      try {
        // works for admin: use in lambda
        /*const resp = await API.graphql(graphqlOperation(
          shopBySlug, { slug: 'abc' }
        ));*/

        //const sitemId = 'b6840341-0a6a-416c-a6e7-305b5c9cc73c'

        const resp = await API.graphql(graphqlOperation(
          getUserOrders, { username: userStore.loginedUser.username }
        ));
        
        
        ////
        console.log(resp);
      } catch (err) {
        console.log('error: ', err);
      }
    
      console.log('...query complete.');
    }

    return (
      <Button onClick={handleQuery}>Run query</Button>
    )
  }
)

export default AuxilQuery
