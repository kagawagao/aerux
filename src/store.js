import { applyMiddleware, createStore, compose as reduxCompose, combineReducers } from 'redux'

// make root reducer
export const makeRootReducer = (initialReducers = {}) => {
  return combineReducers(initialReducers)
}

export default ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose = reduxCompose
}) => {
  const store = createStore(makeRootReducer(), initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ))

  // initial reducers
  store.reducers = initialReducers

  // inject reducer
  store.injectReducer = (key, reducer) => {
    if (Object.hasOwnProperty.call(store.reducers, key)) return

    store.reducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.reducers))
  }

  return store
}
