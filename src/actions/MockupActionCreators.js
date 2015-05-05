'use strict';

var Dispatcher = require('../dispatcher/MockupsAppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var MockupActionCreators = {

  rename: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_RENAME,
      data: data
    });
  },

  create: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_CREATE,
      data: data
    });
  },

  remove: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_REMOVE,
      data: data
    });
  },

  update: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_UPDATE,
      data: data
    });
  },

  startEdit: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_START_EDIT,
      data: data
    });
  },

  selectObject: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_SELECT_OBJECT,
      data: data
    });
  }

};

module.exports = MockupActionCreators;
