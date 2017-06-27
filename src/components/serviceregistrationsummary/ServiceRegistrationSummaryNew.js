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
import { createServiceRegistration } from '../../actions/ServiceRegistrationSummaryActions';

class ServiceRegistrationSummaryNew extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      loading : true
    }
  }

  renderInputField( field ) {
    const { meta : { touched, error } } = field;
    const className                     = `form-group ${touched && error ? 'error' : ''}`;
    return (
      <div className={className}>
        <Form.Field className='field'>
          <label>{field.label}</label>
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

  onSubmit( values ) {
    this.props.createServiceRegistration( values );
    this.props.addComplete();
    this.props.history.push( '/serviceregistrationsummary' );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="component">
        <Container>
          <Segment>
            <Form className='field'
                  onSubmit={handleSubmit( ( values ) => this.onSubmit( values ) )}>
              <h3>Register a Service</h3>
              <Field name='serviceName'
                     label='Service Name'
                     component={this.renderInputField}/>
              <Field name='uri'
                     label='Service URI'
                     component={this.renderInputField}/>
              <Field name='statusUri'
                     label='Status URI'
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

  if ( ! values.serviceName ) {
    errors.serviceName = 'Enter a Service Name';
  }
  if ( ! values.uri ) {
    errors.uri = 'Enter a Service URI';
  }
  if ( ! values.statusUri ) {
    errors.statusUri = 'Enter a Status URI';
  }
  return errors;
}

function mapStateToProps( state ) {
  return {};
}

function mapDispatchToProps( dispatch ) {
  return {
    addComplete   : function () {
      dispatch( addComplete() )
    },
    createServiceRegistration : function ( values ) {
      dispatch( createServiceRegistration( values ) )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewServiceRegistrationForm'
} )( connect( mapStateToProps, mapDispatchToProps )( ServiceRegistrationSummaryNew ) );