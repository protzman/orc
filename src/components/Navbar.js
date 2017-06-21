import React, { Component } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewObject } from '../actions/NavbarActions';

class Navbar extends Component {

  state = {
    activeItem : 'Cloud Properties',
    addNew     : false
  };

  handleItemClick = ( e, { name } ) => this.setState( {
    activeItem : name,
    addNew     : false
  } );

  createNew() {
    this.props.addNewObject();
    const location = this.props.location.pathname;
    if ( location.split( '/' )[ 2 ] !== 'new' ) {
      this.props.history.push( `${location}/new` );
      this.setState( {
        addNew : true
      } );
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container>
          <Menu secondary
                inverted>
            <Link to='/cloudproperties'>
              <Menu.Item name='Cloud Properties'
                         active={activeItem === 'Cloud Properties'}
                         onClick={this.handleItemClick}
                         color='teal'/>
            </Link>
            <Link to='/servicedetails'>
              <Menu.Item name='Service Details'
                         active={activeItem === 'Service Details'}
                         onClick={this.handleItemClick}
                         color='teal'/>
            </Link>
            <Link to='/serviceregistrationsummary'>
              <Menu.Item name='Service Registration Summary'
                         active={activeItem === 'Service Registration Summary'}
                         onClick={this.handleItemClick}
                         color='teal'/>
            </Link>
            <Menu.Menu position='right'>
              <Menu.Item style={{ 'paddingRight' : 0 }}>
                <Button basic
                        disabled={this.state.addNew}
                        content='Add'
                        icon='plus'
                        color='teal'
                        onClick={ this.createNew.bind( this )}/>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return { navbar : state.navbar };
}
export default connect( mapStateToProps, { addNewObject } )( Navbar );