import _createStore from './store'
import _createModel from './model'
import _connect from './connect'

let store

export const createStore = ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose
} = {}) => {
  if (!store) {
    store = _createStore({middlewares, enhancers, initialReducers, initialState, compose})
  }

  return store
}

export const createModel = (model) => _createModel(model, store)

export const connect = _connect

export default {
  createStore,
  createModel,
  connect
}
