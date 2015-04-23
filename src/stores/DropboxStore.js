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
  receiverUrl: window.location.origin + "/" + Paths.OAUTH_RECIEVER
}));
var triedToLogin = false;
var busy = false;

// Datatables
var datastore = null;
var tables = {};
var demoFiles = [
  {
    url: "/demo/image.png",
    path: "/images/image.png",
    type: "image/png"
  }, 
  {
    url: "/demo/text.txt",
    path: "/text.txt",
    type: "text/plain"
  }
];

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

    return client.isAuthenticated();
  },


  busy: false,

  files: null,

  mockups: null,

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

      if (client.isAuthenticated()) {
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
   * @param params {Object} Parameters for search
   * @param params.table {string} Table to read from
   * @param params.query {Object} Set of conditions that records must match to be returned
   * @returns {(Object|Object[])} record or set of records that mathes query
   */
  find(params) {
    var results = tables[params.table].query(params.query || {});

    if (!results.length) {
      return [];
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

    if (targets) {
      targets.map(function(record) {
        return record.deleteRecord();
      });
    }
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
            return;
        }

        datastore = defaultDatastore;

        // Watch changes at datatables
        tables["mockups"] = datastore.getTable("mockups");
        datastore.recordsChanged.addListener( (event) => {
          var changedMockups = event.affectedRecordsForTable('mockups');
          this.mockups = this.find({table: "mockups"});
        });

        this.mockups = this.find({table: "mockups"});

        this.emitChange();
    });
  },

  createDemo() {
    if (!datastore || 
        (this.files && this.files.length &&
         this.mockups && this.mockups.length) ) {
      return;
    }

    var i = 0;

    // Upload demo files
    demoFiles.map(function(file) {
      getDemoFile(file, function(blob) {
        client.writeFile(file.path, blob, {}, function () {
          i++; 
          if (i >= demoFiles.length) {
            DropboxStore.getFiles();
          }
        });
      });
    });

    // Create demo mockup
    this.set({
      table: "mockups",
      query: {
        name: "Demo mockup"
      },
      data: {
        name: "Demo mockup"
      }
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
        return {
          path: path,
          nodes: [file],
          type: "file"
        };
      } else if (file.isFolder && file.path !== path) {
        var mock = {
          path: file.path,
          type: "folder"
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
