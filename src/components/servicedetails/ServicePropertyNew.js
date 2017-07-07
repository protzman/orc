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
import { addComplete } from '../../actions/NavbarActions';
import { createServiceProperty } from '../../actions/ServiceDetailsActions';

class ServicePropertyNew extends Component {
  // TODO: Could probably re-use the new cloud property template. Learn how
  // to be more generic
  constructor( props ) {
    super( props );
    this.state = {
      cloudPropKeys : null,
      loading       : true
    }
  }

  componentWillMount() {
    this.fetchServiceKeys();
  }

  fetchServiceKeys() {
    const ROOT_URL     = 'http://localhost:8080/orchestration/service/rest';
    const VARIABLE_URL = '/services/properties/keys';
    this.setState( { loading : true }, () => {
      axios.get( `${ROOT_URL}${VARIABLE_URL}` )
        .then( ( response ) => {
          let modifiedKeys = _.map( response.data, function ( key, value ) {
            return { 'key' : value, 'text' : key, 'value' : key };
          } );
          this.setState( { loading : false, servicePropKeys : modifiedKeys } )
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
          <Form.Input {...field.input}
                      label={field.label}
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
    values = { ...values, serviceName : this.props.activeService };
    this.props.createServiceProperty( values );
    this.props.addComplete();
    this.props.history.push( '/servicedetails' );
  }

  cancelButton() {
    this.props.addComplete();
    this.props.history.goBack();
  }

  render() {
    const { handleSubmit } = this.props;
    //TODO: Go back and change <input> to Form.Input and remove the <label>
    // to label={field.label}
    return (
      <div className="component">
        <Container>
          <Segment>
            <Form className='field'
                  onSubmit={handleSubmit( ( values ) => this.onSubmit( values ) )}>
              <h3>Create New Service Property</h3>
              <Field name='propertyName'
                     label='Property Name'
                     options={_.toArray( this.state.servicePropKeys )}
                     component={this.renderSelectField}/>
              <Field name='propertyValue'
                     label='Property Value'
                     component={this.renderInputField}/>
              <Button color='red'
                      onClick={() => this.cancelButton()}
                      inverted>Cancel</Button>
              <Button color='teal'
                      type='submit'>Submit</Button>
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
  return { activeService : state.serviceDetailsReducer.serviceConfigObject.serviceName };
}

function mapDispatchToProps( dispatch ) {
  return {
    addComplete           : function () {
      dispatch( addComplete() )
    },
    createServiceProperty : function ( values ) {
      dispatch( createServiceProperty( values ) )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewCloudPropertyForm'
} )( connect( mapStateToProps, mapDispatchToProps )( ServicePropertyNew ) );