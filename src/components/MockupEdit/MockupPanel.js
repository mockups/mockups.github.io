'use strict';

var React = require('react/addons');
var FileList = require('../FileList/FileList');
var DragDropMixin = require('react-dnd').DragDropMixin;
var ObjectTypes = require('../../constants/ObjectTypes');
var DropEffects = require('react-dnd').DropEffects;

var dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.MOVE,
      item: component.props
    };
  }
};

var Container = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(ObjectTypes.PANEL, { dragSource });
    }
  },

  render() {
    var { left, top } = this.props;

    return (
      <div className="MockupPanel" {...this.dragSourceFor(ObjectTypes.PANEL)}
        style={{
          left,
          top
        }}
      >
        <FileList files={this.props.files}/>
      </div>
    );
  }
});

module.exports = Container;
