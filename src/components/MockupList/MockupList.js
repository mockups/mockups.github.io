'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');
var App = require('../App/App');

var MockupList = React.createClass({
  mixins: [App.requireAuthMixin],

  render() {
    return (
      <div className="MockupList">
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
    );
  }
});

module.exports = MockupList; 
