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

/**
 * Converts a string in kebab case to a string suitable to be
 * displayed in UI.
 *
 * @param {string} kebab a string in kebab case
 */
export const convertToDisplayName = kebab => {
    return kebab.split("-")
        .map(chunk =>
            chunk.substr(0, 1)
                .toUpperCase()
                .concat(chunk.substring(1)))
        .join(" ");
};

// Export the property sets to be generated into CSS declarations.
export default [
    githubPropertySet
];