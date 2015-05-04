'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;
var DropEffects = require('react-dnd').DropEffects;

var ObjectTypes = require('../../constants/ObjectTypes');

require('./MockupItem.scss');

var dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.MOVE,
      item: component.props
    };
  }
};

var Img = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: React.PropTypes.any.isRequired,
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
  },

  statics: {
    configureDragDrop(register) {
      register(ObjectTypes.IMAGE, {
        dragSource: {
          beginDrag(component) {
            return {
              item: component.props
            };
          }
        }
      });
    }
  },

  render() {
    var { left, top, children } = this.props;

    return (
      <img className="MockupObject MockupImage" src={this.props.url} 
        {...this.dragSourceFor(ObjectTypes.IMAGE)}
        style={{
          left,
          top
        }} 
      />
    );
  }
});

module.exports = Img;
