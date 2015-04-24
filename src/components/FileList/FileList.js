'use strict';

var React = require('react/addons');
var Router = require('react-treeview');

var App = require('../App/App');
var FileItem = require('./FileItem');

require('./FileList.scss');

var FileList = React.createClass({
  mixins: [App.requireAuthMixin],

  render() {
    var items = "";

    if (this.props.files) {
      items = this.props.files.map(function(item) {
        return <FileItem key={item.path} data={item}/>;
      });
    }

    return (
      <div className="FileList">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
});

module.exports = FileList; 
