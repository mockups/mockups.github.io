'use strict';

var EventEmitter = require('events').EventEmitter;

var ActionTypes = require('../constants/ActionTypes');
var Paths = require('../constants/Paths');
var assign = require('object-assign');
var MockupsAppDispatcher = require('../dispatcher/MockupsAppDispatcher');


var CHANGE_EVENT = 'change';

// Dropbox setup
var Dropbox = require("dropbox");
var client = new Dropbox.Client({ key: 'c3yzhain4om1l95' });
client.authDriver(new Dropbox.AuthDriver.Popup({
  receiverUrl: window.location.origin
}));
var triedToLogin = false;
var demoData = require('../constants/Demo');

// Datatables
var datastore = null;
var tables = {};

var DropboxStore = assign({}, EventEmitter.prototype, {

  /**
   * Checks if client is logged into Dropbox
   *
   * @returns {Boolean} True if is logged, false otherwise
   */
  isLogged() {
    if (!triedToLogin) {
      return undefined;
    }

    //return client.isAuthenticated();
    if (client.isAuthenticated()) {
      return datastore;
    } else {
      client.reset();
      return false;
    }
  },

  files: null,

  imageMap: {},

  /**
   * Checks if folder with provided path already exists
   * @param path {string} the path to the file or folder whose metadata will be read, relative to the user's Dropbox or to the application's folder
   * @param cb {Function} callback function
   * @returns {Boolean} true if folder can be created
   */ 
  checkFolderExists(path, cb) {
    client.stat(path, cb);
  },

  /**
   * Get list of all available files
   * @returns 
   */
  getFiles() {
    if (!client.isAuthenticated()) {
      return;
    }
    
    getFolderFiles("/");

  },

  /**
   * Start Dropbox authentication process
   * @param params {Object} Authentication parameters for Dropbox client
   * @param params.quiet {Boolean}  True if authorization should proceed in non-interactive way
   */
  authenticate(params) {
    if (typeof params === undefined) {
      params = {
        interactive: true
      };
    }

    client.authenticate(params, (error, data) => {
      triedToLogin = true;

      if (!error && client.isAuthenticated()) {
        this.openDatastore();
        this.getFiles();
      } else {
        this.emitChange();
      }
    });
  },

  /**
   * Writes data to specified table
   * @param params {Object} Parameters for write
   * @param params.table {string} Table to write to
   * @param params.query {Object} Set of conditions that records must match to be changed
   * @param params.data {Object} Record data
   * @returns {(Object|Object[])} record or set of records that has been changed
   */
  set(params) {
    var records = DropboxStore.find(params);

    if (!(params.query && records.length)) {
      return tables[params.table].insert(params.data);
    }

    records = records.map(function(record) {
      return record.update(params.data);
    });

    return records;
  },

  /**
   * Find record(s) from specified table
   * @param params {Object|String} Parameters for search
   * @param params.table {string} Table to read from
   * @param params.query {Object} Set of conditions that records must match to be returned
   * @returns {(Object|Object[])} record or set of records that mathes query
   */
  find(params) {
    var results;

    // Datastore is not yet opened
    if (!tables[params.table]) {
      return [];
    }

    if (typeof params.query === 'object' || typeof params.query === 'undefined') {
      results = tables[params.table].query(params.query || {});
    } else {
      results = [tables[params.table].get(params.query)];
    }

    return results;
  },

  /**
   * Remove record from specified table
   * @param params.table {string} Table to read from
   * @param params.key {string} Key to find a record
   */
  remove(params) {
    var targets = DropboxStore.find(params);

    targets.map(function(record) {
      return record.deleteRecord();
    });
  },

  /**
   * Finish authenctication process
   */
  closeAuthenticationModal() {
    Dropbox.AuthDriver.Popup.oauthReceiver();
  },

  /**
   * Logout user from Dropbox
   */
  logout() {
    client.signOut(DropboxStore.emitChange);
  },

  /**
   * Opens the Dropbox default datastore for an application
   */
  openDatastore() {
    var datastoreManager = client.getDatastoreManager();

    datastoreManager.openDefaultDatastore( (error, defaultDatastore) => {
        if (error) {
            console.log('Error opening default datastore: ' + error);
            client.reset();
            this.emitChange();
            return;
        }

        datastore = defaultDatastore;

        // Watch changes at datatables
        tables.mockups = datastore.getTable("mockups");
        datastore.recordsChanged.addListener( (event) => {
          var changedMockups = event.affectedRecordsForTable('mockups');
          this.emitChange();
        });

        this.emitChange();
    });
  },

  createDemo() {
    var files = this.files;
    var mockups = this.find({table: "mockups"});

    if (!datastore || 
        (files && files.length &&
         mockups && mockups.length) ) {
      return;
    }

    var i = 0;

    // Function to upload file
    var uploadFile = function(path, data, callback, tryNum) {
      tryNum = tryNum || 0;
      client.writeFile(path, data, {}, function (error, stat) {
        // Make sure item sucessfuly uploaded
        if (error && tryNum < 10) {
          uploadFile(path, data, callback, tryNum + 1);
        } else {
          i++;
        }

        if (i === demoData.files.length) {
          callback();
        }
      });
    };

    var finishUpload = function() {
      DropboxStore.getFiles();

      // Create demo mockup
      DropboxStore.set({
        table: "mockups",
        data: {
          name: "Demo mockup",
          objects: demoData.mockup
        }
      });
    };

    // Upload demo files
    demoData.files.map(function(file) {
      getDemoFile(file, function(blob) {
        uploadFile(file.path, blob, finishUpload);
      });
    });
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return DropboxStore.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  addChangeListener(callback) {
    DropboxStore.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  removeChangeListener(callback) {
    DropboxStore.removeListener(CHANGE_EVENT, callback);
  }
});

DropboxStore.dispatchToken = MockupsAppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {

    case ActionTypes.DROPBOX_LOGIN:
      DropboxStore.authenticate(action.data);
      break;

    case ActionTypes.DROPBOX_LOGIN_FINISH:
      DropboxStore.closeAuthenticationModal();
      break;

    case ActionTypes.DROPBOX_LOGOUT:
      DropboxStore.logout();
      break;

    case ActionTypes.DROPBOX_CHECK_FOLDER_EXISTS:
      DropboxStore.checkFolderExists(action.data.path, action.data.cb);
      break;

    case ActionTypes.DROPBOX_CREATE_DEMO:
      DropboxStore.createDemo();
      break;

    default:
      // Do nothing
  }

});

// Method to get demo files
var getDemoFile = function(file, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', file.url, true);
  xhr.responseType = 'blob';

  xhr.onload = function(e) {
    if (this.status === 200) {
      var blob = new Blob([this.response], {type: file.type});
      cb(blob);
    }
  };

  xhr.send();
};

var getFolderFiles = function(path, dir) {
 client.stat(path, {readDir: 10000}, (error, folder, contents) => {
    if (error || !contents || !contents.length) {
      return;
    }

    contents = contents.map(function(file) {
      if (file.isFile) {
        if (file.hasThumbnail) {
          file.thumbnail = client.thumbnailUrl(file.path);
        }
        if (file.mimeType.indexOf('image') > -1) {
          file.isImage = true;
          client.makeUrl(file.path, {download: true}, function(error, data) {
            if (data && !error) {
              DropboxStore.imageMap[file.path] = data.url;
              DropboxStore.emitChange();
            }
          });
        }
        return file;
      } else if (file.isFolder && file.path !== path) {
        var mock = {
          path: file.path,
          type: "folder",
          name: file.name
        };
        getFolderFiles(file.path, mock);
        return mock;
      }
    });

    if (dir) {
      dir.nodes = contents;
    } else {
      DropboxStore.files = contents;
    }

    DropboxStore.emitChange();
  });
};

module.exports = DropboxStore; 
