import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { addNewObject } from '../actions/NavbarActions';

class Navbar extends Component {

  state = {
    activeItem : 'Cloud Properties',
    addNew     : false
  };

  componentWillReceiveProps( nextProps ) {
    console.log( nextProps );
    this.setState( { addNew : nextProps.add } )
  }

  handleItemClick = ( e, { name } ) => this.setState( {
    activeItem : name,
    addNew     : false
  } );

  createNew() {
    this.props.toggleAddNew();
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
                        disabled={this.props.navbar.addNew}
                        content='Add'
                        icon='plus'
                        color='teal'
                        onClick={ () => this.createNew()}/>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    toggleAddNew : function () {
      dispatch( addNewObject() )
    }
  }
}

function mapStateToProps( { navbar } ) {
  return { navbar : navbar };
}

export default connect( mapStateToProps, mapDispatchToProps )( Navbar );