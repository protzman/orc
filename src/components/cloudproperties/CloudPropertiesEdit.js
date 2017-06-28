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
import { editCloudProperty } from '../../actions/CloudPropertiesActions';
import { addComplete } from '../../actions/NavbarActions';

class CloudPropertiesEdit extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      cloudPropKeys : null,
      loading       : true
    }

  }

  componentWillMount() {
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

  onSubmit( values ) {
    console.log( 'Values', values );
    this.props.editCloudProperty( values );
    /*
     TODO: Review whether we want to disable or enable the add button while
     a user is in edit mode
     */
    //this.props.addComplete();
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
              <h3>Edit Cloud Property</h3>
              <Field name='propertyName'
                     label='Property Name'
                     defaultValue={this.props.activeCloudProperty.propertyName}
                     component={this.renderInputField}/>
              <Field name='propertyValue'
                     label='Property Value'
                     component={this.renderInputField}/>
              <Button type='submit'>Edit</Button>
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
  return {
    activeCloudProperty : state.cloudPropertyReducer
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    addComplete       : function () {
      dispatch( addComplete() )
    },
    editCloudProperty : function () {
      dispatch( editCloudProperty() )
    }
  }
}
export default reduxForm( {
  validate,
  form : 'NewCloudPropertyForm'
} )( connect( mapStateToProps, mapDispatchToProps )( CloudPropertiesEdit ) );