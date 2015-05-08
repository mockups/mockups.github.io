'use strict';

var React = require('react/addons');

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
        <h2 className="FileList__Header">
          Available files
        </h2>
        <ul className="FileList__Wrapper">
          {items}
        </ul>
      </div>
    );
  }
});

module.exports = FileList; 
