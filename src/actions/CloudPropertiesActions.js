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
    //fail safe shit
    //return ({type: POST_CP, payload: []})
  }
}

export function createCloudProperty( values ) {
  /*  const VARIABLE_URL = '/cloud/property';
   return axios.post( `${ROOT_URL}${VARIABLE_URL}`, values )
   .then( ( response ) => {
   console.log( 'Create Cloud Props Response', response );

   return ( { type : POST_CP, payload : response.data } );
   } )
   .catch( () => {
   //dispatch error
   } );*/
  const action = postCP(values)
  console.log("RETURNED ACTION: ", action)

}

export function fetchCloudProperties() {
  const VARIABLE_URL = '/cloud/properties';
  return axios.get( `${ROOT_URL}${VARIABLE_URL}` )
    .then( ( response ) => {
      return ({ type : FETCH_CPS, payload : response.data });
    } )
    .catch( ( errors ) => {
      //dispatch or handle error message
    } );

}

export function fetchCloudPropertyKeys() {
  const VARIABLE_URL = '/cloud/properties/keys';
  const request      = axios.get( `${ROOT_URL}${VARIABLE_URL}` );

  return ({
    type    : FETCH_CP_KEYS,
    payload : request
  });
}