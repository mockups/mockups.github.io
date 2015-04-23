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
var mockups = [];

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

    client.readdir("/", (error, contents, folder, entries) => {
      /*console.log(error);
      console.log(contents);
      console.log(folder);
      console.log(entries);*/
      this.files = contents;
      this.emitChange();
    });
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
    var records = DropboxStore.get(params);

    if (!(params.query && records)) {
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
   * @param params {Object} Parameters for delete
   * @param params.table {string} Table to read from
   * @param params.key {string} Key to find a record
   */
  delete(params) {
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
    console.log(this.files, this.mockups);
    if (!datastore || 
        (this.files && this.files.length &&
         this.mockups && this.mockups.length) ) {
      return;
    }

    client.writeFile("/somefile.txt", "Hello", {}, () => {
      this.getFiles();
    });

    var res = this.set({
      table: "mockups",
      query: {
        name: "Demo mockup"
      },
      data: {
        name: "Demo mockup"
      }
    });
    console.log(res);
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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

module.exports = DropboxStore; 
