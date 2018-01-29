import React from "react";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

/**
 * A component that abstracts form inputs. Returns a fully-functional
 * text field accepting only numeric values.
 *
 * Props:
 *  - id: identifier for DOM element
 *  - label: a label associated with the text field
 *  - update: a callback to be passed as the onChange prop of the field
 *  - InputLabelProps?: props for the inner InputLabel component
 *  - unit?: a unit to be "adorned" at the end of the text field
 *
 * @param {object} props props (functional React component)
 */
const NumberWithUnit = props => {
    const additionalProps = {
        id: props.id
    };

    if (props.unit)
        additionalProps["endAdornment"] = (
            <InputAdornment position="end">{ props.unit }</InputAdornment>
        );

    additionalProps["value"] = Number.isFinite(props.value) ?
        props.value : 0;

    return (
        <FormControl fullWidth={ !!props.fullWidth }>
            <InputLabel htmlFor={ props.id } { ...props.InputLabelProps }>{ props.label }</InputLabel>
            <Input
                { ...additionalProps }
                type="number"
                onChange={ props.update } />
        </FormControl>
    );
};

export default NumberWithUnit;