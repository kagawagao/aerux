import { createAction, createActions, handleActions } from 'redux-actions'
import { flattenActionMap } from 'redux-actions/lib/flattenUtils'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'

const defaultAction = (payload) => payload

const defaultReducer = (state, { payload }) => payload

const createModel = ({
  namespace,
  state = null,
  actions = {},
  reducers,
  store
} = {}) => {
  let tempActions = {}

  if (isString(actions)) {
    actions = [actions]
  }

  if (isArray(actions)) {
    actions.forEach(action => {
      if (isString(action)) {
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

  if (process.env.NODE_ENV === 'development' && !store) {
    console.warn('Maybe you called `createModel` before `createStore`, this reducer will be not auto injected, you should inject yourself')
  }

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
