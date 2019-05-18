import { GET_ERRORS, SET_CURRENT_USER, UPDATE_USER_AVATAR } from './types';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../config/dbconfig';

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post(`${API_URL}/api/users/register`, userData)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

export const loginUser = userData => dispatch => {
  axios
    .post(`${API_URL}/api/users/login`, userData)
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
  axios.post(`${API_URL}/api/users/update`, user)
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
