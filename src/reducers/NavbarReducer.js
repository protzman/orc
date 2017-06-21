import { ADD_NEW } from '../actions/NavbarActions';

export default function ( state = {}, action ) {
  switch ( action.type ) {
    case ADD_NEW:
      return {
        ...state,
        addNew : false
      };
    default:
      return state;
  }
}