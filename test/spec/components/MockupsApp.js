'use strict';

describe('MockupsApp', function () {
  var React = require('react/addons');
  var MockupsApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    MockupsApp = require('components/MockupsApp.js');
    component = React.createElement(MockupsApp);
  });

  it('should create a new instance of MockupsApp', function () {
    expect(component).toBeDefined();
  });
});
