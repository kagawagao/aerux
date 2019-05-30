import React from 'react'
import PropTypes from 'prop-types'
import { connect, actions } from 'aerux'

class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number
  }
  render() {
    const { plus, minus, reset, count } = this.props
    return (
      <div>
        <span>{count}</span>
        <button onClick={() => actions.count.plus(2)}>+</button>
        <button onClick={() => actions.count.minus(3)}>-</button>
        <button onClick={() => actions.count.reset(0)}>Reset</button>
      </div>
    )
  }
}

export default connect(state => ({
  count: state.count
}))(Count)
