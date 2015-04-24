'use strict';

var React = require('react/addons');

var MockupActions = require('../../actions/MockupActionCreators');
var App = require('../App/App');
var FileList = require('../FileList/FileList');

var MockupEdit = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [App.requireAuthMixin],

  getInitialState: function() {
    return {
      id: this.context.router.getCurrentParams().mockupId
    };
  },

  render() {
    return (
      <div className="MockupEdit">
        {this.state.id}
        <FileList files={this.props.files}/>
      </div>
    );
  }

});

module.exports = MockupEdit; 
