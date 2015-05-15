'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');

var DropboxLogin = React.createClass({
  loginToDropbox() {
    DropboxActions.initLogin();
  },

  render() {
    return (
      <div className="DropboxLogin">          
        <a onClick={this.loginToDropbox} className="btn btn--dropbox">
          <i className="fa fa-dropbox"></i>
          Login with Dropbox
        </a>
      </div>
    );
  }
});

module.exports = DropboxLogin; 
