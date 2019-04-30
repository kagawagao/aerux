import {
  applyMiddleware,
  createStore,
  compose as reduxCompose,
  combineReducers,
  Store,
  Reducer,
  ReducersMapObject
} from 'redux'
import isEmpty from 'lodash/isEmpty'

export interface StoreOption {
  middlewares?: any[]
  enhancers?: any[]
  initialReducers?: ReducersMapObject
  initialState?: any
  compose?: any
}

export interface AeruxStore extends Store {
  asyncReducers: any
  injectReducer: (key: string, reducer: any) => void
  hotReplaceReducer: (reducers: ReducersMapObject) => void
  actions: {
    [namespace: string]: {
      [type: string]: Function
    }
  }
}

export default ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose = reduxCompose
}: StoreOption = {}): AeruxStore => {
  // make root reducer
  const makeRootReducer = (asyncReducers: ReducersMapObject = {}): Reducer => {
    return combineReducers({
      ...initialReducers,
      ...asyncReducers
    })
  }

  let reducer
  if (isEmpty(initialReducers)) {
    reducer = state => state
  } else {
    reducer = makeRootReducer()
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  ) as AeruxStore

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

  store.actions = {}

  return store
}
