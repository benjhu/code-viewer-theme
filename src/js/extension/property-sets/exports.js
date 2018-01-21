import * as githubPropertySet from "./github";

/**
 * Returns an object containing the key-value mappings of a {@code propertySet}'s properties and their default values.
 *
 * @param {object} propertySet a property set.
 * @returns {object} all properties and their default values.
 */
export const getDefaultProperties = propertySet => {
    const defaults = {};
    const keys = Object.keys(propertySet.properties);

    keys.forEach(key => {
        defaults[key] = propertySet[key].defaultValue;
    });

    return defaults;
};

// Export the property sets to be generated into CSS declarations.
export default [
    githubPropertySet
];