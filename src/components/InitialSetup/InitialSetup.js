'use strict';

var React = require('react/addons');

var App = require('../App/App');
var DropboxActions = require('../../actions/DropboxActionCreators');

var InitialSetup = React.createClass({
  mixins: [App.requireAuthMixin],

  getInitialState() {
    return {
      value: "mockups.eu",
      availble: undefined
    };
  },

  componentDidMount() {
    this.checkFolderAvailable(this.state.value);
  },

  handleChange(e) {
    var rawValue = e.target.value;
    this.checkFolderAvailable(rawValue);
  },

  checkFolderAvailable(path) {
    this.setState({
      value: path,
      available: undefined,
      error: false
    });

    DropboxActions.checkFolderExist({
      path: path,
      cb: (error, stat) => {
        if (error && error.status === 404) {
          this.setState({
            available: true
          });
        } else {
          this.setState({
            available: false
          });
        }
      }
    });
  },

  createRoot() {
    DropboxActions.createRootFolder({
      path: this.state.value,
      cb: () => {
        console.log("createRootFolder callback");
      }
    });
  },

  render() {
    var controlOrError = "";

    if (this.state.error) {
      controlOrError = <p>this.state.error</p>;
    } else if (this.state.available === false) {
      controlOrError = <p>Folder already exists</p>;
    } else if (this.state.available === true) {
      controlOrError = <button type="button" onClick={this.createRoot}>Create</button>
    }

    return (
      <div className="InitialSetup">
        <p>Please select a name for new folder where the demo mockup will be added and your own mockups will be stored</p>
        <input type="text" name="rootFolder" value={this.state.value} onChange={this.handleChange} />
        {controlOrError}
      </div>
    );
  }

});

module.exports = InitialSetup; 
