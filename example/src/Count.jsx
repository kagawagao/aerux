import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'aerux'
import { actions } from './reducers/count'

class Count extends React.Component {
  static propTypes = {
    plus: PropTypes.func,
    minus: PropTypes.func,
    reset: PropTypes.func,
    count: PropTypes.number
  }
  render () {
    const { plus, minus, reset, count } = this.props
    return (
      <div>
        <span>{count}</span>
        <button onClick={() => plus(2)}>+</button>
        <button onClick={() => minus(3)}>-</button>
        <button onClick={() => reset(0)}>Reset</button>
      </div>
    )
  }
}

export default connect(state => ({
  count: state.count
}), actions)(Count)
