import axios from 'axios';
import { GET_REQUEST, GET_ERRORS, ADD_REQUEST, REQUESTS_LOADING } from './types';


export const getRequests = () => dispatch => {
  dispatch(setRequestsLoading());
  axios.get('http://192.168.1.42:5000/api/requests')
    .then(res => dispatch({
      type: GET_REQUEST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const addRequest = (request) => dispatch => {
  axios.post('http://192.168.1.42:5000/api/requests', request)
    .then(res => dispatch({
      type: ADD_REQUEST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const setRequestsLoading = () => {
  return {
    type: REQUESTS_LOADING
  }
}