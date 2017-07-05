import {
  DELETE_SR,
  FETCH_SR,
  POST_SR,
  SET_SR
} from '../actions/ServiceRegistrationSummaryActions';

export default function ( state = {}, action ) {
  switch ( action.type ) {
    case FETCH_SR:
      return { ...state, serviceRegistrationSummaryData : action.payload };
    case POST_SR:
      return { ...state, serviceRegistrationSummaryData : action.payload };
    case DELETE_SR:
      return { ...state, serviceRegistrationSummaryData : action.payload };
    case SET_SR:
      return { ...state, serviceRegistrationObject : action.serviceRegistrationObject };
    default:
      return state;
  }
}