'use strict';

describe('DropboxStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/DropboxStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
