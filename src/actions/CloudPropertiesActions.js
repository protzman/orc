import axios from 'axios';

export const CREATE_CP     = 'create_cloud_property';
export const FETCH_CPS     = 'fetch_cloud_properties';
export const FETCH_CP_KEYS = 'fetch_cloud_property_keys';

const ROOT_URL = 'http://localhost:8080/orchestration/service/rest';

export function createCloudProperty( values ) {
  const VARIABLE_URL = '/cloud/property';
  const request      = axios.post( `${ROOT_URL}${VARIABLE_URL}`, values );

  return ({
    type    : CREATE_CP,
    payload : request
  });
}

export function fetchCloudProperties() {
  const VARIABLE_URL = '/cloud/properties';
  const request      = axios.get( `${ROOT_URL}${VARIABLE_URL}` );

  return ({
    type    : FETCH_CPS,
    payload : request
  });

}

export function fetchCloudPropertyKeys() {
  const VARIABLE_URL = '/cloud/properties/keys';
  const request      = axios.get( `${ROOT_URL}${VARIABLE_URL}` );

  return ({
    type    : FETCH_CP_KEYS,
    payload : request
  });
}