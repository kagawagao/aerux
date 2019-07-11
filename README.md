# aerux

[![node](https://img.shields.io/node/v/aerux.svg)](https://www.npmjs.com/package/aerux)
[![npm](https://img.shields.io/npm/v/aerux.svg)](https://www.npmjs.com/package/aerux)
[![license](https://img.shields.io/npm/l/aerux.svg)](https://github.com/kagawagao/aerux/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/kagawagao/aerux.svg?branch=master)](https://travis-ci.org/kagawagao/aerux)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![Coverage Status](https://coveralls.io/repos/github/kagawagao/aerux/badge.svg?branch=master)](https://coveralls.io/github/kagawagao/aerux?branch=master)
[![codecov](https://codecov.io/gh/kagawagao/aerux/branch/master/graph/badge.svg)](https://codecov.io/gh/kagawagao/aerux)
[![Known Vulnerabilities](https://snyk.io/test/github/kagawagao/aerux/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kagawagao/aerux?targetFile=package.json)

An easy way to use redux with react

## Install

```bash
npm install aerux
```

## Use

```js
// es6
import { createStore, createModel, connect, actions } from 'aerux'
// or
const { createStore, createModel, connect, actions } = require('aerux')

const store = createStore(options)

// reducers/count.js
import { createModel } from 'aerux'

export const { actions, reducer } = createModel({
  namespace: 'count',
  state: 0,
  actions: [
    'plus',
    {
      minus: count => count
    }
  ],
  reducers: {
    plus: (state, { payload }) => state + payload,
    minus: (state, { payload }) => state - payload
  }
})

// Count.jsx
import { connect } from 'aerux'

class Count extends React.Component {
  render() {
    // ...
  }
}

export default connect(state => ({
  count: state.count
}))(Count)

// App.jsx
import { Provider } from 'react-redux'
import Count from './Count'

const App = () => (
  <Provider store={store}>
    <Count />
  </Provider>
)
```

## API

### `createStore`

> create store with `redux.createStore`

```js
createStore({
  middlewares,
  enhancers,
  compose,
  initialState,
  initialReducers
})
```

| name          | description            | type                | default         | optional |
| ------------- | ---------------------- | ------------------- | --------------- | -------- |
| `middlewares` | redux middleware       | `Array`             | `[]`            | `true`   |
| `enhancers`   | redux enhancer         | `Array`             | `[]`            | `true`   |
| `compose`     | used for redux devtool | -                   | `redux.compose` | `true`   |
| `state`       | initial state          | `any`               | `{}`            | `true`   |
| `reducers`    | initial reducers       | `ReducersMapObject` | `{}`            | `true`   |

### `createModel`

> create model with `redux-actions`

```js
const { actions, reducer } = createModel({
  namespace,
  state,
  actions,
  reducers
})
```

| name        | description     | type                                                                                                       | default     | optional |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| `namespace` | namespace       | `string`                                                                                                   | `undefined` | `false`  |
| `state`     | initial state   | `any`                                                                                                      | `null`      | `true`   |
| `actions`   | redux actions   | `ActionMap<Payload, Meta> | string`                                                                        | `true`      |
| `reducers`  | action handlers | `ReduxCompatibleReducer<State, Action<Payload>> | ReduxCompatibleReducerMeta<State, Action<Payload>, any>` | `{}`        | `true`   |

> **Note**: if you create model after create store, you can use `actions` from `aerux` directly

#### Notes

- `namespace`: if you present `namespace` and `store` is created, reducer will be auto injected to `store`

- `actions`: `actionCreator` is created by `redux-actions`
- `reducers`: created by `redux-actions`

### `actions`

> action which created in `createModel` will be auto injected to it, you can call it directly

`actions[namespace][actionName]`

```js
actions.count.add()
```

### `connect`

> connect store and component like `redux.connect`, but much better

```js
connect(
  mapStateToProps,
  actions
)(Component)
```

> **Note**: you can use `actions` from `aerux` directly, no `connect` `actions` need, ex:

```js
import { actions } from 'aerux'

class DemoComponent extends React.Component {
  add = () => {
    actions.count.add()
  }
  render() {
    // ...
  }
}

connect(mapStateToProps)(DemoComponent)
```

### `store.actions[namespace][actionName]`

> another alias for `actions`

```js
store.actions.count.add()
```

### `store.injectReducer`

This function is used for async inject reducer, for `code-splitting`

### `store.hotReplaceReducer`

This function is used for `HMR` when build application with `Webpack`
