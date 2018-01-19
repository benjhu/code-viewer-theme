import storage from "../util/storage";
import { Stringifier, CSSProperty, CSSDeclaration } from "./Stringifier";
import propertySets from "./property-sets/exports";
import { toConsole } from "../util/utils";

const buildProperties = (propertySet, override = false) => {
    return storage.getProperty(propertySet.name)
        .then(set => {
            const propertyStore = {};
            const props = propertySet.properties;
            const keys = Object.keys(props);

            keys.forEach(key => {
                if (!override && !propertyStore[key]) {
                    const prop = props[key];
                    const cssProp = new CSSProperty(prop.css);
                    const toAppend = set && set[prop.valueMapping] ?
                        set[prop.valueMapping] :
                        prop.defaultValue;

                    cssProp.append(toAppend);

                    if (prop.unit)
                        cssProp.append(prop.unit);

                    propertyStore[key] = cssProp;
                }
            });

            return propertyStore;
        });
};

const buildDeclarations = (propertySet, properties) => {
    // const properties = availableProperties[propertySet.name.toLowerCase()];
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
    const set = propertySets.find(set =>
        set.name.toLowerCase() === propertySetName.toLowerCase());

    if (!set)
        throw new Error(`Property set for '${propertySetName}' was not found. Aborting property set build.`);

    /*
    return buildDeclarations(
        set, buildProperties(set, false)
    ); */

    return buildProperties(set, false).then(store => buildDeclarations(set, store));
};