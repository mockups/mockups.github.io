'use strict';

var React = require('react/addons');

var MockupActions = require('../../actions/MockupActionCreators');
var App = require('../App/App');
var MockupActions = require('../../actions/MockupActionCreators');
var MockupPanel = require('./MockupPanel');
var MockupContainer = require('./MockupContainer');

var MockupEdit = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [App.requireAuthMixin],

  componentDidUpdate() {
    if (!this.props.currentMockups) {
      var currentMockup = this.context.router.getCurrentParams();
      MockupActions.startEdit(currentMockup);
    }
  },

  render() {
    return (
      <div className="MockupEdit">
        <MockupPanel files={this.props.files} />
        <MockupContainer />
      </div>
    );
  }

});

module.exports = MockupEdit; 
