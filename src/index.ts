import _createStore, { AeruxStore, StoreOption } from './store'
import _createModel, { IModelConfig, AeruxModel } from './model'
import _connect from './connect'

let store: AeruxStore

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
  _createModel(model, store)

export const connect = _connect

export default {
  createStore,
  createModel,
  connect
}
