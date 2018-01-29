import { actions as setsActions } from "Shared/setsReducer";
import { actions } from "Shared/optionsReducer";
import store from "Shared/store";
import storage from "Utils/storage";
import propertySets from "Shared/property-sets/exports";

// Populate the store with property sets.
propertySets.forEach(set => {
    const { name, properties } = set;

    store.dispatch({
        type: setsActions.ADD_SET,
        setName: name.toLowerCase(),
        displayName: name,
        disabled: false
    });

    // Fetch the properties data from the storage.
    storage.getProperty(name.toLowerCase())
        .then(setData => {
            const propertyKeys = Object.keys(properties);

            propertyKeys.forEach(prop => {
                const { css, defaultValue, type, unit } = properties[prop];
                const loadedValue = setData ? setData[prop] : defaultValue;

                store.dispatch({
                    type: actions.UPDATE,
                    setID: name.toLowerCase(),
                    property: css,
                    setAs: loadedValue,
                    propertyType: type,
                    unit: unit || null
                });
            });
        });
});