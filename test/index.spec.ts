describe('index.ts', () => {
  afterEach(() => {
    jest.resetModules()
  })
  test('should export correct', () => {
    const { createModel, createStore, connect } = require('../src').default

    expect(typeof createModel).toBe('function')
    expect(typeof createStore).toBe('function')
    expect(typeof connect).toBe('function')
  })

  test('no duplicate store created', () => {
    const { createStore } = require('../src').default
    const store = createStore({
      middlewares: [],
      enhancers: [],
      reducers: {},
      state: {}
    })

    const store2 = createStore()

    expect(store2).toBe(store)
  })

  test('auto inject reducer after create store in create model', () => {
    const { createModel, createStore } = require('../src').default

    const store = createStore()

    createModel({
      namespace: 'test',
      state: 1
    })

    const state = store.getState()

    expect(state).toHaveProperty('test', 1)
  })

  test('auto inject actions', () => {
    const { createModel, createStore, actions } = require('../src').default

    const { reducer } = createModel({
      namespace: 'count',
      state: 1,
      actions: {
        add: () => {}
      },
      reducers: {
        add: (state: number) => {
          return state + 1
        }
      }
    })

    actions.count.add()

    const store = createStore({
      reducers: {
        count: reducer
      }
    })

    const state = store.getState()

    expect(state).toHaveProperty('count', 1)

    actions.count.add()
    const state2 = store.getState()
    expect(state2).toHaveProperty('count', 2)
  })

  test('no duplicate inject', () => {
    const { createModel, createStore } = require('../src').default

    const store = createStore()

    createModel({
      namespace: 'test',
      state: 1
    })

    const state = store.getState()

    expect(state).toHaveProperty('test', 1)

    createModel({
      namespace: 'test',
      state: 2
    })

    expect(state).toHaveProperty('test', 1)
  })
})
