import createHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware       = applyMiddleware( thunk );
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
