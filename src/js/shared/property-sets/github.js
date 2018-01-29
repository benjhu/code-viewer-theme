import Types from "root/js/shared/Types";

export const name = "GitHub";
export const url = "https://github.com/*/*";

export const properties = {
    fontFamily: {
        css: "font-family",
        valueMapping: "fontFamily",
        type: Types.TEXT,
        defaultValue: "Hack",
        inheritable: true
    },
    fontSize: {
        css: "font-size",
        valueMapping: "fontSize",
        type: Types.NUMBER,
        defaultValue: 18,
        unit: "px",
        inheritable: true
    },
    lineHeight: {
        css: "line-height",
        valueMapping: "lineHeight",
        type: Types.NUMBER,
        defaultValue: 1.5,
        unit: "em",
        inheritable: true
    }
};

export const cssDeclarations = [
    {
        name: "main",
        classNames: ["blob-code-inner", "another-property"],
        properties: ["fontFamily", "fontSize", "lineHeight"]
    },
    {
        name: "line-numbers",
        classNames: ["js-line-number"],
        properties: ["fontSize", "lineHeight"]
    }
];