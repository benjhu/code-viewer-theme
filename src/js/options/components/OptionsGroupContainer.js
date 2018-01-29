import React from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import { isBinaryInput } from "Shared/Types";
import { kebabOrSpaceToCamel } from "root/js/util/utils";
import OptionsItem from "./OptionsItem";

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
        this.updateOptionsGroupState = this.updateOptionsGroupState.bind(this);

        this.state = {};
    }

    updateOptionsGroupState(optionName) {
        return e => {
            const target = e.target;

            this.setState({
                [optionName]: isBinaryInput(e.target.type) ?
                    target.checked : target.value
            });
        };
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

    render() {
        const { displayName, properties } = this.props;

        return (
            <Grid container>
                <Grid item xs={ 12 }>
                    <h1>{ displayName }</h1>
                </Grid>
                <Grid container item xs={ 12 }>
                    {
                        properties.map((property, i) => {
                            const propertyString = normalizeProperty(property.setID, property.property);

                            return (
                                <OptionsItem
                                    key={ i }
                                    type={ property.type }
                                    subscribeTo={ this.updateOptionsGroupState(propertyString) }
                                    state={ this.state[propertyString] || "" }
                                    { ...property } />
                            );
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

OptionGroupContainer.propTypes = {
    displayName: PropTypes.string,
    properties: PropTypes.array
};

export default OptionGroupContainer;