import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import CloudPropertiesReducer from './CloudPropertiesReducer';
import NavbarReducer from './NavbarReducer';
import ServiceDetailsReducer from './ServiceDetailsReducer';
import ServiceRegistrationSummaryReducer from './ServiceRegistrationSummaryReducer';

const rootReducer = combineReducers( {
  cloudPropertyReducer              : CloudPropertiesReducer,
  serviceDetailsReducer             : ServiceDetailsReducer,
  serviceRegistrationSummaryReducer : ServiceRegistrationSummaryReducer,
  navbar                            : NavbarReducer,
  form                              : FormReducer
} );

export default rootReducer;
