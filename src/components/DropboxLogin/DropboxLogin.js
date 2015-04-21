'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');

require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginToDropbox: function() {
    DropboxActions.initLogin();
  },

  componentDidUpdate: function() {
    if (!this.props.logged) {
      return;
    }
    
    var router = this.context.router;
    var nextPath = router.getCurrentQuery().nextPath;

    if (nextPath) {
      router.replaceWith(nextPath);
    } else {
      router.replaceWith("/");
    }
  },

  render() {
    return (
      <div className="DropboxLogin">
          {
            this.props.logged ?
            <button type="button" onClick={this.logoutFromDropbox}>Logout from Dropbox
            </button>:
            <button type="button" onClick={this.loginToDropbox}>Login with Dropbox
            </button>
          }
      </div>
    );
  }
});

module.exports = DropboxLogin; 
