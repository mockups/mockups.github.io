'use strict';

// Define action constants
module.exports = {
  LOGIN: "dropbox-auth",            // Initiates login to Dropbox
  OAUTH_RECIEVER: "oauth-reciever",	// User is being redirected after authentication
  INITIAL_SETUP: "initial-setup"    // Set initial user preferences
};
