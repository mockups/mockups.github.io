'use strict';

var React = require('react/addons');
var _ = require('underscore');

var App = require('../App/App');
var Loading = require('../Loading/Loading');
var DropboxActions = require('../../actions/DropboxActionCreators');

var messages = [
  "Pressurizing fruit punch barrel hydraulics",
  "Testing telecommunications",
  "Caffeinating server",
  "Initializing secret resources",
  "Securing mockups database",
  "Reticulating graduated splines",
  "Pre-inking canvas"
];

var InitialSetup = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [App.requireAuthMixin],

  componentDidMount() {
    if (!this.proceed()) {
      DropboxActions.createDemo();
      this.interval = setInterval(() => {
        this.setState({
          message: _.sample(messages)
        });
      }, 800);
    }
  },

  getInitialState() {
    return {
      message: ""
    };
  },

  componentDidUpdate() {
    this.proceed();
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  interval: null,

  proceed() {
    var files = this.props.files;
    var mockups = this.props.mockups;
    if (files && files.length && mockups && mockups.length) {
      this.context.router.replaceWith("mockup-list");
    }

    return false;
  },

  render() {
    return (
      <div className="InitialSetup is-centered">
        <h1>Providing demo mockup:</h1>
        <p>{this.state.message}...</p>
        <p>
          <Loading />
        </p>
      </div>
    );
  }

});

module.exports = InitialSetup; 
