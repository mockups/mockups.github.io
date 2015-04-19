'use strict';

import DropboxActions from '../../actions/DropboxActions';

var React = require('react/addons');

require('DropboxLogin.scss');

var DropboxLogin = React.createClass({
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

