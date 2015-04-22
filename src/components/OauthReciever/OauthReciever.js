'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');

var OauthReciever = React.createClass({
  // Add change listeners to stores
  componentDidMount() {
    DropboxActions.finishLogin();
  },

  render() {
    return (
      <div className="OauthReciever">
      </div>
    );
  }
});

module.exports = OauthReciever; 
