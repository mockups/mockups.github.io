'use strict';

import ActionTypes from '../constants/ActionTypes';
import Paths from '../constants/Paths';

var CHANGE_EVENT = 'change';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var MockupsAppDispatcher = require('../dispatcher/MockupsAppDispatcher');

// Dropbox setup
var Dropbox = require("dropbox");
var client = new Dropbox.Client({ key: '3eb74begb9zwvbz' });
client.authDriver(new Dropbox.AuthDriver.Popup({
  receiverUrl: window.location.origin + "/" + Paths.OAUTH_RECIEVER
}));

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
   * Start Dropbox authentication process
   */
  startAuthentication() {
    if (!DropboxStore.isLogged()) {
      client.authenticate(DropboxStore.emitChange);
    }
  },

  /**
   * Finish authenctication process and propogate login status
   */
  endAuthentication() {
    console.log("endAuth");
    Dropbox.AuthDriver.Popup.oauthReceiver();
    console.log("endAuth");
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
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

DropboxStore.dispatchToken = MockupsAppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {

    case ActionTypes.DROPBOX_LOGIN:
      DropboxStore.startAuthentication();
      break;

    case ActionTypes.DROPBOX_LOGIN_FINISH:
      DropboxStore.endAuthentication();
      break;

    default:
      // Do nothing

  }

  return true;

});

module.exports = DropboxStore; 
