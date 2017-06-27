import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Dimmer,
  Grid,
  Icon,
  Loader,
  Popup,
  Table
} from 'semantic-ui-react';
import {
  createService,
  fetchServices
} from '../../actions/ServiceDetailsActions';

class ServiceDetails extends Component {
  state = {
    dim             : true,
    selectedService : ''
  };

  handleClick( item ) {
    this.setState( {
      selectedService : item
    } );
  }

  renderServicesTable() {
    return (
      <Table selectable
             columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Service Name</Table.HeaderCell>
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

  renderServices() {
    return _.map( this.props.services.serviceDetailsData.services, service => {
      return (
        <Table.Row key={service.id}
                   onClick={() => this.handleClick( service.serviceName )}
                   className={this.state.selectedService === service.serviceName ? 'selected' : ''}>
          <Table.Cell className='seven wide'>{service.serviceName}</Table.Cell>
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

  renderServiceConfigurationTable() {
    return (
      <Table columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className='seven wide'>Service
              Configuration</Table.HeaderCell>
            <Table.HeaderCell className='nine wide'></Table.HeaderCell>
            <Table.HeaderCell className='one wide'><Icon name='pencil'/>
            </Table.HeaderCell>
            <Table.HeaderCell className='one wide'><Icon name='trash'/></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell><b>Service Name</b></Table.Cell>
            <Table.Cell>None</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><b>Storage Bucket</b></Table.Cell>
            <Table.Cell>None</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell><b>Source File Key</b></Table.Cell>
            <Table.Cell>deploy/web/wars/notification.war</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  renderServiceProperties() {
    return _.map( this.props.services.serviceDetailsData, service => {
      return (
        <Table.Row key={service.id}>
          <Table.Cell className='seven wide'>{service.serviceName}</Table.Cell>
          <Table.Cell className='seven wide'>{service.serviceName}</Table.Cell>
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
      <Table columns={4}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Property Name</Table.HeaderCell>
            <Table.HeaderCell>Property Value</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderServiceProperties()}
        </Table.Body>
      </Table>
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
          <Grid columns={2}>
            <Grid.Row stretched>
              <Grid.Column width={4}>
                {this.renderServicesTable()}
              </Grid.Column>
              <Grid.Column width={12}>
                {this.renderServiceConfigurationTable()}
                {this.renderServicePropertiesTable()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return { services : state.serviceDetailsReducer };
}
export default connect( mapStateToProps, {
  fetchServices,
  createService
} )( ServiceDetails );