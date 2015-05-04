'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');
var Logo = require('../Logo/Logo');
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
    } else {
      router.replaceWith("mockup-list");
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
            // User not logged
            <div className="Hero">
              <Logo type="big"/>
              <p>A demonstration project for UI Kit approach to&nbsp;structure visual components in your project.</p>
              <a onClick={this.loginToDropbox} className="btn btn--dropbox">
                <i className="fa fa-dropbox"></i>
                Login with Dropbox
              </a>
            </div>:
            // Undefined state (redirect will occure if logged)
            <Loading />
          }
      </div>
    );
  }
});

module.exports = DropboxLogin; 
