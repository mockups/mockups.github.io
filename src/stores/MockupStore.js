'use strict';

var EventEmitter = require('events').EventEmitter;

var ActionTypes = require('../constants/ActionTypes');
var assign = require('object-assign');
var MockupsAppDispatcher = require('../dispatcher/MockupsAppDispatcher');
var DropboxStore = require('./DropboxStore');

var CHANGE_EVENT = 'change';


var MockupStore = assign({}, EventEmitter.prototype, {
  mockups: null,

  /**
   * Changes name of given mockup
   *
   * @param {string} params.id Identifies mockup to be renamed
   * @param {string} params.name New name that shall be given to mockup
   */
  rename(params) {
    console.log(DropboxStore);
    DropboxStore.set({
      table: "mockups",
      query: params.id,
      data: params.name
    });
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return MockupStore.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  addChangeListener(callback) {
    MockupStore.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  removeChangeListener(callback) {
    MockupStore.removeListener(CHANGE_EVENT, callback);
  }
});

MockupStore.dispatchToken = MockupsAppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {

    case ActionTypes.MOCKUP_RENAME:
    MockupStore.rename(action.data);
    break;

    default:
      // Do nothing
  }

});

module.exports = MockupStore; 
