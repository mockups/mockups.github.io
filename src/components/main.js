'use strict';

import Paths from '../constants/Paths';

// Core
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;

// CSS
require('normalize.css');
require('../styles/common.scss');

// Views
var MockupsApp = require('./App/App');
var Loading = require('./Loading/Loading');
var DropboxLogin = require('./DropboxLogin/DropboxLogin');
var OauthReciever = require('./OauthReciever/OauthReciever');
var InitialSetup = require('./InitialSetup/InitialSetup');
var MockupList = require('./MockupList/MockupList');
var FileList = require('./FileList/FileList');

var Routes = (
  <Route handler={MockupsApp}>
    <Route name="dropbox-auth" path={Paths.LOGIN} handler={DropboxLogin} />
    <Route name="oauth-reciever" path={Paths.OAUTH_RECIEVER} handler={OauthReciever} />
    <Route name="initial-setup" path={Paths.INITIAL_SETUP} handler={InitialSetup}  />
    <Route name="mockup-list" path={Paths.MOCKUP_LIST} handler={MockupList} />
    <Route name="file-list" path={Paths.FILE_LIST} handler={FileList} />
    <NotFoundRoute handler={DropboxLogin} />
  </Route>
);

Router.run(Routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById("content"));
});
