import { Stringifier, CSSProperty, CSSDeclaration } from "./Stringifier";
import propertySets from "./property-sets/exports";

import { toConsole } from "../util/utils";

const availableProperties = {};

const buildProperties = (propertySet, override = false) => {
    const name = propertySet.name.toLowerCase();

    if (!availableProperties[name])
        availableProperties[name] = {};

    const propertyStore = availableProperties[name];
    const props = propertySet.properties;
    const keys = Object.keys(props);

    keys.forEach(key => {
        if (!override && !propertyStore[key]) {
            const prop = props[key];

            const cssProp = new CSSProperty(prop.css);
            cssProp.append(prop.defaultValue);

            if (prop.unit)
                cssProp.append(prop.unit);

            propertyStore[key] = cssProp;
        }
    });
};

const stringify = (propertySet) => {
    const properties = availableProperties[propertySet.name.toLowerCase()];
    const declarations = propertySet.cssDeclarations;
    const stringifier = new Stringifier();

    declarations.forEach(declaration => {
        const dec = new CSSDeclaration(declaration);
        const props = declaration.properties;

        props.forEach(property => {
            if (properties[property]) {
                // If the property exists, append it.
                dec.append(properties[property]);
            } else
                toConsole(`Could not find CSS property '${property}' in property set '${propertySet.name}'; ignoring it.`, true);
        });

        stringifier.add(dec);
    });

    return stringifier;
};

export default propertySetName => {
    for (let propertySet of propertySets) {
        if (propertySet.name.toLowerCase() === propertySetName.toLowerCase()) {
            buildProperties(propertySet, false);
            return stringify(propertySet);
        }
    }

    return false;
};