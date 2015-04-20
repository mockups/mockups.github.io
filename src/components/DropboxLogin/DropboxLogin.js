'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');

require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginToDropbox() {
    DropboxActions.initLogin();
  },

  render() {
    return (
      <div className="DropboxLogin">
          {
            this.props.logged ?
            <div>Logged</div> :
            <button type="button" onClick={this.loginToDropbox}>Login with Dropbox
            </button>
          }
      </div>
    );
  }
});

module.exports = DropboxLogin; 
