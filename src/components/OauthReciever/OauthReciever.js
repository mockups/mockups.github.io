'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');

var OauthReciever = React.createClass({
  // Add change listeners to stores
  componentDidMount: function() {
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
