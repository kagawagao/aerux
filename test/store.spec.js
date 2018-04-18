import createStore from '../src/store'

describe('store.js', () => {
  test('normal create store', () => {
    const store = createStore()

    expect(store).toHaveProperty('hotReplaceReducer')
    expect(store).toHaveProperty('injectReducer')
  })

  test('create store with initial state', () => {
    const store = createStore({
      initialState: {
        test: ''
      }
    })

    const state = store.getState()

    expect(state).toHaveProperty('test', '')
  })

  test('create store with initial reducer', () => {
    const store = createStore({
      initialReducers: {
        test: (state = {}, { type, payload }) => {
          return type === 'test' ? payload : state
        }
      }
    })

    store.dispatch({
      type: 'test',
      payload: 'a'
    })

    const state = store.getState()

    expect(state).toHaveProperty('test', 'a')
  })

  test('create store with middleware', () => {
    const mock = jest.fn()
    const test = store => next => action => {
      mock()
      return next(action)
    }
    const store = createStore({
      middlewares: [test]
    })
    store.dispatch({
      type: 'test',
      payload: 1
    })

    expect(mock).toHaveBeenCalled()
  })
})
