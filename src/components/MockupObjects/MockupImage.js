'use strict';

var React = require('react/addons');
var update = require('react/lib/update');
var DragDropMixin = require('react-dnd').DragDropMixin;
var ImagePreloaderMixin = require('react-dnd').ImagePreloaderMixin;
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

var Img = React.createClass({
  mixins: [DragDropMixin, ImagePreloaderMixin],

  propTypes: {
    id: React.PropTypes.any.isRequired,
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired,
    styles: React.PropTypes.string
  },

  statics: {
    configureDragDrop(register) {
      register(ObjectTypes.IMAGE, {
        dragSource: {
          beginDrag(component) {
            return {
              item: component.props,
              dragPreview: component.getPreloadedImage(component.props.url)
            };
          }
        }
      });
    }
  },

  getImageUrlsToPreload() {
    return [this.props.url];
  },

  componentDidUpdate() {
    var node = React.findDOMNode(this.refs.image);
    node.setAttribute("style", node.getAttribute("style") + this.props.styles);
  },

  render() {
    var { left, top, styles, url } = this.props;
    var selectHandler = () => { this.props.selectHandler(this.props); };
    var selectedClass = this.props.selected ? "MockupObject--selected" : "";

    return (
      <img ref="image" className={"MockupObject MockupImage " + selectedClass} src={url} 
        onClick={selectHandler}  
        {...this.dragSourceFor(ObjectTypes.IMAGE)}
        style={{
          top,
          left
        }}
      />
    );
  }
});

module.exports = Img;
