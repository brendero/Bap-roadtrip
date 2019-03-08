import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export const loginUser = () => dispatch => {
  axios.post('/api/users/login').then(res =>
    dispatch({
      type: LOGIN_USER,
      payload: res.data
    }))
}

export const registerUser = () => dispatch => {
  axios.post('/api/users/register').then(res =>
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    }))
}
