import React from 'react'
import { Provider } from 'react-redux'
import { create, act } from 'react-test-renderer'

class TestCase extends React.Component {
  render() {
    return <div>Test Case</div>
  }
}

describe('connect', () => {
  test('should work as expect', () => {
    const { createModel, createStore, connect } = require('../src')
    const store = createStore()

    const { actions } = createModel({
      namespace: 'test',
      state: 1,
      actions: 'add',
      reducers: {
        add: (state, payload) => state + 1
      }
    })

    const Test = connect(
      state => ({
        test: state.test
      }),
      actions
    )(TestCase)

    const testRenderer = create(
      <Provider store={store}>
        <Test />
      </Provider>
    )

    const testInstance = testRenderer.root

    expect(store.getState()).toHaveProperty('test', 1)

    expect(testInstance.findByType(TestCase).props.test).toBe(1)
    expect(typeof testInstance.findByType(TestCase).props.add).toBe('function')

    act(() => {
      testInstance.findByType(TestCase).props.add()
    })
    expect(testInstance.findByType(TestCase).props.test).toBe(2)
  })

  test('should no props present if no mapStateToProps or actions present', () => {
    const { createModel, createStore, connect } = require('../src')
    const store = createStore()

    createModel({
      namespace: 'test',
      state: 1,
      actions: 'add',
      reducers: {
        add: (state, payload) => state + 1
      }
    })

    const Test = connect()(TestCase)

    const testRenderer = create(
      <Provider store={store}>
        <Test />
      </Provider>
    )

    const testInstance = testRenderer.root

    expect(store.getState()).toHaveProperty('test')

    expect(testInstance.findByType(TestCase).props.test).toBeUndefined()
    expect(testInstance.findByType(TestCase).props.add).toBeUndefined()
  })
})
