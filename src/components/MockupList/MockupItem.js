'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var MockupActions = require('../../actions/MockupActionCreators');

var MockupItem = React.createClass({
  getInitialState() {
    return {
      edit: false,
      name: this.props.name
    };
  },

  componentWillUnmount() {
    this.toggleListener(false);
  },

  rename(e) {
    e.preventDefault();
    this.setState({edit: true});
    this.toggleListener(true);
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


  handleEditEnd(e) {
    var type = e.type;
    var node = this.getDOMNode();

    if (type === "click" && node.contains(e.target)) {
      return;
    }

    var key = e.which || e.keyCode;
    if (type === "keypress" && key && key !== 13) { // Enter
      return;
    }

    this.toggleListener(false);

    MockupActions.rename({
      id: this.props.id,
      name: this.state.name
    });

    this.setState({edit: false});
  },

  toggleListener(state) {
    if (state) {
      document.addEventListener("click", this.handleEditEnd, false);
      document.addEventListener('keypress', this.handleEditEnd, false);
    } else {
      document.removeEventListener("click", this.handleEditEnd, false);
      document.removeEventListener("keypress", this.handleEditEnd, false);
    }
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
            <Link className="MockupItem__name" to="mockup-edit" params={{mockupId: this.props.id}}>{this.state.name}</Link> 
            <a className="MockupItem__edit" href="#" onClick={this.rename}>rename</a> 
            <a className="MockupItem__remove" href="#" onClick={this.remove}>remove</a>
          </p>
        }
      </div>
    );
  }
});

module.exports = MockupItem; 
