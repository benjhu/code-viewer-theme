/* global chrome */

const store = chrome.storage;
const local = store.local;

class StorageManager {
    constructor() {
        // Default storage will be the chrome sync storage
        this.storage = store.sync;
    }

    setStore(sync = true) {
        if (sync && this.storage !== store.sync)
            this.storage = store.sync;
        else
            this.storage = store.local;
    }

    getStore() {
        return this.storage;
    }

    /**
     * Retrieves a property with the give name and returns a Promise
     * that resolves to that value.
     *
     * @param {string} property a property name
     * @param {function} callback a callback to be called once a value of the property has been resolved
     */
    getProperty(property, callback) {
        return new Promise((resolve, reject) => {
            this.storage.get(property, opt => {
                if (opt) {
                    if (callback)
                        callback();

                    resolve(opt[property]);
                }

                else reject(new Error("Unable to load property."));
            });
        });
    }

    setProperty(property, value, callback) {
        return new Promise((resolve, reject) => {
            const store = {
                [property]: value
            };

            this.storage.set(store, () => {
                if (callback)
                    callback();

                resolve(true);
            });
        });
    }

    getProperties(properties, callback) {
        // Return a Promise that resolves once we have the loaded props.
        return new Promise((resolve, reject) => {
            this.storage.get(properties, opts => {
                if (opts) {
                    if (callback)
                        callback();

                    resolve(opts);
                }

                else reject(new Error("Unabled to load properties. Please submit an issue."));
            });
        });
    }

    setProperties(properties, callback) {
        return new Promise((resolve, reject) => {
            this.storage.set(properties, () => {
                if (callback)
                    callback();

                resolve(true);
            });
        });
    }
}

const storageManager = new StorageManager();
export default storageManager;