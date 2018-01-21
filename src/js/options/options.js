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
            elements[key].inheritFrom = `#view-${props[key].css}`;

        if (props[key].binary)
            elements[key].binary = true;

        elements[key].css = props[key].css;
    });
});

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
            const inheritFrom = qs(`#${set}-${value.css}-inherit`);

            if (value.inheritFrom && inheritFrom && inheritFrom.checked) {
                stateOfSet[key] = state[key];
                stateOfSet[`${key}Inherit`] = true;
            } else {
                stateOfSet[key] = props.binary ?
                    value.input.checked :
                    value.input.value;
            }
        });
    });

    return state;
};

const loadProperties = props => {
    storage.getProperties(props).then(loaded => {
        syncSettings.checked = loaded.syncSettings;
        lineHeight.value = loaded.lineHeight;
        fontFamily.value = loaded.fontFamily;
        fontSize.value = loaded.fontSize;

        Object.keys(propertySetInputNodes).forEach(propertySet => {
            const loadedPropertySet = loaded[propertySet];
            const props = propertySetInputNodes[propertySet];

            Object.keys(props).forEach(key => {
                const prop = props[key];
                const inheritCheckBox = qs(`${propertySet}-${prop.css}-inherit`);
                let set;

                if (loadedPropertySet[`${key}Inherit`]) {
                    set = loaded[key];
                    prop.input.disabled = true;
                } else {
                    set = loadedPropertySet[key];
                    prop.input.disabled = false;
                }

                if (prop.binary)
                    prop.input.checked = set;
                else
                    prop.input.value = set;

                if (inheritCheckBox)
                    inheritCheckBox.checked = prop.input.disabled;
            });
        });
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