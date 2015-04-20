'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');

require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginToDropbox() {
    DropboxActions.login();
  },

  render() {
    return (
      <div className="DropboxLogin">
        <button type="button" onClick={this.loginToDropbox}>Login with Dropbox
        </button>
      </div>
    );
  }
});

module.exports = DropboxLogin; 
