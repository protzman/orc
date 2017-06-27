import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment
} from 'semantic-ui-react';
import {
  createCloudProperty,
  fetchCloudPropertyKeys
} from '../../actions/CloudPropertiesActions';
import { addComplete } from '../../actions/NavbarActions';

class CloudPropertiesNew extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      cloudPropKeys : null,
      loading       : true
    }

  }

  componentWillMount() {
    this.fetchCloudKeys();
  }

  fetchCloudKeys() {
    const ROOT_URL     = 'http://localhost:8080/orchestration/service/rest';
    const VARIABLE_URL = '/cloud/properties/keys';
    this.setState( { loading : true }, () => {
      axios.get( `${ROOT_URL}${VARIABLE_URL}` )
        .then( ( response ) => {
          let modifiedKeys = _.map( response.data, function ( key, value ) {
            return { 'key' : value, 'text' : key, 'value' : key };
          } );
          this.setState( { loding : false, cloudPropKeys : modifiedKeys } )
        } )
        .catch( ( errors ) => {
          //dispatch or handle error message
        } );
    } );
  }

  renderInputField( field ) {
    const { meta : { touched, error } } = field;
    const className                     = `${touched && error ? 'error' : ''}`;
    return (
      <div className={className}>
        <Form.Field className='field'>
          <label >{field.label}</label>
          <input {...field.input}
                 placeholder={field.label}/>
          { touched && error &&
          <Message className="text-help"
                   size="tiny"
                   negative>
            <h4><Icon name='warning'/>{ error }</h4>
          </Message> }
        </Form.Field>
      </div>
    );
  }

  renderSelectField( field ) {
    const { meta : { touched, error } } = field;
    const className                     = `form-group ${touched && error ? 'error' : ''}`;
    return (
      <div className={className}>
        <Form.Select {...field.input}
                     className='field'
                     label={field.label}
                     options={field.options}
                     placeholder={field.label}
                     onChange={( e, { value } ) => field.input.onChange( value )}/>
      </div>
    )
  }

  onSubmit( values ) {
    console.log( 'Values', values );
    this.props.createCloudProperty( values );
    this.props.addComplete();
    this.props.history.push( '/cloudproperties' );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="component">
        <Container>
          <Segment>
            <Form className='field'
                  onSubmit={handleSubmit( ( values ) => this.onSubmit( values ) )}>
              <h3>Create New Cloud Property</h3>
              <Field name='propertyName'
                     label='Property Name'
                     options={_.toArray( this.state.cloudPropKeys )}
                     component={this.renderSelectField}/>
              <Field name='propertyValue'
                     label='Property Value'
                     component={this.renderInputField}/>
              <Button type='submit'>Submit</Button>
            </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}
function validate( values ) {
  const errors = {};

  if ( ! values.propertyName ) {
    errors.propertyName = 'Enter a Property';
  }
  if ( ! values.propertyValue ) {
    errors.propertyValue = 'Enter a Value'
  }

  return errors;
}

function mapStateToProps( state ) {
  return { cloudPropertyKeys : state.cloudPropertyReducer };
}

function mapDispatchToProps( dispatch ) {
  return {
    addComplete         : function () {
      dispatch( addComplete() )
    },
    createCloudProperty : function ( values ) {
      dispatch( createCloudProperty( values ) )
    },
    fetchCloudPropKeys  : function () {
      dispatch( fetchCloudPropertyKeys() )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewCloudPropertyForm'
} )( connect( mapStateToProps, mapDispatchToProps )( CloudPropertiesNew ) );