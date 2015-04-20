'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');

require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  loginToDropbox() {
    DropboxActions.initLogin();
  },

  logoutFromDropbox() {
    DropboxActions.logout();
  },

  render() {
    return (
      <div className="DropboxLogin">
          {
            this.props.logged ?
            <button type="button" onClick={this.logoutFromDropbox}>Logout from Dropbox
            </button> :
            <button type="button" onClick={this.loginToDropbox}>Login with Dropbox
            </button>
          }
      </div>
    );
  }
});

module.exports = DropboxLogin; 
