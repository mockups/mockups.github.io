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
   * @param params.quiet True if authorization should proceed in non-interactive way
   */
  startAuthentication(params) {
    if (typeof params === undefined) {
      params = {
        interactive: true
      };
    }
    client.authenticate(params, DropboxStore.emitChange);
  },

  /**
   * Finish authenctication process and propogate login status
   */
  endAuthentication() {
    Dropbox.AuthDriver.Popup.oauthReceiver();
    DropboxStore.emitChange();
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return DropboxStore.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  addChangeListener(callback) {
    DropboxStore.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  removeChangeListener(callback) {
    DropboxStore.removeListener(CHANGE_EVENT, callback);
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

});

module.exports = DropboxStore; 
