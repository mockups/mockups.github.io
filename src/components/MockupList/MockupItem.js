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

  rename(e) {
    e.preventDefault();
    this.setState({edit: true});
    document.addEventListener("click", this.handleClick, false);
  },

  remove(e) {
    e.preventDefault();
    var ok = window.confirm("Confirm permanent removal of '" + this.state.name + "'.");
    if (ok) {
      MockupActions.remove({
        id: this.props.id
      });
    }
  },


  handleClick(e) {
    if (this.getDOMNode().contains(e.target)) {
      return;
    }

    document.removeEventListener("click", this.handleClick, false);

    MockupActions.rename({
      id: this.props.id,
      name: this.state.name
    });

    this.setState({edit: false});
  },

  handleChange(e) {
    var newName = e.target.value;
    this.setState({name: newName});
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
          <p>
            <span className="MockupItem__name">{this.state.name}</span> 
            <a className="MockupItem__edit" href="#" onClick={this.rename}>rename</a> 
            <a className="MockupItem__remove" href="#" onClick={this.remove}>remove</a>
          </p>
        }
      </div>
    );
  }
});

module.exports = MockupItem; 
