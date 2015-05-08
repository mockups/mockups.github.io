'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;
var DropEffects = require('react-dnd').DropEffects;
var MockupActions = require('../../actions/MockupActionCreators');
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

var Box = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: React.PropTypes.any.isRequired,
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
  },

  statics: {
    configureDragDrop(register) {
      register(ObjectTypes.BOX, { dragSource });
    }
  },

  render() {
    var { left, top, children } = this.props;
    var selectHandler = () => { this.props.selectHandler(this.props); };

    return (
      <div className="MockupObject MockupBox" 
        onClick={selectHandler} 
        {...this.dragSourceFor(ObjectTypes.BOX)} 
           style={{
              left,
              top
           }}
      >
        {children}
      </div>
    );
  }
});

module.exports = Box;
