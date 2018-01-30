import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { actions } from "Shared/optionsReducer";
import { isBinaryInput } from "Shared/Types";
import { kebabOrSpaceToCamel } from "root/js/util/utils";
import OptionsItem from "./OptionsItem";
import TimeoutNotification from "./inputs/TimeoutNotification";

const normalizeProperty= (setName, property) => {
    return kebabOrSpaceToCamel(`${setName}-${property}`);
};

/**
 * A dumb component for rendering a group of options passed from
 * the Redux store via Context. Each option item in an options group will be
 * handed down a "subscribeTo" callback which subscribes the container to
 * all updates of the child.
 */
class OptionGroupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateOptionsGroupComponentState = this.updateOptionsGroupComponentState.bind(this);
        this.showSavedNotification = this.showSavedNotification.bind(this);
        this.unsave = this.unsave.bind(this);

        this.state = {
            // To render the TimeoutNotification component or not...
            showingSavedNotification: false
        };
    }

    updateOptionsGroupComponentState(optionName) {
        return e => {
            const target = e.target;

            this.setState({
                [optionName]: isBinaryInput(e.target.type) ?
                    target.checked :
                    (target.type === "number" ?
                        Number.parseFloat(target.value) :
                        target.value)
            });
        };
    }

    showSavedNotification() {
        this.setState({ showingSavedNotification: true });
    }

    unsave() {
        this.setState({ showingSavedNotification: false });
    }

    renderItems(properties) {
        console.log(properties);

        return properties.map((property, i) => {
            const propertyString = normalizeProperty(property.setID, property.property);
            const valueInState = this.state[propertyString];
            const passThisToItemProps =
                (valueInState === "" ? "" : valueInState  ||
                    Number.isFinite(valueInState) ? valueInState : 0);

            return (
                <OptionsItem
                    key={ i }
                    type={ property.type }
                    subscribeTo={ this.updateOptionsGroupComponentState(propertyString) }
                    state={ passThisToItemProps }
                    { ...property } />
            );
        });
    }

    componentWillReceiveProps(nextProps) {
        const { properties } = nextProps;

        if (properties !== this.props.properties) {
            properties.forEach(property =>
                this.setState({
                    [normalizeProperty(property.setID, property.property)]: property.value
                }));
        }
    }

    componentWillUnmount() {
        if (this.savedTimeout)
            clearInterval(this.savedTimeout);
    }

    render() {
        const { name, displayName, properties } = this.props;

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <h1>{ displayName }</h1>
                </Grid>
                <Grid container item xs={ 12 }>{ this.renderItems(properties) }</Grid>
                <Grid container item xs={12}>
                    <Grid item xs={2}>
                        <Button
                            raised color="primary"
                            onClick={ () => {
                                this.showSavedNotification();
                                this.props.updateOptionGroupState(name, this.state)(); } }>Save</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <TimeoutNotification
                            time={ 3000 }
                            activation={ this.state.showingSavedNotification }
                            onTimeout={ this.unsave }>Saved!</TimeoutNotification>
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            raised color="secondary"
                            onClick={ () => {} }>Restore</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

OptionGroupContainer.propTypes = {
    displayName: PropTypes.string,
    properties: PropTypes.array
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { properties } = ownProps;

    return {
        // Prop will be passed to a button UI control so it can sync the
        // UI state with the state of the Redux store.
        updateOptionGroupState: (setID, state) => e => {
            console.log("Updating State: ", state);

            properties.forEach(({ property, type, value, unit }) => {
                const valueInState = state[normalizeProperty(setID, property)];

                // Dispatch an action for each property in the group state.
                if (value !== valueInState) {
                    console.log("Setting to ", valueInState);

                    dispatch({
                        type: actions.UPDATE,
                        setAs: valueInState,
                        propertyType: type,
                        setID, property, unit
                    });
                }
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(OptionGroupContainer);