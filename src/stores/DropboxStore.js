'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var MockupsAppDispatcher = require('../dispatcher/MockupsAppDispatcher');

var DropboxStore = assign({}, EventEmitter.prototype, {
  /**
   * Checks if client is logged into Dropbox
   *
   * @returns {Boolean} True if is logged, false otherwise.
   */
  isLogged() {
    return client.isAuthenticated();
  },

  /**
   * Gets page data by the given URL path.
   *
   * @param {String} path URL path.
   * @returns {*} Page data.
   */
  startAuthentication() {
    client.authDriver(new Dropbox.AuthDriver.Popup({
      receiverUrl: window.location.origin + '/oauth_receiver'
    }));
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  off(callback) {
    this.off(CHANGE_EVENT, callback);
  }
});

DropboxStore.dispatchToken = MockupsAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.DROPBOX_LOGIN:
      logging = true;
      DropboxStore.startAuthentication();
      DropboxStore.emitChange();
      break;

    default:
      // Do nothing

  }

});

module.exports = DropboxStore; 
