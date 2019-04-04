import { GET_ERRORS, SET_CURRENT_USER, UPDATE_USER_AVATAR } from './types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('http://192.168.1.42:5000/api/users/register', userData)
    .then(res => console.log(res.data))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

export const loginUser = userData => dispatch => {
  axios
    .post('http://192.168.1.42:5000/api/users/login', userData)
    .then(res => {
      const { token } = res.data;

      AsyncStorage.setItem('jwToken', token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const logoutUser = () => dispatch => {
  AsyncStorage.removeItem('jwToken');
  //Delete authorization from header
  setAuthToken(false);
  
  dispatch(setCurrentUser({}));
}

export const updateUserAvatar = (user) => dispatch => {
  axios.post('http://192.168.1.42:5000/api/users/update', user)
    .then(res => dispatch({
      type: UPDATE_USER_AVATAR,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
