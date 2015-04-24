'use strict';

var React = require('react/addons');
var Router = require('react-treeview');

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

          <span>{this.props.data.name}</span>

          {
            isFolder && !this.state.collapsed ?
              <ul>{nodes}</ul> :
              ""
          }
      </li>
    );
  }
});

module.exports = FileItem; 
