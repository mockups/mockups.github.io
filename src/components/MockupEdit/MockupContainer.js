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
      var clientOffset = context.getCurrentOffsetFromClient();
      var totalOffset = {
        x: Math.round(document.body.scrollLeft + clientOffset.x),
        y: Math.round(document.body.scrollTop + clientOffset.y)
      };
      var delta = context.getCurrentOffsetDelta();
      var relativeOffset = {
        x: Math.round(item.left + delta.x),
        y: Math.round(item.top + delta.y)
      };
      component.moveItem(item, type, totalOffset, relativeOffset);
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

  moveItem(item, type, total, relative) {
    var id = item.id;
    var left, top, method;
    // Item already at the container
    if (this.state[type][id]) {
      method = "$merge";
      left = relative.x;
      top = relative.y;
    } else { // New item has been dragged
      method = "$set";
      id = Math.random(); // TODO: check better ways
      var container = this.getDOMNode();
      var containerOffset = container.getBoundingClientRect();
      left = total.x - containerOffset.left;
      top = total.y - containerOffset.top;
    }
    this.setState(update(this.state, {
      [type]: {
        [id]: {
          [method]: {
            left: left,
            top: top,
            url: item.url
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
