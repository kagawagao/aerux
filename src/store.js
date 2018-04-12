import { applyMiddleware, createStore, compose as reduxCompose, combineReducers } from 'redux'

export default ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose = reduxCompose
}) => {
  // make root reducer
  const makeRootReducer = (asyncReducers = {}) => {
    return combineReducers({
      ...initialReducers,
      ...asyncReducers
    })
  }

  const store = createStore(makeRootReducer(), initialState, compose(
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
