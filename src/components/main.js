'use strict';

// Core
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

// CSS
require('normalize.css');
require('../styles/common.scss');

// Views
var MockupsApp = require('./App/App');
var DropboxLogin = require('./DropboxLogin/DropboxLogin');

var Routes = (
  <Route handler={MockupsApp}>
    <Route name="dropbox-auth" path="dropbox-auth" handler={DropboxLogin} />
    <Redirect from="*" to="/" />
  </Route>
);

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
