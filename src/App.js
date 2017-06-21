import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
import CloudProperties from './components/CloudProperties';
import CloudPropertiesNew from './components/CloudPropertiesNew';
import ServiceDetails from './components/ServiceDetails';
import ServiceRegistrationSummary from './components/ServiceRegistrationSumary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/"
               component={Navbar}/>
        <Route path="/cloudproperties/new"
               exact
               component={CloudPropertiesNew}/>
        <Route path="/cloudproperties"
               exact
               component={CloudProperties}/>
        <Route path="/servicedetails"
               exact
               component={ServiceDetails}/>
        <Route path="/serviceregistrationsummary"
               exact
               component={ServiceRegistrationSummary}/>
      </div>
    );
  }
}

export default App;
