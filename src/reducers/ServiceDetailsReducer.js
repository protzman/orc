import {
  DELETE_S,
  DELETE_SC,
  DELETE_SP,
  FETCH_S,
  FETCH_SC,
  FETCH_SP,
  POST_S,
  POST_SC,
  POST_SP,
  SET_S,
  UPDATE_SC
} from '../actions/ServiceDetailsActions';

export default function ( state = {
  serviceDetailsData : {
    services      : {},
    configuration : {},
    properties    : {}
  }
}, action ) {
  switch ( action.type ) {
    case DELETE_S:
      return {
        ...state,
        serviceDetailsData : { services : action.payload }
      };
    case DELETE_SC:
      return {
        ...state,
        serviceDetailsData : action.payload
      };
    case DELETE_SP:
      return {
        ...state,
        serviceDetailsData : action.payload
      };
    case FETCH_S:
      return {
        ...state,
        serviceDetailsData : {
          ...state.serviceDetailsData,
          services : action.payload
        }
      };
    case FETCH_SC:
      return {
        ...state,
        serviceDetailsData : {
          ...state.serviceDetailsData,
          configuration : action.payload
        }
      };
    case FETCH_SP:
      return {
        ...state,
        serviceDetailsData : {
          ...state.serviceDetailsData,
          properties : action.payload
        }
      };
    case POST_S:
      return {
        ...state,
        serviceDetailsData : { services : action.payload }
      };
    case POST_SC:
      return {
        ...state,
        serviceDetailsData : action.payload
      };
    case POST_SP:
      return {
        ...state,
        serviceDetailsData : action.payload
      };
    case SET_S:
      return {
        ...state,
        serviceConfigObject : action.serviceConfigObject
      };
    case UPDATE_SC:
      return {
        ...state, serviceDetailsData : {
          ...state.serviceDetailsData,
          configuration : action.payload
        }
      };
    default:
      return state;
  }
}