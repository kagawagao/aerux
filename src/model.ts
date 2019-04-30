import { createAction, createActions, handleActions } from 'redux-actions'
import flattenActionMap from 'redux-actions/lib/utils/flattenActionMap'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'
import { AeruxStore } from './store'

declare type Payload = any

declare type State = any

declare type AeruxActionMap = {
  [type: string]: Function
}

declare type AeruxAction =
  | string
  | Function
  | string[]
  | Function[]
  | AeruxActionMap
  | Array<string | AeruxActionMap>

declare type ReduxActionPayload = {
  type: string
  payload: any
  meta?: any
}

interface ReducerFunc {
  (state: State, action: ReduxActionPayload): State
}

interface ReducerMap {
  next?: ReducerFunc
  throw?: ReducerFunc
}

interface AeruxReducerMap {
  [type: string]: ReducerFunc | ReducerMap
}

export interface IModelConfig {
  namespace?: string
  state?: any
  actions?: AeruxAction | AeruxAction[]
  reducers?: AeruxReducerMap
}

export interface AeruxModel {
  actions: AeruxActionMap
  reducer: Function
}

const defaultAction = (payload: Payload) => payload

const defaultReducer = (state: State, { payload }: ReduxActionPayload) =>
  <State>payload

const createModel = (model: IModelConfig, store?: AeruxStore): AeruxModel => {
  if (!isPlainObject(model)) {
    throw new TypeError('Invalid `model` present')
  }
  let { namespace, state = null, actions = {}, reducers = {} } = model

  let tempActions: {
    [x: string]: any
  } = {}

  if (typeof actions === 'string') {
    actions = [actions]
  }

  if (Array.isArray(actions)) {
    actions.forEach(action => {
      if (typeof action === 'string') {
        tempActions[action] = defaultAction
      } else if (isPlainObject(action)) {
        tempActions = { ...tempActions, ...action }
      }
    })
  } else {
    tempActions = actions
  }

  if (!isPlainObject(reducers)) {
    reducers = {}
  }

  const createdActions = createActions(tempActions)

  if (!isEmpty(tempActions)) {
    Object.keys(flattenActionMap(tempActions)).forEach(type => {
      if (!reducers[type]) {
        reducers[type] = defaultReducer
      }
    })
  }

  const reducer = handleActions(reducers, state)

  if (namespace && store && typeof store.injectReducer === 'function') {
    store.injectReducer(namespace, reducer)
    // create initial state action
    const initialStateAction = createAction(`${namespace}/@@INIT`)
    // initial state
    store.dispatch(initialStateAction())
  }

  return {
    actions: createdActions,
    reducer
  }
}

export default createModel
