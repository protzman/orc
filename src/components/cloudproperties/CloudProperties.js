import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Dimmer,
  Icon,
  Loader,
  Popup,
  Segment,
  Table
} from 'semantic-ui-react';
import {
  deleteCloudProperty,
  fetchCloudProperties,
  setActiveCloudProperty
} from '../../actions/CloudPropertiesActions';

class CloudProperties extends Component {

  state = {
    dim       : true,
    modalOpen : false
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
    this.props.setActiveCloudProperty( property );
    const location = this.props.location.pathname;
    this.props.history.push( `${location}/${property.propertyName.toLowerCase()}/edit` );
  }

  deleteCloudProperty( property ) {
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
        <Container>
          <Segment>
            <Table basic='very'
                   columns={4}>
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
          </Segment>
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