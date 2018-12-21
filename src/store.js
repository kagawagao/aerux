// @flow
import {
  applyMiddleware,
  createStore,
  compose as reduxCompose,
  combineReducers,
  type Store,
  type Reducer,
  type ReducersMapObject
} from 'redux'
import isEmpty from 'lodash/isEmpty'

export default ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose = reduxCompose
}: StoreOption = {}): Store => {
  // make root reducer
  const makeRootReducer = (asyncReducers: ReducersMapObject = {}): Reducer => {
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
  store.injectReducer = (key: string, reducer: Function): void => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
  }

  // for HMR
  store.hotReplaceReducer = (reducers: ReducersMapObject): void => {
    store.replaceReducer(makeRootReducer(reducers))
  }

  return store
}
