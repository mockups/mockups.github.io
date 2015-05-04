'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var DropboxStore = require('../../stores/DropboxStore');
var DropboxActions = require('../../actions/DropboxActionCreators');
var MockupStore = require('../../stores/MockupStore');
var MockupActions = require('../../actions/MockupActionCreators');
var Paths = require('../../constants/Paths');
var imageURL = require('../../images/yeoman.png');

var Logo = require('../Logo/Logo');
var GithubRibbon = require('./GithubRibbon');

require('./App.scss');

// Retrieve state from Stores
function getAppState() {
  return {
    logged: DropboxStore.isLogged(),
    mockups: MockupStore.getMockups(),
    files: DropboxStore.files,
    currentMockup: MockupStore.currentMockup
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
    MockupStore.addChangeListener(this._onChange);
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
        {
          this.state.logged ?
          // User logged
          <nav className="Nav">
            <div className="Nav__Item Nav__Item--prior">
              <Logo type="small"/>
            </div>
            <div className="Nav__Item Nav__Mockup_Name Nav__Item--prior">
              {this.state.currentMockup ? this.state.currentMockup.get("name") : ""}
            </div>
            <ul className="Nav__Item">
              <li className="Nav__Item">
                <Link to="mockup-list">List of mockups</Link>
              </li>
              <li className="Nav__Item">
                <a href="#" onClick={this.logoutFromDropbox}>Logout</a>
              </li>
            </ul>
          </nav>
          : // User not logged
          <nav className="Nav">
            <div className="Nav__Item Nav__Item--prior">
              <Logo type="small"/>
            </div>
            <ul>
              <li className="Nav__Item">
                <Link to="dropbox-auth">Login</Link>
              </li>
            </ul>
          </nav>
        }
        <GithubRibbon />
        <main className="Content">
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
        transition.redirect("dropbox-auth", {}, {'nextPath' : transition.path});
      }
    }
  }
};

module.exports = MockupsApp;
