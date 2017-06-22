import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Table } from 'semantic-ui-react';
import { fetchCloudProperties } from '../actions/CloudPropertiesActions';

class CloudProperties extends Component {

  state = {
    dim : true
  };

  renderProperties() {
    return _.map( this.props.cloudProperties.cloudPropertiesData, property => {
      return (
        <Table.Row key={property.propertyName}>
          <Table.Cell>{property.propertyName}</Table.Cell>
          <Table.Cell>{property.propertyValue}</Table.Cell>
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

  render() {
    return (
      <div style={{ 'paddingTop' : '1em' }}>
        <Dimmer active={this.state.dim}
                page>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        <Container>
          <Table celled
                 striped
                 columns={2}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Cloud Property
                  Name</Table.HeaderCell>
                <Table.HeaderCell>Cloud Property
                  Value</Table.HeaderCell>
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

function mapStateToProps( state ) {
  return { cloudProperties : state.cloudPropertyReducer };
}
export default connect( mapStateToProps, { fetchCloudProperties } )( CloudProperties );