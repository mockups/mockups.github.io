'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;
var DropEffects = require('react-dnd').DropEffects;

var ItemTypes = require('../../constants/ElementTypes');

var dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.MOVE,
      item: component.props
    };
  }
};

var style = {
  position: 'absolute',
  border: '1px dashed gray',
  padding: '0.5rem'
};

var Box = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: React.PropTypes.any.isRequired,
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.BOX, { dragSource });
    }
  },

  render() {
    var { hideSourceOnDrag, left, top, children } = this.props;
    var { isDragging } = this.getDragState(ItemTypes.BOX);

    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={{
              position: 'absolute',
              border: '1px dashed gray',
              padding: '0.5rem',
              left,
              top
           }}>
        {children}
      </div>
    );
  }
});

module.exports = Box;
