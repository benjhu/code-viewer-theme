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

    stringify() {
        return this.propertyName + ": " + this.build + ";";
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

    build() {
        const dec = this.declaration;
        let propertiesBuild = "";
        let header = "";
        let build;

        if (dec.id)
            header = header.concat("#", dec.id);

        if (dec.classNames)
            dec.classNames.forEach(className => {
                header = header.concat(".", className);
            });

        if (this.properties.length > 0)
            this.properties.forEach(property => {
                propertiesBuild = propertiesBuild.concat(property.stringify());
            });

        build = header.concat("{", propertiesBuild, "}");

        return build;
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
            this.build = this.build.concat(declaration.build());
        });

        return this.build;
    }
}