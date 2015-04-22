'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';
import App from '../App/App';

var React = require('react/addons');

var DropboxLogin = React.createClass({
  mixins: [App.requireAuthMixin],

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
