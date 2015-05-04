'use strict';

var React = require('react/addons');
var FileList = require('../FileList/FileList');

var Container = React.createClass({
  render() {
    return (
      <div className="MockupPanel">
        <FileList files={this.props.files}/>
      </div>
    );
  }
});

module.exports = Container;
