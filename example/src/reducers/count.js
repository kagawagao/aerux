import { createModel } from 'aerux'

export const { actions, reducer } = createModel({
  namespace: 'count',
  state: 0,
  actions: {
    plus: [count => count, count => count],
    minus: count => Promise.resolve(count),
    reset: count => count
  },
  reducers: {
    plus: (state, { payload, meta }) => {
      console.log(meta)
      return state + payload
    },
    minus: (state, { payload }) => state - payload,
    reset: (state, { payload }) => payload
  }
})
