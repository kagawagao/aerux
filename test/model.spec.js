import createModel from '../src/model'
// import createStore from '../src/store'

describe('model.js', () => {
  test('normal create model', () => {
    const { actions, reducer } = createModel()

    expect(actions).toEqual({})
    expect(reducer(1)).toBe(1)
  })

  test('create model with initial state', () => {
    const { reducer } = createModel({
      state: 1
    })

    const createStore = require('../src/store')

    const store = createStore({
      initialReducers: {
        test: reducer
      }
    })

    const state = store.getState()

    expect(state).toHaveProperty('test', 1)
  })

  test('create model with defined actions', () => {
    const { actions, reducer } = createModel({
      state: 1,
      actions: ['add', {
        set: () => 0
      }],
      reducers: {
        add: state => state + 1
      }
    })
    const createStore = require('../src/store')

    const store = createStore({
      initialReducers: {
        test: reducer
      }
    })

    const state = store.getState()

    expect(state).toHaveProperty('test', 1)

    store.dispatch(actions.add())

    const state1 = store.getState()

    expect(state1).toHaveProperty('test', 2)

    store.dispatch(actions.set())

    const state2 = store.getState()

    expect(state2).toHaveProperty('test', 0)
  })

  test('create model with string action', () => {
    const { actions } = createModel({
      actions: 'test'
    })

    expect(typeof actions.test).toBe('function')
  })

  test('create model with string action', () => {
    const { actions } = createModel({
      actions: 'test'
    })

    expect(typeof actions.test).toBe('function')
  })

  test('create model with action map', () => {
    const { actions } = createModel({
      actions: {
        test: () => {},
        add: () => {}
      }
    })

    expect(typeof actions.test).toBe('function')
    expect(typeof actions.add).toBe('function')
  })

  test('create model with invalid action', () => {
    const { actions } = createModel({
      actions: [['xxx']]
    })

    expect(actions.xxx).not.toBeDefined()
  })
})
