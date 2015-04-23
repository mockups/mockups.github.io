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
    DropboxActions.createDemo();
  },

  componentDidUpdate() {
    if (this.props.files.length && this.props.mockups.length) {
      this.context.router.replaceWith("mockup-list");
    } else {
      DropboxActions.createDemo();
    }
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
