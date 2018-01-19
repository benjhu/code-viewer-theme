import storage from "../util/storage";
import defaultProperties from "./propertyDefaults";
import { dialog } from "./materialize.scripts";
import propertySets from "../extension/property-sets/exports";

const qs = window.document.querySelector.bind(document);

// GENERAL
const syncSettings = qs("#sync-settings");
const fontFamily = qs("#view-font-family");
const fontSize = qs("#view-font-size");
const lineHeight = qs("#view-line-height");
const saveButton = qs("#save-settings");
const resetButton = qs("#reset-settings");

const propertySetInputNodes = {};

// Automatically create references to the DOM nodes that supply the option
// value.
propertySets.forEach(propertySet => {
    const name = propertySet.name.toLowerCase();

    propertySetInputNodes[name] = {};
    const elements = propertySetInputNodes[name];
    const props = propertySet.properties;

    Object.keys(props).forEach(key => {
        elements[key] = {
            input: qs(`#${name}-${props[key].css}`),
        };

        if (props[key].inheritable)
            elements[key].inheritFrom = qs(`#view-${props[key].css}`);

        if (props[key].binary)
            elements[key].binary = true;
    });
});

console.log(propertySetInputNodes);

// Once called, return the current state of the values of the
// settings in the UI.
const propertyState = () => {
    const state = {
        syncSettings: syncSettings.checked,
        lineHeight: lineHeight.value,
        fontFamily: fontFamily.value,
        fontSize: fontSize.value
    };

    Object.keys(propertySetInputNodes).forEach(set => {
        const stateOfSet = state[set] = {};
        const props = propertySetInputNodes[set];

        Object.keys(props).forEach(key => {
            const value = props[key];
            stateOfSet[key] = props.binary ? value.input.checked : value.input.value;
        });
    });

    return state;
};

// Todo: delete
window.__propState = propertyState;

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
syncSettings.addEventListener("click", () => storage.setProperty("syncSettings", syncSettings.checked, () => {
    dialog(
        syncSettings.checked ?
            "Settings will be synced to your Google account." :
            "Settings will not be synced to your Google account"
    );
}));
saveButton.addEventListener("click", () => setProperties(propertyState(), "Updated properties"));
resetButton.addEventListener("click", () => setProperties(defaultProperties, "Restored default properties"));