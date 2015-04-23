'use strict';

var React = require('react/addons');

var App = require('../App/App');

var FileList = React.createClass({
  mixins: [App.requireAuthMixin],

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

module.exports = FileList; 
