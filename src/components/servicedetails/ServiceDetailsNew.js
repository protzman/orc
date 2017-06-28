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
import { createService } from '../../actions/ServiceDetailsActions';

class ServiceDetailsNew extends Component {
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
    console.log( 'Values', values );
    this.props.createService( values );
    this.props.addComplete();
    this.props.history.push( '/servicedetails' );
  }

  cancelButton() {
    this.props.addComplete();
    this.props.history.goBack();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="component">
        <Container>
          <Segment>
            <Form className='field'
                  onSubmit={handleSubmit( ( values ) => this.onSubmit( values ) )}>
              <h3>Create New Service</h3>
              <Field name='serviceName'
                     label='Service Name'
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

  if ( ! values.serviceName ) {
    errors.serviceName = 'Enter a Service Name';
  }
  return errors;
}

function mapStateToProps( state ) {
  return { cloudPropertyKeys : state.cloudPropertyReducer };
}

function mapDispatchToProps( dispatch ) {
  return {
    addComplete   : function () {
      dispatch( addComplete() )
    },
    createService : function ( values ) {
      dispatch( createService( values ) )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewServiceForm'
} )( connect( mapStateToProps, mapDispatchToProps )( ServiceDetailsNew ) );