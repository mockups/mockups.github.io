'use strict';

describe('DropboxLogin', function () {
  var React = require('react/addons');
  var DropboxLogin, component;

  beforeEach(function () {
    DropboxLogin = require('components/DropboxLogin.js');
    component = React.createElement(DropboxLogin);
  });

  it('should create a new instance of DropboxLogin', function () {
    expect(component).toBeDefined();
  });
});
