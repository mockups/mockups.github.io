'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;
var DropEffects = require('react-dnd').DropEffects;

var ItemTypes = require('../../constants/ItemTypes');

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

var Image = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: React.PropTypes.any.isRequired,
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.IMAGE, {
        dragSource: {
          beginDrag(component) {
            return {
              item: {
                image: component.props.image
              }
            };
          }
        }
      });
    }
  },

  render() {
    var { left, top, children } = this.props;

    return (
      <img src={this.props.image.url} 
        {...this.dragSourceFor(ItemTypes.IMAGE)}
        style={{
              position: 'absolute',
              border: '1px dashed gray',
              padding: '0.5rem',
              left,
              top
           }} />
    );
  }
});

module.exports = Image;
