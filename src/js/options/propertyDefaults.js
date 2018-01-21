import propertySets from "../extension/property-sets/exports";

const defaults = {
    syncSettings: true,
    lineHeight: 1.5,
    fontFamily: "Courier New",
    fontSize: 16
};

// Add the property sets to the defaults object.
propertySets.forEach(set => {
    defaults[set.name.toLowerCase()] = {};
});

export default defaults;