import _createStore, { makeRootReducer } from './store'
import _createModel from './model'

let store

export const createStore = ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose
}) => {
  if (!store) {
    store = _createStore({middlewares, enhancers, initialReducers, initialState, compose})
  }

  return store
}

export const createModel = (options = {}) => {
  return _createModel({
    ...options,
    store
  })
}

export default {
  createStore,
  createModel,
  makeRootReducer
}
