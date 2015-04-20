'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var DropboxStore = require('../../stores/DropboxStore');

var imageURL = require('../../images/yeoman.png');

// Method to retrieve state from Stores
function getAppState() {
  return {
    logged: DropboxStore.isLogged()
  };
}

var MockupsApp = React.createClass({
  // Get initial state from stores
  getInitialState: function() {
    return getAppState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    DropboxStore.addChangeListener(this._onChange);
    // Check if user is already logged into Dropbox
    DropboxActions.initLogin({
      interactive: false
    });
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    DropboxStore.removeChangeListener(this._onChange);
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getAppState());
  },

  render: function() {
    return (
      <main>
        <ReactTransitionGroup transitionName="fade">
          <RouteHandler logged={this.state.logged} />
        </ReactTransitionGroup>
      </main>
    );
  }
});

module.exports = MockupsApp;
