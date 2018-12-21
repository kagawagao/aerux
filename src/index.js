// @flow

import _createStore from './store'
import _createModel from './model'
import _connect from './connect'

import { type Store, type Reducer } from 'redux'

let store

export const createStore = ({
  middlewares = [],
  enhancers = [],
  initialReducers = {},
  initialState = {},
  compose
}: StoreOption = {}): Store => {
  if (!store) {
    store = _createStore({ middlewares, enhancers, initialReducers, initialState, compose })
  }

  return store
}

export const createModel = (model: Model): {
  actions: Map<string, Function>,
  reducer: Reducer
} => _createModel(model, store)

export const connect = _connect

export default {
  createStore,
  createModel,
  connect
}
