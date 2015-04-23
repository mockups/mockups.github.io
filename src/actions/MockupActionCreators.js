'use strict';

var Dispatcher = require('../dispatcher/MockupsAppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var MockupActionCreators = {

  renameMockup: function(data) {
    Dispatcher.handleAction({
      type: ActionTypes.MOCKUP_RENAME,
      data: data
    });
  }

};

module.exports = MockupActionCreators;
