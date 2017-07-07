import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Dimmer,
  Dropdown,
  Icon,
  Loader,
  Popup,
  Segment,
  Table
} from 'semantic-ui-react';
import {
  createService,
  deleteService,
  fetchServiceConfiguration,
  fetchServiceProperties,
  fetchServices,
  setActiveService
} from '../../actions/ServiceDetailsActions';

class ServiceDetails extends Component {
  state = {
    dim             : true,
    selectedService : ''
  };

  renderServicesTable() {
    return (
      <Table basic='very'
             columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
            <Table.HeaderCell>Storage Bucket</Table.HeaderCell>
            <Table.HeaderCell>Source File Key</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderServices()}
        </Table.Body>
      </Table>
    );
  }

  deleteService() {
    //TODO need to use something other than the servicename coming from
    // config for bad entries it wont have the .configuration data
    this.props.deleteService( this.props.serviceData.configuration.serviceName );
  }

  fetchServiceDetails( value ) {
    this.props.fetchServiceConfiguration( value );
    this.props.fetchServiceProperties( value );
  }

  createServiceProperty() {
    console.log('in service prop');
    let config = this.props.serviceData.configuration;
    this.props.setActiveService( config );
    const location = this.props.location.pathname;
    this.props.history.push( `${location}/${config.serviceName.toLowerCase()}/property/new` );
  }

  editServiceConfiguration() {
    let config = this.props.serviceData.configuration;
    this.props.setActiveService( config );
    const location = this.props.location.pathname;
    this.props.history.push( `${location}/${config.serviceName.toLowerCase()}/config/edit` );
  }

  renderServices() {
    let modifiedServices = _.toArray(
      _.map( this.props.serviceData.services,
        function ( key, value ) {
          return {
            'key'   : value,
            'text'  : key.serviceName,
            'value' : key.serviceName
          };
        } ) );

    let bucket  = '';
    let srcFile = '';
    if ( this.props.serviceData.configuration ) {
      bucket  = this.props.serviceData.configuration.storageBucket;
      srcFile = this.props.serviceData.configuration.srcFileKey;
    }
    else {
      bucket  = '...';
      srcFile = '...';
    }

    return (
      <Table.Row>
        <Table.Cell className='four wide'>
          <Dropdown className='selection'
                    placeholder='Select Service'
                    search
                    fluid
                    options={modifiedServices}
                    onChange={( e, { value } ) => this.fetchServiceDetails( value )}/>
        </Table.Cell>
        <Table.Cell className='four wide'>{bucket}</Table.Cell>
        <Table.Cell className='six wide'>{srcFile}</Table.Cell>
        <Table.Cell className='one wide'>
          <Popup
            inverted
            trigger={
              <Icon link
                    name='pencil'
                    onClick={() => this.editServiceConfiguration()}/>
            }
            content='edit service config'
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
                    onClick={() => this.deleteService()}/>
            }
            content='delete service'
            position='top right'
            offset={5}
            size='mini'
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  renderServiceProperties() {
    return _.map( this.props.serviceData.properties, service => {
      return (
        <Table.Row key={service.id}>
          <Table.Cell className='seven wide'>{service.propertyName}</Table.Cell>
          <Table.Cell className='seven wide'>{service.propertyValue}</Table.Cell>
          <Table.Cell className='one wide'>
            <Popup
              inverted
              trigger={
                <Icon link
                      name='pencil'/>
              }
              content='edit service'
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
                      name='trash'/>
              }
              content='delete service'
              position='top right'
              offset={5}
              size='mini'
            />
          </Table.Cell>
        </Table.Row>
      );
    } );
  }

  renderServicePropertiesTable() {
    return (
      <Segment>
        <Table basic='very'
               columns={4}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Property Name</Table.HeaderCell>
              <Table.HeaderCell>Property Value</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderServiceProperties()}
          </Table.Body>
        </Table>
      </Segment>
    );
  }

  componentWillMount() {
    if ( ! this.props.services ) {
      this.setState( { dim : true } );
    }
  }

  componentDidMount() {
    this.props.fetchServices()
      .then( () => this.setState( { dim : false } ) );
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
            {this.renderServicesTable()}
          </Segment>
          {! _.isEmpty( this.props.serviceData.properties ) ? this.renderServicePropertiesTable() : ''}
          <Button basic
                  color='teal'
                  content='Property'
                  icon='plus'
                  floated='right'
                  onClick={() => this.createServiceProperty()}></Button>
        </Container>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    serviceData   : state.serviceDetailsReducer.serviceDetailsData,
    activeService : state.serviceDetailsReducer.service
  };
}
export default connect( mapStateToProps, {
  fetchServices,
  createService,
  deleteService,
  fetchServiceConfiguration,
  fetchServiceProperties,
  setActiveService
} )( ServiceDetails );