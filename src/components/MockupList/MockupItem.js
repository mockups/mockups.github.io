'use strict';

var React = require('react/addons');

var MockupActions = require('../../actions/MockupActionCreators');
var App = require('../App/App');

var MockupItem = React.createClass({
  getInitialState() {
    return {
      edit: false,
      name: this.props.name
    };
  },

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  },

  rename() {
    this.setState({edit: true});
    document.addEventListener("click", this.handleClick, false);
  },

  handleClick(e) {
    if (this.getDOMNode().contains(e.target)) {
      return;
    }

    document.removeEventListener("click", this.handleClick, false);
    this.setState({edit: false});
  },

  handleChange(e) {
    var newName = e.target.value;
    MockupActions.renameMockup({
      id: this.props.id,
      name: newName
    });
  },

  render() {
    var setFocus = function(component) {
      var c = React.findDOMNode(component);
      if (c) {
        c.focus();
      }
    };

    return (
      <div className="MockupItem">
        { this.state.edit ?
          <p><input ref={ setFocus } type="text" defaultValue={this.state.name} onChange={this.handleChange}></input></p> :
          <p onClick={this.rename}>{this.state.name}</p>
        }
      </div>
    );
  }
});

module.exports = MockupItem; 
