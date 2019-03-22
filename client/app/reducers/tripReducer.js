import { GET_TRIPS, TRIPS_LOADING, DELETE_TRIP, ADD_TRIP } from "../actions/types";

const initialState = {
  isLoading: false,
  trips: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TRIPS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_TRIPS:
      return {
        ...state,
        isLoading: false,
        trips: action.payload
      }
    case ADD_TRIP:
      return {
        ...state,
        trips: [action.payload, ...state.trips]
      }
    case DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter(trip => trip._id !== action.payload)
      }
    default:
      return state;
  }
}