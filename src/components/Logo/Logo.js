'use strict';

var React = require('react/addons');

require('./Logo.scss');

var MockupsLogo = React.createClass({
  render() {
    var cx = React.addons.classSet;
    var classes = cx({
      "Logo": true,
      "Logo--small": this.props.type === "small",
      "Logo--big": this.props.type === "big"
    });

    return (
      <div className={classes}>
        <a href="/#/">
          <i className="fa fa-puzzle-piece Logo__Figure"></i>
          <div className="Logo__Label">UI Kit Mockups</div>
        </a>
      </div>
    );
  }
});

module.exports = MockupsLogo;
