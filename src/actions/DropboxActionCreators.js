'use strict';

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionConstants';

var DropboxActionCreators = {

  login: function(data) {
    Dispatcher.handleViewAction({
      type: ActionTypes.DROPBOX_LOGIN,
      data: data
    });
  }

};

module.exports = DropboxActionCreators; 
