'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';
import Loading from '../Loading/Loading';

var React = require('react/addons');

require('./DropboxLogin.scss');

var DropboxLogin = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  loginToDropbox: function() {
    DropboxActions.initLogin();
  },

  proceed: function() {
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

  componentDidUpdate: function() {
    if (!this.props.logged) {
      return;
    }
    
    this.proceed();
  },

  componentDidMount: function() {
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
