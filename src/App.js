import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CloudProperties from './components/cloudproperties/CloudProperties';
import CloudPropertiesEdit from './components/cloudproperties/CloudPropertiesEdit';
import CloudPropertiesNew from './components/cloudproperties/CloudPropertiesNew';
import Navbar from './components/Navbar';
import ServiceConfigEdit from './components/servicedetails/ServiceConfigEdit';
import ServiceDetails from './components/servicedetails/ServiceDetails';
import ServiceDetailsNew from './components/servicedetails/ServiceDetailsNew';
import ServicePropertyNew from './components/servicedetails/ServicePropertyNew';
import ServiceRegistrationSummary from './components/serviceregistrationsummary/ServiceRegistrationSummary';
import ServiceRegistrationSummaryEdit from './components/serviceregistrationsummary/ServiceRegistrationSummaryEdit';
import ServiceRegistrationSummaryNew from './components/serviceregistrationsummary/ServiceRegistrationSummaryNew';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/"
               component={Navbar}/>
        <Route path="/cloudproperties/new"
               exact
               component={CloudPropertiesNew}/>
        <Route path="/cloudproperties/:id/edit"
               exact
               component={CloudPropertiesEdit}/>
        <Route path="/cloudproperties"
               exact
               component={CloudProperties}/>
        <Route path="/servicedetails/new"
               exact
               component={ServiceDetailsNew}/>
        <Route path="/servicedetails/:id/property/new"
               exact
               component={ServicePropertyNew}/>
        <Route path="/servicedetails/:id/config/edit"
               exact
               component={ServiceConfigEdit}/>
        <Route path="/servicedetails"
               exact
               component={ServiceDetails}/>
        <Route path="/serviceregistrationsummary/new"
               exact
               component={ServiceRegistrationSummaryNew}/>
        <Route path="/serviceregistrationsummary/:id/edit"
               exact
               component={ServiceRegistrationSummaryEdit}/>
        <Route path="/serviceregistrationsummary"
               exact
               component={ServiceRegistrationSummary}/>
      </div>
    );
  }
}

export default App;
