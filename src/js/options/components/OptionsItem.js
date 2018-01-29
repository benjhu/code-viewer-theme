import React from "react";
import PropTypes from "prop-types";
import { convertToDisplayName as convert } from "Shared/property-sets/exports";
import Types from "Shared/Types";
import Grid from "material-ui/Grid";
import ControlSwitch from "./inputs/ControlSwitch";

/**
 * An child of an options container. Given a type of the option,
 * this component acts like a switch to determin what kind of
 * UI control to render.
 *
 * This component receives a function as a prop to notify the container
 * that the option's UI control has been updated by the user.
 */
class OptionsItem extends React.Component {
    render() {
        const { setID, property, state, type, unit } = this.props;
        const notifyUpdate = this.props.subscribeTo;

        const passTheseProps = {
            id: `${setID}-${property}`,
            label: convert(property),
            fullWidth: true,
            InputLabelProps: { shrink: true },
            unit: unit || null,
            value: state
        };

        return (
            <React.Fragment>
                <Grid item xs={8}>
                    <ControlSwitch
                        type={ type }
                        inputProps={ passTheseProps }
                        update={ notifyUpdate } />
                </Grid>
            </React.Fragment>
        );
    }
}

OptionsItem.propTypes = {
    subscribeTo: PropTypes.func,
    property: PropTypes.string,
    state: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.string, PropTypes.number
    ])
};

export default OptionsItem;