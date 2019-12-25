import {
  createAction,
  createActions,
  handleActions,
  ActionMap,
  ReduxCompatibleReducer,
  ReduxCompatibleReducerMeta,
  ReducerMapMeta,
  ReducerMap,
  ActionFunctionAny
} from 'redux-actions'
import isPlainObject from 'lodash/isPlainObject'
import { AeruxStore } from './store'
import { Action } from 'redux'

declare type Payload = any

declare type State = any

declare type Meta = any

export interface ModelConfig<State = any> {
  namespace: string
  state: State
  actions?: ActionMap<Payload, Meta>
  reducers?:
    | ReducerMapMeta<State, Payload, Meta>
    | ReducerMap<State, Payload>
    | ReducerMap<State, State>
}

export interface CreateActionMap {
  [actionName: string]: ActionFunctionAny<Action<Payload>>
}

export interface AeruxModel<State = any> {
  namespace: string
  actions: CreateActionMap
  reducer:
    | ReduxCompatibleReducer<State, Payload>
    | ReduxCompatibleReducerMeta<State, Payload, Meta>
}

function createModel<State = any>(
  model: ModelConfig<State>,
  store?: AeruxStore
): AeruxModel<State> {
  if (!isPlainObject(model)) {
    throw new TypeError('Invalid `model` present')
  }
  let { namespace, state, actions = {}, reducers = {} } = model

  if (!isPlainObject(reducers)) {
    reducers = {}
  }

  const options = {
    prefix: namespace
  }

  const createdActions = createActions(actions, options)

  const reducer = handleActions(reducers, state, options)

  if (namespace && store) {
    store.injectReducer(namespace, reducer)
    // create initial state action
    const initialStateAction = createAction(`${namespace}/@@INIT`)
    // initial state
    store.dispatch(initialStateAction())
  }

  return {
    namespace,
    actions: createdActions,
    reducer
  }
}

export default createModel
