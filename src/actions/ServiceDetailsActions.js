import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'http://localhost:8080/orchestration/service/rest';

export const FETCH_S  = 'fetch_services';
export const POST_S   = 'post_service';
export const DELETE_S = 'delete_service';
export const SET_S    = 'set_active_service';

export const FETCH_SC  = 'fetch_service_configuration';
export const POST_SC   = 'post_service_configuration';
export const DELETE_SC = 'delete_service_configuration';

export const FETCH_SP  = 'fetch_service_properties';
export const POST_SP   = 'fetch_service_property';
export const DELETE_SP = 'delete_service_property';

export function fetchServices() {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/services';
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : FETCH_S, payload : response.data } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}

export function createService( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/service';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        let newData = getState().serviceDetailsReducer.serviceDetailsData.services;
        newData.push( response.data );
        dispatch( { type : POST_S, payload : newData } );
      } )
      .catch( () => {
        // dispatch error
      } );
  }
}

export function deleteService( service ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = `/${service}`;
    return axios.delete( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        console.log( 'service: ', service );
        let newData = _.reject( getState().serviceDetailsReducer.serviceDetailsData.services, { 'serviceName' : service } );
        console.log( newData );
        dispatch( { type : DELETE_S, payload : newData } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}

export function setActiveService( service ) {
  return {
    type    : SET_S,
    service : service
  }
}

export function fetchServiceConfiguration( service ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = `/${service}/configuration`;
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : FETCH_S, payload : response.data } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}
export function createServiceConfiguration( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/configuration';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        let newData = getState().serviceDetailsReducer.serviceDetailsData;
        newData.push( response.data );
        dispatch( { type : POST_SC, payload : newData } );
      } )
      .catch( () => {
        // dispatch error
      } );
  }
}

export function deleteServiceConfiguration( service ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = `/${service}/configuration`;
    return axios.delete( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : DELETE_SC, payload : response.data } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}

export function fetchServiceProperties( service ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = `/${service}/properties`;
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : FETCH_S, payload : response.data } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}

export function createServiceProperty( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/property';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        let newData = getState().serviceDetailsReducer.serviceDetailsData;
        newData.push( response.data );
        dispatch( { type : POST_SP, payload : newData } );
      } )
      .catch( () => {
        // dispatch error
      } );
  }
}

export function deleteServiceProperty( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = `/service/${values.service}/property/${values.property}}`;
    return axios.delete( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : DELETE_SP, payload : response.data } );
      } )
      .catch( ( errors ) => {
        // dispatch error
      } );
  }
}