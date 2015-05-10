'use strict';

var React = require('react/addons');
var _ = require('underscore');

require('./Properties.scss');

var editedId;

var MockupProperties = React.createClass({
  componentDidUpdate() {
    if (!this.props.object) {
      return;
    }

    if (editedId !== this.props.object.data.id) {
      React.findDOMNode(this.refs.styleEdit).value = this.props.object.data.styles || "";
    }

    editedId = this.props.object.data.id;
  },

  remove(e) {
    e.preventDefault();
    var ok = window.confirm("Confirm permanent removal of selected item.");
    if (ok) {
      this.props.object.update("remove", true);
    }
  },

  styleChange(e) {
    var newStyle = e.target.value;
    this.props.object.update("styles", newStyle);
  },

  render() {
    var object = this.props.object;

    if ( !object || _.isEmpty(object.data) ) {
      return null;
    }

    var objectDeletable = object.data.id; // Unique elements like canvas are not deletable

    return (
      <div className="Properties">
        <h2 className="Properties__Title">Selected object</h2>
        <ul>
          <li className="Properties__Control">
            <h3 className="Properties__Title">Style</h3>
            <textarea ref="styleEdit" onChange={this.styleChange} defaultValue={object.data.styles} />
          </li>
          <li className="Properties__Control">
            { objectDeletable ? 
                <a className="btn" onClick={this.remove}>Remove</a>: "" }
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = MockupProperties; 
