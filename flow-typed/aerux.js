// @flow
import { type ReducersMapObject, type StoreEnhancer } from 'redux'

declare type StoreOption = {
  middlewares?: Array<any>,
  enhancers?: Array<StoreEnhancer>,
  initialState?: Object,
  initialReducers?: ReducersMapObject,
  compose?: any
}

declare type Model = {
  namespace?: string,
  state?: any,
  actions?: any,
  reducers?: {[x: string]: any}
}
