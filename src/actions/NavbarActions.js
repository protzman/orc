export const ADD_NEW      = 'add_new';
export const ADD_COMPLETE = 'add_complete';

export function addNewObject( state = {} ) {
  return ({
    ...state,
    type : ADD_NEW
  });
}
export function addComplete( state = {} ) {
  return ({
    ...state,
    type : ADD_COMPLETE
  });
}