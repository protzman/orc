import {
  FETCH_SR,
  POST_SR
} from '../actions/ServiceRegistrationSummaryActions';

export default function ( state = {}, action ) {
  switch ( action.type ) {
    case FETCH_SR:
      return { ...state, serviceRegistrationSummaryData : action.payload };
    case POST_SR:
      return { ...state, serviceRegistrationSummaryData : action.payload };
    default:
      return state;
  }
}