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
import { fetchServiceRegistrations } from '../../actions/ServiceRegistrationSummaryActions';

class ServiceRegistrationSummary extends Component {
  state = {
    dim : true
    //modalOpen : false
  };

  renderServiceRegistrations() {
    return _.map( this.props.registrations.serviceRegistrationSummaryData, registration => {
      console.log( registration );
      return (
        <Table.Row key={registration.serviceName}>
          <Table.Cell className='five wide'>{registration.serviceName}</Table.Cell>
          <Table.Cell className='nine wide'>{registration.uri}</Table.Cell>
          <Table.Cell className='one wide'>
            <Popup
              inverted
              trigger={
                <Icon link
                      name='pencil'
                      onClick={() => this.editServiceRegistration( registration )}/>
              }
              content='edit service registration'
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
                      onClick={() => this.deleteServiceRegistration( registration )}/>
              }
              content='delete service registration'
              position='top right'
              offset={5}
              size='mini'
            />
          </Table.Cell>
        </Table.Row>
      );
    } );
  }

  editServiceRegistration( values ) {

  }

  deleteServiceRegistration( values ) {

  }

  componentWillMount() {
    if ( ! this.props.serviceRegistrationSummaryData ) {
      this.setState( { dim : true } );
    }
  }

  componentDidMount() {
    this.props.fetchServiceRegistrations()
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
          <Table columns={4}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Service Name</Table.HeaderCell>
                <Table.HeaderCell>URI</Table.HeaderCell>
                <Table.HeaderCell>
                </Table.HeaderCell>
                <Table.HeaderCell>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderServiceRegistrations()}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return { registrations : state.serviceRegistrationSummaryReducer };
}
export default connect( mapStateToProps, { fetchServiceRegistrations } )( ServiceRegistrationSummary );