import axios from 'axios';
import { GET_REQUEST, GET_ERRORS, ADD_REQUEST, REQUESTS_LOADING, DELETE_REQUEST } from './types';
import { API_URL } from '../config/dbconfig';

export const getRequests = () => dispatch => {
  dispatch(setRequestsLoading());
  axios.get(`${API_URL}/api/requests`)
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
  axios.post(`${API_URL}/api/requests`, request)
    .then(res => dispatch({
      type: ADD_REQUEST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const deleteRequest = (id) => dispatch => {
  axios.delete(`${API_URL}/api/requests/${id}`)
    .then(res => dispatch({
      type: DELETE_REQUEST,
      payload: id
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