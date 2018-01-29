const types = {
    TEXT: Symbol("TEXT"),
    NUMBER: Symbol("NUMBER"),
    PERCENTAGE: Symbol("PERCENTAGE"),
    BINARY: Symbol("BINARY")
};

export const isBinaryInput = input => {
    let check = input.type;

    if (typeof input === "string")
        check = input;

    return check && (check === "checkbox" || check === "radio");
};

export const isReallyTyped = (value, type) => {
    switch (type) {
        case types.TEXT:
            return typeof value === "string";
        case types.NUMBER:
            return typeof value === "number";
        case types.PERCENTAGE:
            return typeof value === "string" &&
                value.endsWith("%") &&
                Number.parseInt(value.slice(0, value.length - 1));
        default:
            return false;
    }
};

export default types;