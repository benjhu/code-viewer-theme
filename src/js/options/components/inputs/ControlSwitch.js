import React from "react";
import Types from "Shared/Types";
import TextField from "material-ui/TextField";
import NumberWithUnit from "./NumberWithUnit";

/**
 * A "switch" to render proper UI control based on the prop "type".
 * Renders a control corresponding to the types in "Shared/Types"
 *
 * Props:
 *  - type: a type from the Types namespace
 *  - inputProps: props to pass into a UI control component, flattened
 *  - update: a callback passed into UI controls that is called onChange
 *
 * @param {object} props props (functional React component)
 */
const ControlSwitch = props => {
    console.log(props);

    switch (props.type) {
        case Types.TEXT:
            return (
                <TextField
                    { ...props.inputProps }
                    onChange={ props.update } />
            );

        case Types.NUMBER:
            return (
                <NumberWithUnit
                    { ...props.inputProps }
                    update={ props.update } />
            );

        case Types.PERCENTAGE:
            return (
                <NumberWithUnit
                    { ...props.inputProps }
                    unit="%"
                    update={ e => {
                        const percentage = Number.parseInt(e.target.value);

                        if (percentage >= 0 && percentage <= 100)
                            props.update(e);
                    } } />
            );

        default:
            return null;
    }
};

export default ControlSwitch;