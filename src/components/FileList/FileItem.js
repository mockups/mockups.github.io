'use strict';

var React = require('react/addons');

var App = require('../App/App');

var FileItem = React.createClass({
  mixins: [App.requireAuthMixin],

  getInitialState() {
    return {
      collapsed: false
    };
  },

  toggle: function(e){
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render() {
    var nodes = "";
    var isFolder = this.props.data.type === 'folder';
    var thumbnail = this.props.data.thumbnail;
    console.log(thumbnail);
    var children = this.props.data.nodes;

    if (children) {
      nodes = children.map(function(node) {
        var FileList = require('./FileList');
        return <FileItem key={node.path} data={node} />;
      });
    }

    return (
      <li>
          {
            isFolder ?
              <span onClick={this.toggle}>
                {
                  this.state.collapsed ? "[+]" : "[-]"
                }
              </span> : ""
          }
          {
            thumbnail ?
              <img src={thumbnail} alt={this.props.data.path}/> : ""
          }
          <span>{this.props.data.name}</span>
          {
            isFolder && !this.state.collapsed ?
              <ul>{nodes}</ul> : ""
          }
      </li>
    );
  }
});

module.exports = FileItem; 
