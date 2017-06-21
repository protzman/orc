import { FETCH_CP_KEYS, FETCH_CPS } from '../actions/CloudPropertiesActions';
import _ from 'lodash';

export default function ( state = {}, action ) {
  switch ( action.type ) {
    case FETCH_CPS:
      return action.payload.data;
    case FETCH_CP_KEYS:
      return _.map( action.payload.data, function ( key, value ) {
        return { 'key' : value, 'text' : key, 'value' : key };
      } );
    default:
      return state;
  }
}