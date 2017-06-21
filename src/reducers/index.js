import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import CloudPropertiesReducer from './CloudPropertiesReducer';
import NavbarReducer from './NavbarReducer';

const rootReducer = combineReducers( {
  cloudPropertyReducer : CloudPropertiesReducer,
  navbar               : NavbarReducer,
  form                 : FormReducer
} );

export default rootReducer;
