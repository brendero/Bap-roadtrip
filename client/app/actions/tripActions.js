import axios from 'axios';
import { GET_ERRORS, GET_TRIPS, TRIPS_LOADING, DELETE_TRIP, ADD_TRIP, UPDATE_TRIP } from './types';
import { API_URL } from '../config/dbconfig';

export const getTrips = () => dispatch => {
  dispatch(setTripsLoading());
  axios.get(`${API_URL}/api/trips`)
    .then(res => dispatch({
      type: GET_TRIPS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const addTrip = (trip) => dispatch => {
  axios.post(`${API_URL}/api/trips`, trip)
    .then(res => dispatch({
      type: ADD_TRIP,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response
    }))
  
}

export const updateTrip = (trip) => dispatch => {
  axios.post(`${API_URL}/api/trips`, trip)
    .then(res => dispatch({
      type: UPDATE_TRIP,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const updateTripCollaborators = (trip) => dispatch => {
  axios.post(`${API_URL}/api/trips`, trip)
    .then(
      setTimeout(() => {
        dispatch(getTrips())
      }, 4000))
    .catch(err => console.log(err))
}

export const deleteTrip = (id) => dispatch => {
  axios.delete(`${API_URL}/api/trips/${id}`)
  .then(res => 
      dispatch({
          type: DELETE_TRIP,
          payload: id
      })
  )
}

export const setTripsLoading = () => {
  return {
    type: TRIPS_LOADING
  }
}