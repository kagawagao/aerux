import { createModel } from 'aerux'

export const { actions, reducer } = createModel({
  namespace: 'count',
  state: 0,
  actions: ['plus', {
    minus: count => Promise.resolve(count)
  }, 'reset'],
  reducers: {
    plus: (state, { payload }) => state + payload,
    minus: (state, { payload }) => state - payload
  }
})
