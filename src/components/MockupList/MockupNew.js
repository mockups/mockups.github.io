'use strict';

var React = require('react/addons');

var DropboxActions = require('../../actions/DropboxActionCreators');
var App = require('../App/App');

var MockupNew = React.createClass({
  mixins: [App.requireAuthMixin],

  render() {
    return (
      <div className="MockupNew">
        <button>Add new mockup</button>
      </div>
    );
  }
});

module.exports = MockupNew; 
