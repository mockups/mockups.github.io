'use strict';

var React = require('react/addons');
var update = require('react/lib/update');

var MockupActions = require('../../actions/MockupActionCreators');
var RequireAuthMixin = require('../App/App').requireAuthMixin;
var DragDropMixin = require('react-dnd').DragDropMixin;
var ObjectTypes = require('../../constants/ObjectTypes');
var MockupActions = require('../../actions/MockupActionCreators');
var MockupPanel = require('./MockupPanel');
var MockupContainer = require('./MockupContainer');
var Loading = require('../Loading/Loading');

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
        top: 100,
        left: 50
      }
    };
  },

  componentDidMount() {
    MockupActions.startEdit(this.context.router.getCurrentParams());
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
    if (!this.props.currentMockup) {
      return (
        <Loading />
      );
    } else {
      var rawObjects = this.props.currentMockup.get("objects");
      var objects = JSON.parse(rawObjects || "{}");
      var mockupId = this.props.currentMockup.getId();
      var clearSelect = (e) => {
        if (e.target === this.getDOMNode()) {
          MockupActions.selectObject(null);
        }
      };

      return (
        <div {...this.dropTargetFor(ObjectTypes.PANEL)} className="MockupEdit" onClick={clearSelect}>
          <p className="is-centered">Drag images to canvas from list of available files. Click on object at canvas to edit.</p>
          <MockupPanel files={this.props.files} selectedObject={this.props.selectedObject} left={panelLeft} top={panelTop} name="objectsPanel" />
          <MockupContainer imageMap={this.props.imageMap} objects={objects} selectedObject={this.props.selectedObject} id={mockupId}/>
        </div>
      );
    }
  }

});

module.exports = MockupEdit; 
