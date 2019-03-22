import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import tripReducer from './tripReducer';

export default combineReducers({
  auth: authReducer,
  trip: tripReducer,
  errors: errorReducer
})