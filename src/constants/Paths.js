'use strict';

// Define action constants
module.exports = {
  LOGIN: "dropbox-auth",            // Initiates login to Dropbox
  OAUTH_RECIEVER: "oauth-reciever", // User is being redirected after authentication
  INITIAL_SETUP: "initial-setup",   // Set demo mockup
  FILE_LIST: "file-list",           // Display list of available resources
  MOCKUP_LIST: "mockup-list"        // Display list of mockups
};
