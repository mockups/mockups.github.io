'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');

var Loading = require('../Loading/Loading');

var OauthReciever = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  // Add change listeners to stores
  componentDidMount() {
    DropboxActions.finishLogin();
  },

  render() {
    return (
      <div className="OauthReciever">
        <Loading />
      </div>
    );
  }
});

module.exports = OauthReciever; 
