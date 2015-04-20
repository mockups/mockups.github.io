'use strict';

var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  DROPBOX_LOGIN: null,	        // Initiates login to Dropbox
  DROPBOX_LOGIN_FINISH: null    // Finishes login process to Dropbox
});
