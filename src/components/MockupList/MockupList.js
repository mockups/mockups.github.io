'use strict';

var React = require('react/addons');

var App = require('../App/App');
var MockupItem = require('./MockupItem');
var MockupNew = require('./MockupNew');
var Loading = require('../Loading/Loading');

var MockupList = React.createClass({
  mixins: [App.requireAuthMixin],

  render() {
    var mockups = this.props.mockups;

    var mockupNodes = "";

    if (!mockups) { // Mockups data not yet loaded
      mockupNodes = (
        <li>
          <Loading />
        </li>
      );
    } else if (mockups.length) { // Render mockups links if any
      mockupNodes = this.props.mockups.map(function(mockup) {
        var id = mockup.getId();
        return (
          <li key={id}>
            <MockupItem id={id} name={mockup.get('name')} />
          </li>
        );
      });
    }

    return (
      <div className="MockupList">
        <ul>
          {mockupNodes}
          <li>
            <MockupNew />
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = MockupList; 
