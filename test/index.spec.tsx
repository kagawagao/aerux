describe('index.ts', () => {
  test('should export correct', () => {
    const { createModel, createStore, connect } = require('../src').default

    expect(typeof createModel).toBe('function')
    expect(typeof createStore).toBe('function')
    expect(typeof connect).toBe('function')
  })

  test('no duplicate store created', () => {
    const { createStore } = require('../src')
    const store = createStore()

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

    const store = createStore()

    createModel({
      namespace: 'test',
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

    const state = store.getState()

    expect(state).toHaveProperty('test', 1)

    actions.test.add()
    const state2 = store.getState()
    console.log(state2)
    expect(state2).toHaveProperty('test', 2)
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
