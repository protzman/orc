import _ from 'lodash';
import {
  DELETE_CP,
  EDIT_CP,
  FETCH_CP_KEYS,
  FETCH_CPS,
  POST_CP
} from '../actions/CloudPropertiesActions';

export default function ( state = {}, action ) {
  switch ( action.type ) {
    case FETCH_CPS:
      return { ...state, cloudPropertiesData : action.payload };
    case FETCH_CP_KEYS:
      let modifiedKeys = _.map( action.payload.data, function ( key, value ) {
        return { 'key' : value, 'text' : key, 'value' : key };
      } );
      return { ...state, modifiedKeys : modifiedKeys };
    case POST_CP:
      return { ...state, cloudPropertiesData : action.payload };
    case EDIT_CP:
      return { ...state, cloudPropertiesData : action.payload };
    case DELETE_CP:
      return { ...state, cloudPropertiesData : action.payload };
    default:
      return state;
  }
}