// @flow
import {
  connect as _connect,
  type Connect,
  type MapStateToProps
} from 'react-redux'
import { bindActionCreators } from 'redux'

const connect = (mapStateToProps: MapStateToProps = () => ({}), actions: Object = {}): Connect => {
  return _connect(mapStateToProps, dispatch => bindActionCreators(actions, dispatch))
}

export default connect
