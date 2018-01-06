import storage from "./storage";
import defaultProperties from "./propertyDefaults";
import { dialog } from "./materialize.scripts";

const syncSettings = document.querySelector("#sync-settings");
const fontFamily = document.querySelector("#view-font-family");
const fontSize = document.querySelector("#view-font-size");
const lineHeight = document.querySelector("#view-line-height");
const saveButton = document.querySelector("#save-settings");
const resetButton = document.querySelector("#reset-settings");

// Once called, return the current state of the values of the
// settings in the UI.
const propertyState = () => {
    return {
        syncSettings: syncSettings.checked,
        lineHeight: lineHeight.value,
        fontFamily: fontFamily.value,
        fontSize: fontSize.value
    };
};

const loadProperties = props => {
    storage.getProperties(props).then(loaded => {
        syncSettings.checked = loaded.syncSettings;
        lineHeight.value = loaded.lineHeight;
        fontFamily.value = loaded.fontFamily;
        fontSize.value = loaded.fontSize;
    });
};

const setProperties = (props, dialogMessage) => {
    // Refresh UI once properties are loaded.
    storage.setProperties(props, () => {
        loadProperties(defaultProperties);
        dialog(dialogMessage);
    });
};

// On init, restore properties using the storage API.
loadProperties(defaultProperties);

// Add event listeners
syncSettings.addEventListener("click", () => storage.setProperty("syncSettings", syncSettings.checked));
saveButton.addEventListener("click", () => setProperties(propertyState(), "Updated properties"));
resetButton.addEventListener("click", () => setProperties(defaultProperties, "Restored default properties"));