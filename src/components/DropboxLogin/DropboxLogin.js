'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');
var Loading = require('../Loading/Loading');
require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginToDropbox() {
    DropboxActions.initLogin();
  },

  proceed() {
    var router = this.context.router;
    var nextPath = router.getCurrentQuery().nextPath;

    if (nextPath) {
      router.replaceWith(nextPath);
    } else if (!this.props.rootFolder) {
      router.replaceWith("initial-setup");
    } else {
      router.replaceWith("/");
    }
  },

  componentDidUpdate() {
    if (!this.props.logged) {
      return;
    }
    
    this.proceed();
  },

  componentDidMount() {
    if (this.props.logged) {
      this.proceed();
    }
  },

  render() {
    return (
      <div className="DropboxLogin">
          {
            this.props.logged === false ?
            <button type="button" onClick={this.loginToDropbox}>
              Login with Dropbox
            </button>:
            <Loading />
          }
      </div>
    );
  }
});

module.exports = DropboxLogin; 
