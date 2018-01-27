import propertySets from "Shared/property-sets/exports";

const sets = {};
export const defaults = {
    syncSettings: true,
    lineHeight: 1.5,
    fontFamily: "Courier New",
    fontSize: 16
};

// Add the property sets to the defaults object.
propertySets.forEach(set => {
    sets[set.name.toLowerCase()] = {};
});

export default Object.assign({}, defaults, sets);