'use strict';

// Dropbox authentication works only over https
if (window.location.hostname !== "localhost" && window.location.protocol !== "https:") {
  window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

// Core
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;
var AppActions = require('../actions/AppActionCreators');
var Paths = require('../constants/Paths');

// CSS
require('normalize.css');
require('../styles/common.scss');

// Views
var MockupsApp = require('./App/App');
var WelcomePage = require('./WelcomePage/WelcomePage');
var OauthReciever = require('./OauthReciever/OauthReciever');
var InitialSetup = require('./InitialSetup/InitialSetup');
var MockupList = require('./MockupList/MockupList');
var MockupEdit = require('./MockupEdit/MockupEdit');

var Routes = (
  <Route handler={MockupsApp}>
    <Route name="dropbox-auth" path={Paths.LOGIN} handler={WelcomePage} />
    <Route name="oauth-reciever" path={Paths.OAUTH_RECIEVER} handler={OauthReciever} />
    <Route name="initial-setup" path={Paths.INITIAL_SETUP} handler={InitialSetup}  />
    <Route name="mockup-list" path={Paths.MOCKUP_LIST} handler={MockupList} />
    <Route name="mockup-edit" path={Paths.MOCKUP_LIST + "/:mockupId"} handler={MockupEdit} />
    <Route path="/:params" handler={OauthReciever} />
    <NotFoundRoute handler={WelcomePage} />
  </Route>
);

Router.run(Routes, function (Handler, state) {
  React.render(<Handler/>, document.getElementById("content"));
  AppActions.transition(state.params);
});
