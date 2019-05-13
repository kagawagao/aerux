import _createStore, { AeruxStore, StoreOption } from './store'
import _createModel, { IModelConfig, AeruxModel } from './model'
import _connect from './connect'

interface AeruxActionMap {
  [actionName: string]: (...args: any[]) => any
}

export interface AeruxNamespaceActionMap {
  [namespace: string]: AeruxActionMap
}

let store: AeruxStore

export const actions: AeruxNamespaceActionMap = {}

export const createStore = (option: StoreOption = {}): AeruxStore => {
  if (!store) {
    const {
      middlewares = [],
      enhancers = [],
      initialReducers = {},
      initialState = {},
      compose
    } = option
    store = _createStore({
      middlewares,
      enhancers,
      initialReducers,
      initialState,
      compose
    })
  }

  return store
}

export const createModel = (model: IModelConfig): AeruxModel =>
  _createModel(model, store, actions)

export const connect = _connect

export default {
  createStore,
  createModel,
  connect,
  actions
}
