export const name = "GitHub";
export const url = "https://github.com/*/*";

export const properties = {
    fontFamily: {
        css: "font-family",
        valueMapping: "fontFamily",
        defaultValue: "Hack"
    },
    fontSize: {
        css: "font-size",
        valueMapping: "fontSize",
        defaultValue: "16",
        unit: "px"
    },
    lineHeight: {
        css: "line-height",
        valueMapping: "lineHeight",
        defaultValue: "1.5",
        unit: "em"
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