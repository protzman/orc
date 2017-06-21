export const ADD_NEW = 'add_new';

export function addNewObject( state = {} ) {
  return ({
    ...state,
    type : ADD_NEW
  });
}