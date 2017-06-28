import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Dimmer,
  Icon,
  Loader,
  Popup,
  Table
} from 'semantic-ui-react';
import {
  deleteCloudProperty,
  fetchCloudProperties,
  setActiveCloudProperty
} from '../../actions/CloudPropertiesActions';

class CloudProperties extends Component {

  state = {
    dim : true
    //modalOpen : false
  };

  renderProperties() {
    return _.map( this.props.cloudProperties.cloudPropertiesData, property => {
      return (
        <Table.Row key={property.propertyName}>
          <Table.Cell className='seven wide'>{property.propertyName}</Table.Cell>
          <Table.Cell className='seven wide'>{property.propertyValue}</Table.Cell>
          <Table.Cell className='one wide'>
            <Popup
              inverted
              trigger={
                <Icon link
                      name='pencil'
                      onClick={() => this.editCloudProperty( property )}/>
              }
              content='edit cloud property'
              position='top right'
              offset={5}
              size='mini'
            />
          </Table.Cell>
          <Table.Cell className='one wide'>
            <Popup
              inverted
              trigger={
                <Icon link
                      name='trash'
                      onClick={() => this.deleteCloudProperty( property )}/>
              }
              content='delete cloud property'
              position='top right'
              offset={5}
              size='mini'
            />
          </Table.Cell>
        </Table.Row>
      );
    } );
  }

  componentWillMount() {
    if ( ! this.props.cloudProperties ) {
      this.setState( { dim : true } );
    }
  }

  componentDidMount() {
    this.props.fetchCloudProperties()
      .then( () => this.setState( { dim : false } ) );
  }

  editCloudProperty( property ) {
    console.log( property );
    this.props.setActiveCloudProperty( property );
    const location = this.props.location.pathname;
    console.log( location );
    this.props.history.push( `${location}/${property.propertyName.toLowerCase()}/edit` );
  }

  deleteCloudProperty( property ) {
    console.log( 'in delete' );
    //this.setState( { modalOpen : true } );
    this.props.deleteCloudProperty( property.propertyName );
  }

  render() {
    return (
      <div className="component">
        <Dimmer active={this.state.dim}
                page>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        {/*
         <Modal basic
         open={this.state.modalOpen}
         onClose={this.handleClose}
         size='small'>
         <Header icon='cloud'
         content='Delete Cloud Property'/>
         <Modal.Content>
         <p>Are you sure you want to delete this cloud property?</p>
         </Modal.Content>
         <Modal.Actions>
         <Button color='teal'
         onClick={this.setState( { modalOpen : false } )}>
         <Icon name='remove'/> No
         </Button>
         <Button color='red'>
         <Icon name='checkmark'/> Yes
         </Button>
         </Modal.Actions>
         </Modal>
         */}
        <Container>
          <Table columns={4}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Cloud Property
                  Name</Table.HeaderCell>
                <Table.HeaderCell>Cloud Property
                  Value</Table.HeaderCell>
                <Table.HeaderCell>
                </Table.HeaderCell>
                <Table.HeaderCell>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderProperties()}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}
//TODO: add dispatch stuff down here
function mapStateToProps( state ) {
  return { cloudProperties : state.cloudPropertyReducer };
}
export default connect( mapStateToProps, {
  fetchCloudProperties,
  deleteCloudProperty,
  setActiveCloudProperty
} )( CloudProperties );