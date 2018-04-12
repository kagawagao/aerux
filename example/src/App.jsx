import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Count from './Count'

const App = () => (
  <Provider store={store}>
    <Count />
  </Provider>
)

export default App
