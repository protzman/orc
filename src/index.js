import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import  promise from 'redux-promise';
import reducers from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware       = applyMiddleware( thunk);
const enhancer         = composeEnhancers( middleware );
const store            = createStore( reducers, {}, enhancer );

const history = createHistory();

ReactDOM.render( (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById( 'root' ) );
registerServiceWorker();
