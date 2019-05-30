import { createStore } from 'aerux'
import promiseMiddleware from 'redux-promise'

// middleware
const middlewares = [promiseMiddleware]

// enhancer
const enhancers = []

// initial state
const initialState = {}

// compose
let composeWithEnhancer

// use redux chrome extension in development
if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeWithEnhancer = composeWithDevToolsExtension
  } else {
    const { createLogger } = require('redux-logger')
    middlewares.push(createLogger())
  }
}

const store = createStore({
  middlewares,
  enhancers,
  compose: composeWithEnhancer,
  initialState,
  initialReducers: {
    count: require('./reducers/count').reducer
  }
})

export default store
