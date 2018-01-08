export const name = "GitHub";

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
        classNames: ["blob-code-inner"],
        properties: ["fontFamily", "fontSize", "lineHeight"]
    }
];