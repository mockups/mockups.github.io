'use strict';

var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  APP_TRANSITION: null,                // Location change
  DROPBOX_LOGIN: null,                 // Initiates login to Dropbox
  DROPBOX_LOGIN_FINISH: null,          // Finishes login process to Dropbox
  DROPBOX_LOGOUT: null,                // Logouts user from Dropbox
  DROPBOX_CHECK_FOLDER_EXISTS: null,   // Checks if folder exists
  DROPBOX_CREATE_ROOT_FOLDER: null,    // Creates root folder and fill it with demo content
  DROPBOX_CREATE_DEMO: null,           // Creates demo mockup
  DROPBOX_DATASTORE_READY: null,       // Datastore ready for queries
  MOCKUP_CREATE: null,                 // Creates mockup
  MOCKUP_RENAME: null,                 // Renames mockup
  MOCKUP_START_EDIT: null              // Mockup has been opened for editing
});
