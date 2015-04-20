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
      <div className="FileList">
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
    );
  }
});

module.exports = DropboxLogin; 
