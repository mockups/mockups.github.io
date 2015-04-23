'use strict';

var React = require('react/addons');

var MockupActions = require('../../actions/MockupActionCreators');
var App = require('../App/App');

var MockupNew = React.createClass({
  mixins: [App.requireAuthMixin],

  create() {
    MockupActions.create();
  },

  render() {
    return (
      <div className="MockupNew">
        <button onClick={this.create}>Add new mockup</button>
      </div>
    );
  }
});

module.exports = MockupNew; 
