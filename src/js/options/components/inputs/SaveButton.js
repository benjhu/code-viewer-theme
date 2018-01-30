import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

/**
 * A wrapper for the Button component of Material-UI.
 * Accepts a prop "notify" that is bound to the "onClick"
 * event of the Button.
 */
const SaveButton = props => (
    <Button raised color="primary"
        onClick={ props.notify }>Save</Button>
);

SaveButton.defaultProps = {
    notify: () => {}
};

SaveButton.propTypes = {
    notify: PropTypes.func
};

export default SaveButton;