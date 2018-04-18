import { applyMiddleware, createStore, compose as reduxCompose, combineReducers } from 'redux'
import isEmpty from 'lodash/isEmpty'

export default ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose = reduxCompose
} = {}) => {
  // make root reducer
  const makeRootReducer = (asyncReducers = {}) => {
    return combineReducers({
      ...initialReducers,
      ...asyncReducers
    })
  }

  let reducer
  if (isEmpty(initialReducers)) {
    reducer = (state) => state
  } else {
    reducer = makeRootReducer()
  }

  const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ))

  // initial reducers
  store.asyncReducers = {}

  // inject reducer
  store.injectReducer = (key, reducer) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
  }

  // for HMR
  store.hotReplaceReducer = (reducers) => {
    store.replaceReducer(makeRootReducer(reducers))
  }

  return store
}
