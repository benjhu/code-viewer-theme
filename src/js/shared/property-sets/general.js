import Types from "Shared/Types";

export const name = "General";

export const properties = {
    fontFamily: {
        css: "font-family",
        type: Types.TEXT,
        defaultValue: "monospace"
    },
    fontSize: {
        css: "font-size",
        type: Types.NUMBER,
        unit: "px",
        defaultValue: 16
    },
    lineHeight: {
        css: "line-height",
        unit: "em",
        defaultValue: 1.5
    }
};