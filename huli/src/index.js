// require('es5-shim');
// require('es5-shim/es5-sham');
// require('core-js');
require('es6-promise').polyfill();
require('console-polyfill');
require('./common/datepicker');

const React = require('react');
const ReactDom = require('react-dom');
const Redux = require('redux');
const ReactRedux = require('react-redux');
var applyMiddleware = Redux.applyMiddleware;
var Provider = ReactRedux.Provider;
const Trunk = require('redux-thunk')['default'];
// var App = require('./containers/App')['default'];
// var App = require('./containers/myaccount/overview')['default'];
// var reducer = require('./reducers')['default'];
var reducer = require('./reducers').rootReducer;
// const Router = require('./components/router/router').RouterLink;
const Router = require('./components/router/routerConfig').RouterLink;

const store = Redux.createStore(reducer, applyMiddleware(Trunk));
ReactDom.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('app')
);
