'use strict';

var React = require('react/addons');

var App = require('../App/App');
var Loading = require('../Loading/Loading');
var DropboxActions = require('../../actions/DropboxActionCreators');

var InitialSetup = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [App.requireAuthMixin],

  componentDidMount() {
    if (!this.proceed()) {
      DropboxActions.createDemo();
    }
  },

  componentDidUpdate() {
    this.proceed();
  },

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
      <div className="InitialSetup">
        <p>Providing demo mockup...</p>
        <Loading />
      </div>
    );
  }

});

module.exports = InitialSetup; 
