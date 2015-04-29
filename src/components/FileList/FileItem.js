'use strict';

var React = require('react/addons');

var ItemTypes = require('../../constants/ItemTypes');

var RequireAuthMixin = require('../App/App').requireAuthMixin;
var DragDropMixin = require('react-dnd').DragDropMixin;

var dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.COPY,
      item: component.props
    };
  }
};

var style = {
  position: 'absolute',
  border: '1px dashed gray',
  padding: '0.5rem'
};

var FileItem = React.createClass({
  mixins: [RequireAuthMixin, DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.IMAGE, { // TODO: shall be separate type
        dragSource: {
          beginDrag(component) {
            return {
              item: component.props.data
            };
          }
        }
      });
    }
  },

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
    var children = this.props.data.nodes;
    var dragSource = this.props.data.isImage ? this.dragSourceFor(ItemTypes.IMAGE) : {};

    if (children) {
      nodes = children.map(function(node) {
        var FileList = require('./FileList');
        return <FileItem key={node.path} data={node} />;
      });
    }

    return (
      <li {...dragSource}>
        { // If item is folder, it should be collapsable
          isFolder ?
            <span onClick={this.toggle}>
              {
                this.state.collapsed ? "[+]" : "[-]"
              }
            </span> : ""
        }
        { // If item has a thumbnail -- display it
          thumbnail ?
            <img src={thumbnail} alt={this.props.data.path}/> : ""
        }
        <span>{this.props.data.name}</span>
        { // If item is folder and isn't collapsed, display it's children
          isFolder && !this.state.collapsed ?
            <ul>{nodes}</ul> : ""
        }
      </li>
    );
  }
});

module.exports = FileItem; 
