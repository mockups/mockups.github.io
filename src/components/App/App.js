'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';
import Paths from '../../constants/Paths';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var DropboxStore = require('../../stores/DropboxStore');

var imageURL = require('../../images/yeoman.png');

// Retrieve state from Stores
function getAppState() {
  return {
    logged: DropboxStore.isLogged(),
    rootFolder: DropboxStore.getRootFolder()
  };
}

var MockupsApp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

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
    if (!this.state.logged === false) {
      this.context.router.replaceWith("dropbox-auth");
    }

    this.setState(getAppState());
  },

  logoutFromDropbox: function(e) {
    DropboxActions.logout();
  },

  render: function() {
    var { router } = this.context;

    return (
      <div className="App">
        <nav>
          <ul>
            {
              this.state.logged ?
              <li>
                <a href="#" onClick={this.logoutFromDropbox}>Logout</a>
              </li> :
              <li>
                <Link to="dropbox-auth">Login</Link>
              </li>
            }
          </ul>
        </nav>
        <main>
          <ReactTransitionGroup transitionName="fade">
            <RouteHandler logged={this.state.logged} rootFolder={this.state.rootFolder} />
          </ReactTransitionGroup>
        </main>
      </div>
    );
  }
});

// Redirect user to login view if he is not logged in
MockupsApp.requireAuthMixin = {
  statics: {
    willTransitionTo: function (transition) {
      console.log("wTT");
      if (!DropboxStore.isLogged()) {
        transition.redirect(Paths.LOGIN, {}, {'nextPath' : transition.path});
      }
    }
  }
};

module.exports = MockupsApp;
