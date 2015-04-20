'use strict';

import Dispatcher from '../dispatcher/MockupsAppDispatcher';
import ActionTypes from '../constants/ActionTypes';

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
  }

};

module.exports = DropboxActionCreators; 
