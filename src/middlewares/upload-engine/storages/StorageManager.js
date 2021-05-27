const DiskStorage = require("./DiskStorage");

class StorageManager {
  constructor(options) {
    this.storages = {
      disk: new DiskStorage(options),
    };
  }

  get(name) {
    return this.storages[name];
  }
}

module.exports = StorageManager;
