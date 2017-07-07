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
import {
  createService,
  createServiceConfiguration
} from '../../actions/ServiceDetailsActions';

class ServiceConfigEdit extends Component {
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
          <Form.Input {...field.input}
                      placeholder={field.label}
                      readOnly={field.isReadOnly}/>
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
    let service = { serviceName : values.serviceName };

    this.props.createService( {} );
    this.props.createServiceConfiguration( values );
    this.props.addComplete();
    this.props.history.push( '/servicedetails' );
  }

  cancelButton() {
    this.props.addComplete();
    this.props.history.goBack();
  }

  componentDidMount() {
    console.log( 'props' );
    console.log( this.props );
    this.props.initialize( this.props.initialValues );
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
                     component={this.renderInputField}
                     isReadOnly={true}/>
              <Field name='storageBucket'
                     label='Storage Bucket'
                     component={this.renderInputField}
                     isReadOnly={false}/>
              <Field name='srcFileKey'
                     label='Source File Key'
                     component={this.renderInputField}
                     isReadOnly={false}/>
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
  if ( ! values.storageBucket ) {
    errors.storageBucket = 'Enter a Storage Bucket';
  }
  if ( ! values.srcFileKey ) {
    errors.srcFileKey = 'Enter the Source File Key Location';
  }
  return errors;
}

function mapStateToProps( state ) {
  console.log( '!!state' )
  console.log( state )
  return {
    initialValues : state.serviceDetailsReducer.serviceConfigObject
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    addComplete                : function () {
      dispatch( addComplete() )
    },
    createService              : function ( service ) {
      dispatch( createService( service ) )
    },
    createServiceConfiguration : function ( values ) {
      dispatch( createServiceConfiguration( values ) )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewServiceForm'
} )( connect( mapStateToProps, mapDispatchToProps )( ServiceConfigEdit ) );