'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;

var ItemTypes = require('../../constants/ItemTypes');
var Box = require('./MockupBox');
var Img = require('./MockupImage');

function makeDropTarget(context, type) {
  return {
    acceptDrop: function(component, item) {
      var delta = context.getCurrentOffsetDelta();
      var left = Math.round(item.left + delta.x);
      var top = Math.round(item.top + delta.y);
      component.moveItem(item.id, type, left, top);
    }
  };
}

var styles = {
  width: 1300,
  height: 1300,
  border: '1px solid black',
  position: 'relative'
};

var Container = React.createClass({
  mixins: [DragDropMixin],

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' },
      },
      imgs: {
        'c': { top: 180, left: 40, title: 'i am image!', url:'http://ponych.at/apple-touch-icon.png' }
      }
    };
  },

  statics: {
    configureDragDrop(register, context) {
      register(ItemTypes.BOX, {
        dropTarget: makeDropTarget(context, 'boxes')
      });
      register(ItemTypes.IMAGE, {
        dropTarget: makeDropTarget(context, 'imgs')
      });
    }
  },

  moveItem(id, type, left, top) {
    this.setState(update(this.state, {
      [type]: {
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

    var imgs = this.state.imgs;
    var imgNodes = Object.keys(imgs).map(key => {
      var { left, top, title, url } = imgs[key];

      return (
        <Img key={key}
             id={key}
             left={left}
             top={top}
             url={url} />
      );
    });

    var supportedTypes = [ItemTypes.BOX, ItemTypes.IMAGE];

    return (
      <div {...this.dropTargetFor(...supportedTypes)} style={styles}>
        {boxNodes}
        {imgNodes}
      </div>
    );
  }
});

module.exports = Container;
