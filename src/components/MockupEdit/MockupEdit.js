'use strict';

var React = require('react/addons');
var update = require('react/lib/update');

var MockupActions = require('../../actions/MockupActionCreators');
var RequireAuthMixin = require('../App/App').requireAuthMixin;
var DragDropMixin = require('react-dnd').DragDropMixin;
var MockupActions = require('../../actions/MockupActionCreators');
var MockupPanel = require('./MockupPanel');
var MockupContainer = require('./MockupContainer');
var ObjectTypes = require('../../constants/ObjectTypes');

require('./MockupEdit.scss');

function makeDropTarget(context, type) {
  return {
    acceptDrop: function(component, item) {
      var delta = context.getCurrentOffsetDelta();
      var relativeOffset = {
        x: Math.round(item.left + delta.x),
        y: Math.round(item.top + delta.y)
      };
      component.moveItem(item.name, relativeOffset);
    }
  };
}

var MockupEdit = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [RequireAuthMixin, DragDropMixin],

  statics: {
    configureDragDrop(register, context) {
      register(ObjectTypes.PANEL, {
        dropTarget: makeDropTarget(context, 'objectsPanel')
      });
    }
  },

  getInitialState() {
    return {
      objectsPanel: { 
        top: 20,
        left: 0
      }
    };
  },

  componentDidUpdate() {
    if (!this.props.currentMockups) {
      var currentMockup = this.context.router.getCurrentParams();
      MockupActions.startEdit(currentMockup);
    }
  },

  moveItem(item, relative) {
    var left = relative.x;
    var top = relative.y;
    this.setState(update(this.state, {
      [item]: {
        $merge: {
          left: left,
          top: top
        }
      }
    }));
  },

  render() {
    var panelLeft = this.state.objectsPanel.left;
    var panelTop = this.state.objectsPanel.top;
    var rawObjects = this.props.currentMockup ? this.props.currentMockup.get("objects") : "{}";
    var objects = JSON.parse(rawObjects || "{}");
    var mockupId = this.props.currentMockup ? this.props.currentMockup.getId() : "";

    return (
      <div {...this.dropTargetFor(ObjectTypes.PANEL)} className="MockupEdit">
        <MockupPanel files={this.props.files} left={panelLeft} top={panelTop} name="objectsPanel" />
        <MockupContainer objects={objects} id={mockupId}/>
      </div>
    );
  }

});

module.exports = MockupEdit; 
