'use strict';

var React = require('react/addons');

var MockupProperties = React.createClass({
  remove(e) {
    e.preventDefault();
    var ok = window.confirm("Confirm permanent removal of selected item.");
    if (ok) {
      this.props.object.update("remove", true);
    }
  },

  render() {
    var object = this.props.object;

    if ( !(object && object.data) ) {
      return null;
    }

    var objectDeletable = object.data.id; // Unique elements like canvas are not deletable

    return (
      <div className="MockupProperties">
        <h2>Selected object</h2>
        { objectDeletable ? 
            <a className="btn" onClick={this.remove}>Remove</a>: "" }
      </div>
    );
  }
});

module.exports = MockupProperties; 
