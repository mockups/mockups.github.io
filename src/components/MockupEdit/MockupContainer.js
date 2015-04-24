'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;

var ItemTypes = require('../../constants/ElementTypes');
var Box = require('./MockupBox');

function makeDropTarget(context) {
  return {
    acceptDrop: function(component, item) {
      var delta = context.getCurrentOffsetDelta();
      var left = Math.round(item.left + delta.x);
      var top = Math.round(item.top + delta.y);

      component.moveBox(item.id, left, top);
    }
  };
}

var styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative'
};

var Container = React.createClass({
  mixins: [DragDropMixin],

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' }
      }
    };
  },

  statics: {
    configureDragDrop(register, context) {
      register(ItemTypes.BOX, {
        dropTarget: makeDropTarget(context)
      });
    }
  },

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  },

  render() {
    var boxes = this.state.boxes;
    var boxNodes = Object.keys(boxes).map(key => {
      var { left, top, title } = boxes[key];

      return (
        <Box key={key}
             id={key}
             left={left}
             top={top}>
          {title}
        </Box>
      );
    });

    return (
      <div {...this.dropTargetFor(ItemTypes.BOX)} style={styles}>
        {boxNodes}
      </div>
    );
  }
});

module.exports = Container;
