

    // Determine if current context is within a chrome packaged app or extension.
    // Then, determine if that app or extension manifest permissions include storage.
    isChromeApp = !!chrome.runtime;
    if (isChromeApp) {
      hasStoragePermission = chrome.runtime.getManifest().permissions.indexOf('storage') != -1;
    }

    Polymer('chrome-storage', {

      /**
       * Fired when a value is loaded from chrome.storage.
       * @event chrome-storage-load
       */

      /**
       * The key to the data stored in chrome.storage.
       *
       * @attribute name
       * @type string
       * @default null
       */
      name: '',

      /**
       * The data associated with the specified name.
       *
       * @attribute value
       * @type object
       * @default null
       */
      value: null,

      /**
       * If true, the value is stored and retrieved without JSON processing.
       *
       * @attribute useRaw
       * @type boolean
       * @default false
       */
      useRaw: false,

      /**
       * If true, auto save is disabled.
       *
       * @attribute autoSaveDisabled
       * @type boolean
       * @default false
       */
      autoSaveDisabled: false,

      /**
       * If true, use chrome.storage.sync. Otherwise, use chrome.storage.local.
       *
       * @attribute sync
       * @type boolean
       * @default false
       */
      sync: false,

      valueChanged: function() {
        if (this.loaded && !this.autoSaveDisabled) {
          isChromeApp && hasStoragePermission && this.save();
        }
      },

      nameChanged: function() {
        isChromeApp && hasStoragePermission && this.load();
      },

      load: function() {

        var storage = this.sync ? chrome.storage.sync : chrome.storage.local;

        storage.get(this.name, function (items) {
          if (this.useRaw) {
            this.value = items[this.name];
          } else {
            this.value = JSON.parse(items[this.name]);
          }
          this.asyncFire('chrome-storage-load');
        }.bind(this));

        this.loaded = true;

      },

      /**
       * Saves the value to localStorage.
       *
       * @method save
       */
      save: function() {

        var v = this.useRaw ? this.value : JSON.stringify(this.value);
        var obj = {};
        obj[this.name] = v;

        var storage = this.sync ? chrome.storage.sync : chrome.storage.local;

        storage.set(obj, function () {
          this.asyncFire('chrome-storage-save');
        }.bind(this))

      },

      ready: function () {
        if (!isChromeApp) {
          console.error('You are attempting to use chrome.storage in a non-chromeapp environment. This will not work.');
        } else if (!hasStoragePermission) {
          console.error('Your chrome app does not appear to have the storage permission in the manifest. The chrome-storage element requires this permission.');
        }
      }

    });

  ;

      Polymer('x-test1', {
        handleSave: function () {
          console.log('saved', this.value);
        },
        handleLoad: function () {
          console.log('loaded', this.value);
        }
      })
    ;

      Polymer('x-test2', {
        mode: false,
        handleSave: function () {
          console.log('saved', this.mode);
        },
        handleLoad: function () {
          console.log('loaded', this.mode);
        }
      });
    