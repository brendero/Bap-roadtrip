import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tripReducer from './tripReducer';
import requestReducer from './requestReducer';

export default combineReducers({
  auth: authReducer,
  trip: tripReducer,
  request: requestReducer,
  errors: errorReducer
})