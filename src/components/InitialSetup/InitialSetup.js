'use strict';

import DropboxActions from '../../actions/DropboxActionCreators';

var React = require('react/addons');

var InitialSetup = React.createClass({

  render() {
    return (
      <div className="InitialSetup">
        <p>Please select a name for new folder where the demo mockup will be added and your own mockups will be stored</p>
        <input type="text" name="rootFolder" value="mockups.eu" />
        <button type="button">Create</button>
      </div>
    );
  }

});

module.exports = InitialSetup; 
