import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addComplete } from '../actions/NavbarActions';
import {
  createCloudProperty,
  fetchCloudPropertyKeys
} from '../actions/CloudPropertiesActions';
import { Form, Button } from 'semantic-ui-react';

class CloudPropertiesNew extends Component {

  renderInputField( field ) {
    const { meta : { touched, error } } = field;
    const className                     = `form-group ${touched && error ? 'error' : ''}`;
    return (
      <div className={className}>
        <Form.Field className='field'>
          <label>{field.label}</label>
          <input {...field.input}
                 placeholder={field.label}/>
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

  componentDidMount() {
    this.props.fetchCloudPropertyKeys();
  }

  onSubmit( values ) {
    console.log("Values", values);
    this.props.createCloudProperty( values );
    this.props.addComplete();
    this.props.history.push( '/cloudproperties' );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div style={{ 'paddingTop' : '1em' }}>
        <Container>
          <Card fluid={true}>
            <Form className='field'
                  onSubmit={handleSubmit( ( values ) => this.onSubmit( values ) )}>
              <h3>Create New Cloud Property</h3>
              <Field name='propertyName'
                     label='Property Name'
                     options={_.toArray( this.props.cloudPropertyKeys )}
                     component={this.renderSelectField}/>
              <Field name='propertyValue'
                     label='Property Value'
                     component={this.renderInputField}/>
              <Button type='submit'>Submit</Button>
            </Form>
          </Card>
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
    addComplete            : function () {
      dispatch( addComplete() )
    },
    createCloudProperty    : function ( values ) {
      dispatch( createCloudProperty( values ) )
    },
    fetchCloudPropertyKeys : function () {
      dispatch( fetchCloudPropertyKeys() )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewCloudPropertyForm'
} )(
  connect( mapStateToProps, mapDispatchToProps )
  ( CloudPropertiesNew )
)
;