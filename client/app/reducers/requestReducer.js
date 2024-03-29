import { REQUESTS_LOADING, GET_REQUEST, ADD_REQUEST, DELETE_REQUEST } from "../actions/types";

const initialState = {
  isLoading: false,
  requests: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case REQUESTS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_REQUEST:
      return {
        ...state,
        isLoading: false,
        requests: action.payload
      }
    case ADD_REQUEST:
      return {
        ...state,
        requests: [action.payload, ...state.requests]
      }
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(request => request._id !== action.payload)
      }
    default:
      return state;
  }
}