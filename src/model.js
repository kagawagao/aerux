// @flow
import { createAction, createActions, handleActions } from 'redux-actions'
import flattenActionMap from 'redux-actions/lib/utils/flattenActionMap'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'

import { type Store, type Reducer } from 'redux'

const defaultAction = (payload) => payload

const defaultReducer = (state, { payload }) => payload

const createModel = (model: Model, store: Store): {
  actions: Map<string, Function>,
  reducer: Reducer
} => {
  if (!isPlainObject(model)) {
    throw new TypeError('Invalid `model` present')
  }
  let {
    namespace,
    state = null,
    actions = {},
    reducers = {}
  } = model

  let tempActions: {
    [x: string]: any
  } = {}

  if (typeof actions === 'string') {
    actions = [actions]
  }

  if (Array.isArray(actions)) {
    actions.forEach((action) => {
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
