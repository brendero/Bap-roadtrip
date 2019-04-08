import axios from 'axios';
import { GET_ERRORS, GET_TRIPS, TRIPS_LOADING, DELETE_TRIP, ADD_TRIP, UPDATE_TRIP } from './types';

export const getTrips = () => dispatch => {
  dispatch(setTripsLoading());
  axios.get('http://192.168.1.42:5000/api/trips')
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
  axios.post('http://192.168.1.42:5000/api/trips', trip)
    .then(res => dispatch({
      type: ADD_TRIP,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
  
}

export const updateTrip = (trip) => dispatch => {
  axios.post('http://192.168.1.42:5000/api/trips', trip)
    .then(res => dispatch({
      type: UPDATE_TRIP,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const updateTripCollaborators = (trip) => dispatch => {
  axios.post('http://192.168.1.42:5000/api/trips', trip)
    .then(
      setTimeout(() => {
        dispatch(getTrips())
      }, 4000))
    .catch(err => console.log(err))
}

export const deleteTrip = (id) => dispatch => {
  axios.delete(`http://192.168.1.42:5000/api/trips/${id}`)
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