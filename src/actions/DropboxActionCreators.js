'use strict';

var Dispatcher = require('../dispatcher/MockupsAppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var DropboxActionCreators = {

  initLogin: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_LOGIN,
      data: data
    });
  },

  finishLogin: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_LOGIN_FINISH,
      data: data
    });
  },

  logout: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_LOGOUT,
      data: data
    });
  },

  checkFolderExist: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_CHECK_FOLDER_EXISTS,
      data: data
    });
  },

  createRootFolder: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_CREATE_ROOT_FOLDER,
      data: data
    });
  },

  createDemo: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_CREATE_DEMO,
      data: data
    });
  },

  readyDatastore: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_DATASTORE_READY,
      data: data
    });
  }

};

module.exports = DropboxActionCreators;
