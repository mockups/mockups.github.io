'use strict';

import Dispatcher from '../dispatcher/MockupsAppDispatcher';
import ActionTypes from '../constants/ActionTypes';

var DropboxActionCreators = {

  login: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.DROPBOX_LOGIN,
      data: data
    });
  }

};

module.exports = DropboxActionCreators; 
