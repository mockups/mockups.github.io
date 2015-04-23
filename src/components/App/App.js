'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var DropboxStore = require('../../stores/DropboxStore');
var DropboxActions = require('../../actions/DropboxActionCreators');
var Paths = require('../../constants/Paths');
var imageURL = require('../../images/yeoman.png');

// Retrieve state from Stores
function getAppState() {
  return {
    logged: DropboxStore.isLogged(),
    mockups: DropboxStore.mockups,
    files: DropboxStore.files,
    busy: DropboxStore.busy
  };
}

var MockupsApp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  // Get initial state from stores
  getInitialState() {
    return getAppState();
  },

  // Add change listeners to stores
  componentDidMount() {
    DropboxStore.addChangeListener(this._onChange);
    // Check if user is already logged into Dropbox
    DropboxActions.initLogin({
      interactive: false
    });
  },

  // Remove change listers from stores
  componentWillUnmount() {
    DropboxStore.removeChangeListener(this._onChange);
  },

  // Method to setState based upon Store changes
  _onChange() {
    this.setState(getAppState());

    var logged = this.state.logged;
    var files = this.state.files;
    var mockups = this.state.mockups;

    if (this.state.logged === false) {
      this.context.router.replaceWith("dropbox-auth");
    }

    if (logged &&
        !(files && files.length) &&
        !(mockups && mockups.length) ) {
      this.context.router.replaceWith("initial-setup");
    }
  },

  logoutFromDropbox(e) {
    e.preventDefault();
    DropboxActions.logout();
  },

  render() {
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
            <RouteHandler {...this.state} />
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
      if (!DropboxStore.isLogged()) {
        transition.redirect(Paths.LOGIN, {}, {'nextPath' : transition.path});
      }
    }
  }
};

module.exports = MockupsApp;
