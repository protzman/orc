import axios from 'axios';

export const POST_CP       = 'post_cloud_property';
export const FETCH_CPS     = 'fetch_cloud_properties';
export const FETCH_CP_KEYS = 'fetch_cloud_property_keys';

const ROOT_URL = 'http://localhost:8080/orchestration/service/rest';


export function postCP(values) {
  return ( dispatch, getState ) => {
    const VARIABLE_URL = '/cloud/property';
    axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        console.log( 'Create Cloud Props Response', response );
        const newCpData = getState().cloudPropertiesReducer.cloudPropertiesData;
        newCpData.push( response.data );

        dispatch ( { type : POST_CP, payload : newCpData } );
      } )
      .catch( () => {
        //dispatch error
      } );
  }
}

export function createCloudProperty( values ) {
  return (dispatch, getState) => {
    const VARIABLE_URL = '/cloud/property';
    return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
      .then( ( response ) => {
        console.log( 'Create Cloud Props Response', response );
        let newData = getState().cloudPropertiesReducer.cloudPropertiesData;
        newData.push(response.data);
        dispatch ( { type : POST_CP, payload : newData} );
      } )
      .catch( () => {
        //dispatch error
      } );

  }

}

export function fetchCloudProperties() {
  return (dispatch, getState) => {

    const VARIABLE_URL = '/cloud/properties';
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then( ( response ) => {
        dispatch ({ type : FETCH_CPS, payload : response.data });
      } )
      .catch( ( errors ) => {
        //dispatch or handle error message
      } );
  }
}

export function fetchCloudPropertyKeys() {
  return (dispatch, getState) => {
    const VARIABLE_URL = '/cloud/properties/keys';
    return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
      .then ((response) => {
        dispatch ({
          type    : FETCH_CP_KEYS,
          payload : response
        });
      })


  }

}