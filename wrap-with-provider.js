// MobX in Gatsby setup
// https://github.com/gatsbyjs/gatsby/blob/master/examples/using-mobx/wrap-with-provider.js
// https://github.com/gatsbyjs/gatsby/issues/2940

import React from 'react'
import { Provider } from 'mobx-react'
import  RootStore  from './src/models/RootModel'

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider {...RootStore.getAllStore()}>{element}</Provider>
)
