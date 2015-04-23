'use strict';

var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  DROPBOX_LOGIN: null,                 // Initiates login to Dropbox
  DROPBOX_LOGIN_FINISH: null,          // Finishes login process to Dropbox
  DROPBOX_LOGOUT: null,                // Logout user from Dropbox
  DROPBOX_CHECK_FOLDER_EXISTS: null,   // Checks if folder exists
  DROPBOX_CREATE_ROOT_FOLDER: null,    // Creates root folder and fill it with demo content
  DROPBOX_CREATE_DEMO: null            // Creates demo mockup
});
