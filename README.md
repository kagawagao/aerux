# aerux

An easy way to use redux with react

## Install

```bash
npm install aerux
```

## Use

```js
// es6
import { createStore } from 'aerux'
// or
const { createStore } = require('aerux')

const store = createStore(options)

// reducers/count.js
import { createModel } from 'aerux'

export const { actions, reducer } = createModel({
  namespace: 'count',
  state: 0,
  actions: ['plus', {
    'minus': (count) => count
  }],
  reducers: {
    'plus': (state, { payload }) => state + payload,
    'minus': (state, { payload }) => state - count
  }
})

// Count.jsx
import { connect } from 'aerux'
import { actions } from './reducers/count'

class Count extends React.Component {
  render() {
    // ...
  }
}

export default connect(state => ({
  count: state.count
}), actions)

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

| name | description | type | default | optional |
| ---- | ----------- | ---- | ------- | -------- |
| `middlewares` | redux middleware | `Array` | `[]` | `true`|
| `enhancers` | redux enhancer | `Array` | `[]` | `true` |
| `compose` | used for redux devtool | - | `redux.compose` | `true` |
| `initialState` | initialState | `Object` | `{}` | `true` |
| `initialReducers` | global reducer | valid redux reducers | `{}` | `true` |

### `createModel`

```js
const { actions, reducer } = createModel({
  namespace,
  state,
  actions,
  reducers
})
```

| name | description | type | default | optional |
| ---- | ----------- | ---- | ------- | -------- |
| `namespace` | namespace | `string` | `undefined` | `true`|
| `state` | initial state | `*` | `null` | `true` |
| `actions` | redux actions | `string | Array<string> | Map<key, function> | Map<key, function>` | `{}` | `true` |
| `reducers` | action handlers | `Map<key, reducer>` | `{}` | `true` |

#### Notes

- `namespace`: if you present `namespace` and `store` is created, reducer will be auto injected to `store`

- `actions`: `actionCreator` is created by `redux-actions`, if `action` is a `string`, `aerux` will create a default action for it

  ```js
  const defaultAction = (payload) => payload
  ```

- if `reducers` is empty, default action handler will be created

  ```js
  const defaultReducer = (state, { payload }) => payload
  ```

### `connect`

```js
connect(mapStateToProps, actions)(Component)
```

### `store.injectReducer`

This function is used for async inject reducer, for `code-splitting`

### `store.hotReplaceReducer`

This function is used for `HMR` when build application with `Webpack`
