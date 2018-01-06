const store = chrome.storage;

class StorageManager {
    constructor() {
        // Default storage will be the chrome sync storage
        this.storage = store.sync;
    }

    setStore(sync) {
        if (sync && this.storage !== store.sync)
            this.storage = store.sync;
        else
            this.storage = store.local;
    }

    getStore() {
        return this.storage;
    }

    getProperty(property) {
        return new Promise((resolve, reject) => {
            this.storage.get(property, opt => {
                if (opt)
                    resolve(opt[property]);
                else reject(new Error("Unable to load property."));
            });
        });
    }

    setProperty(property, value) {
        return new Promise((resolve, reject) => {
            const store = {};
            store[property] = value;

            this.storage.set(store, () => {
                resolve(true);
            });
        });
    }

    getProperties(properties) {
        // Return a Promise that resolves once we have the loaded props.
        return new Promise((resolve, reject) => {
            this.storage.get(properties, opts => {
                if (opts)
                    resolve(opts);
                else reject(new Error("Unabled to load properties. Please submit an issue."));
            });
        });
    }

    setProperties(properties) {
        return new Promise((resolve, reject) => {
            this.storage.set(properties, () => {
                resolve(true);
            });
        });
    }
}

const storageManager = new StorageManager();
export default storageManager;