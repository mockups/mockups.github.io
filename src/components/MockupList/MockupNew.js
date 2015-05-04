'use strict';

var React = require('react/addons');

var MockupActions = require('../../actions/MockupActionCreators');

var MockupNew = React.createClass({
  create() {
    MockupActions.create();
  },

  render() {
    return (
      <div className="MockupNew">
        <a className="btn" onClick={this.create}>Add new mockup</a>
      </div>
    );
  }
});

module.exports = MockupNew; 
