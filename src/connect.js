import { connect as _connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const connect = (mapStateToProps, actions) => {
  return _connect(mapStateToProps, dispatch => bindActionCreators(actions, dispatch))
}

export default connect
