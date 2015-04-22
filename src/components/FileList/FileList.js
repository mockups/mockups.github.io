'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');
var App = require('../App/App');

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
