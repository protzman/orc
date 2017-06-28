import axios from 'axios';
import _ from 'lodash';

export const POST_CP       = 'post_cloud_property';
export const SET_CP       = 'set_cloud_property';
export const FETCH_CPS     = 'fetch_cloud_properties';
export const FETCH_CP_KEYS = 'fetch_cloud_property_keys';
export const DELETE_CP     = 'delete_cloud_property';

const ROOT_URL = 'http://localhost:8080/orchestration/service/rest';

export function createCloudProperty( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/cloud/property';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        let newData = getState().cloudPropertyReducer.cloudPropertiesData;
        newData.push( response.data );
        dispatch( { type : POST_CP, payload : newData } );
      } )
      .catch( () => {
        //dispatch error
      } );
  }
}

export function editCloudProperty( values ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/cloud/property';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        let newData = getState().cloudPropertyReducer.cloudPropertiesData;
        newData.push( response.data );
        dispatch( { type : POST_CP, payload : newData } );
      } )
      .catch( () => {
        //dispatch error
      } );
  }
}

export function deleteCloudProperty( value ) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/cloud/property';
    return axios.delete( `${ROOT_URL}${VARIABLE_URL}/${value}` )
      .then( ( response ) => {
        let newData = _.reject( getState().cloudPropertyReducer.cloudPropertiesData, { 'propertyName' : value } );
        dispatch( { type : DELETE_CP, payload : newData } );
      } )
      .catch( () => {
        //dispatch error
      } );

  }
}

export function fetchCloudProperties() {
  return ( dispatch, getState ) => {

    const VARIABLE_URL = '/cloud/properties';
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : FETCH_CPS, payload : response.data } );
      } )
      .catch( ( errors ) => {
        //dispatch or handle error message
      } );
  }
}

export function fetchCloudPropertyKeys() {
  return ( dispatch, getState ) => {

    const VARIABLE_URL = '/cloud/properties/keys';
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch( { type : FETCH_CP_KEYS, payload : response } );
      } )
      .catch( ( errors ) => {
        //dispatch or handle error message
      } );

  }
}

export function setActiveCloudProperty(cloudObject) {
  return {type: SET_CP, cloudObject : cloudObject}
}