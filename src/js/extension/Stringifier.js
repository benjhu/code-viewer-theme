const isCSSProperty = value => value instanceof CSSProperty;

export class CSSProperty {
    constructor(propertyName) {
        this.propertyName = propertyName;
        this.build = "";
    }

    append(value, delimiter = "") {
        this.build = this.build.concat(value, delimiter);
        return this;
    }

    stringify(important = true) {
        const str = this.propertyName + ": " + this.build;

        return (important ? str.concat(" !important") : str).concat(";");
    }
}

export class CSSDeclaration {
    constructor(declaration) {
        this.declaration = declaration;
        this.properties = [];
    }

    append(cssProperty) {
        if (!isCSSProperty(cssProperty))
            throw new Error("Invalid CSS Property passed.");

        this.properties.push(cssProperty);
        return this;
    }

    appendMultiple(...cssProperties) {
        const conflicts = cssProperties.filter(value => !isCSSProperty(value));

        if (conflicts.length > 0)
            throw new Error("Expected an array of CSS Properties.");

        this.properties = [...this.properties, ...cssProperties];
        return this;
    }

    stringify() {
        const dec = this.declaration;
        let propertiesBuild = "";
        let header = "";

        if (dec.classNames && dec.classNames.length > 0) {
            header = dec.classNames.map(className => {
                let singleCSSDeclaration = "";

                if (dec.id)
                    singleCSSDeclaration = singleCSSDeclaration.concat("#", dec.id);

                return singleCSSDeclaration.concat(".", className);
            }).join(",");
        }

        if (this.properties.length > 0)
            this.properties.forEach(property => {
                propertiesBuild = propertiesBuild.concat(property.stringify());
            });

        return header.concat("{", propertiesBuild, "}");
    }
}

export class Stringifier {
    constructor() {
        this.build = "";
        this.declarations = [];
    }

    add(declaration) {
        if (!(declaration instanceof CSSDeclaration))
            throw new Error("Invalid declaration passed.");

        this.declarations.push(declaration);
        return this;
    }

    stringify() {
        this.declarations.forEach(declaration => {
            this.build = this.build.concat(declaration.stringify());
        });

        return this.build;
    }
}