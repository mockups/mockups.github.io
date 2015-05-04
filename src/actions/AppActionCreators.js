'use strict';

var Dispatcher = require('../dispatcher/MockupsAppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var AppActionCreators = {

  transition: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.APP_TRANSITION,
      data: data
    });
  }

};

module.exports = AppActionCreators;
