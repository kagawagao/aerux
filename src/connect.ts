import {
  connect as _connect,
  MapStateToProps,
  InferableComponentEnhancerWithProps
} from 'react-redux'
import { bindActionCreators, ActionCreatorsMapObject } from 'redux'

const connect = (
  mapStateToProps: MapStateToProps<any, any, any> = () => ({}),
  actions: ActionCreatorsMapObject<any> = {}
): InferableComponentEnhancerWithProps<{}, any> => {
  return _connect(mapStateToProps, dispatch =>
    bindActionCreators(actions, dispatch)
  )
}

export default connect
