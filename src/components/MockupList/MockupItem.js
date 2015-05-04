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
    var save = true;

    if (type === "click" && node.contains(e.target)) {
      return;
    }

    var key = e.which || e.keyCode;
    if (type === "keyup") {
      if (key !== 13 && key !== 27) { // Not Enter or Esc
        return;
      } else if (key === 27) { // Esc
        save = false;
      }
    }
    this.toggleListener(false);

    if (save) {
      MockupActions.rename({
        id: this.props.id,
        name: this.state.name
      });
    } else {
      this.setState({name: this.props.name});
    }

    this.setState({edit: false});
  },

  toggleListener(state) {
    if (state) {
      document.addEventListener("click", this.handleEditEnd, false);
      document.addEventListener('keyup', this.handleEditEnd, false);
    } else {
      document.removeEventListener("click", this.handleEditEnd, false);
      document.removeEventListener("keyup", this.handleEditEnd, false);
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
          <input className="MockupItem__name MockupItem__edit" ref={ setFocus } type="text" defaultValue={this.state.name} onChange={this.handleChange}></input>
          :
          <div>
            <div className="MockupItem__name">
              <Link to="mockup-edit" params={{mockupId: this.props.id}}>{this.state.name}</Link> 
            </div>

            <div className="MockupItem__actions">
              (
              <a href="#" onClick={this.rename}>
                <i className="fa fa-pencil"></i>
                rename
              </a>,&nbsp;
              <a href="#" onClick={this.remove}>
                <i className="fa fa-trash"></i>
                remove
              </a>
              )
            </div>
          </div>
        }
      </div>
    );
  }
});

module.exports = MockupItem; 
