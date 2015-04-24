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
        <button onClick={this.create}>Add new mockup</button>
      </div>
    );
  }
});

module.exports = MockupNew; 
