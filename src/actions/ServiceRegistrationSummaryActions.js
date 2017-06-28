import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'http://localhost:8080/orchestration/service/rest';

export const FETCH_SR  = 'fetch_service_registrations';
export const POST_SR   = 'post_service_registration';
export const DELETE_SR = 'delete_service_registration';

export function fetchServiceRegistrations() {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/registrations';
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : FETCH_SR, payload : response.data } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}

export function createServiceRegistration( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/registration';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        let newData = getState()
          .serviceRegistrationSummaryReducer
          .serviceRegistrationSummaryData;
        newData.push( response.data );
        dispatch( { type : POST_SR, payload : newData } );
      } )
      .catch( () => {
        // dispatch error
      } );
  }
}

export function deleteServiceRegistration( service ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = `/${service}/registration`;
    return axios.delete( `${ROOT_URL}${VARIABLE_URL}`, service )
      .then( ( response ) => {
        let newData = _.reject( getState()
            .serviceRegistrationSummaryReducer
            .serviceRegistrationSummaryData,
          { 'serviceName' : service } );
        console.log( newData );
        dispatch( { type : DELETE_SR, payload : newData } );
      } )
      .catch( () => {
        // dispatch error
      } )
  }
}