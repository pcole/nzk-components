import { combineReducers } from 'redux'
import planningReducer from './planningReducer'
import writingReducer from './writingReducer'

export default combineReducers({
  planning: planningReducer,
  writing: writingReducer
})
