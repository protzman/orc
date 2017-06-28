import { ADD_NEW, ADD_COMPLETE } from '../actions/NavbarActions';

export default function ( state = { addNew : false }, action ) {
  switch ( action.type ) {
    case ADD_NEW:
      return { ...state, addNew : true };
    case ADD_COMPLETE:
      return { ...state, addNew : false };
    default:
      return state;
  }
}