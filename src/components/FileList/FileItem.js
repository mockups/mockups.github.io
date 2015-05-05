'use strict';

var React = require('react/addons');

var ObjectTypes = require('../../constants/ObjectTypes');

var RequireAuthMixin = require('../App/App').requireAuthMixin;
var DragDropMixin = require('react-dnd').DragDropMixin;
var DropEffects = require('react-dnd').DropEffects;

var dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.COPY,
      item: component.props
    };
  }
};

var FileItem = React.createClass({
  mixins: [RequireAuthMixin, DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(ObjectTypes.PREVIEW, {
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
    if (this.props.data.type !== 'folder') {
      return;
    }

    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render() {
    var nodes = "";
    var isFolder = this.props.data.type === 'folder';
    var thumbnail = this.props.data.thumbnail;
    var children = this.props.data.nodes;
    var dragSource = this.props.data.isImage ? this.dragSourceFor(ObjectTypes.PREVIEW) : {};

    if (children) {
      nodes = children.map(function(node) {
        var FileList = require('./FileList');
        return <FileItem key={node.path} data={node} />;
      });
    }

    return (
      <li {...dragSource} className="FileList__Node">
        <span className="FileList__Label" onClick={this.toggle}>
          { // If item is folder, it should be collapsable
            isFolder ?
              <span>
                {
                  this.state.collapsed ? 
                    <i className="fa fa-folder-o FileList__Preview"></i> :
                    <i className="fa fa-folder-open-o FileList__Preview"></i>
                }
              </span> :
            // If item has a thumbnail -- display it
              thumbnail ?
                <img src={thumbnail} className="FileList__Preview" alt={this.props.data.path}/> :
                <i className="fa fa-file-text-o FileList__Preview"></i>
          }
          <span>{this.props.data.name}</span>
        </span>
          { // If item is folder and isn't collapsed, display it's children
            isFolder && !this.state.collapsed ?
              <ul className="FileList__Level">{nodes}</ul> : ""
          }
      </li>
    );
  }
});

module.exports = FileItem; 
