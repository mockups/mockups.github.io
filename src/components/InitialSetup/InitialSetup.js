'use strict';

import App from '../App/App';


var React = require('react/addons');

var InitialSetup = React.createClass({
  mixins: [App.requireAuthMixin],

  render() {
    return (
      <div className="InitialSetup">
        <p>Please select a name for new folder where the demo mockup will be added and your own mockups will be stored</p>
        <input type="text" name="rootFolder" defaultValue="mockups.eu" />
        <button type="button">Create</button>
      </div>
    );
  }

});

module.exports = InitialSetup; 
