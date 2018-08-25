describe('index.js', () => {
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
