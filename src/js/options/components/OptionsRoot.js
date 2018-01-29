import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { name as optionsReducerName } from "root/js/shared/optionsReducer";
import { name as setsReducerName } from "root/js/shared/setsReducer";
import OptionGroupContainer from "./OptionsGroupContainer";
import OptionsGroupContainer from "./OptionsGroupContainer";

/**
 * A dumb component that receives the available property sets
 * as props (via react-redux's connect) and displays an OptionsGroupContainer
 * for each property set. It passes only the properties with the same ID as
 * the property set being handled.
 *
 * About State:
 */
class OptionsRoot extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sets, properties } = this.props;
        const setInfo = Object.keys(sets).map(set => sets[set]);

        return (
            <div>
                {
                    setInfo.map((set, i) => (
                        <OptionsGroupContainer
                            key={ i }
                            properties={ properties.filter(property => property.setID === set.name) }
                            { ...set } />
                    ))
                }
            </div>
        );
    }
}

OptionsRoot.propTypes = {
    sets: PropTypes.object.isRequired,
    properties: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        sets: state[optionsReducerName].sets,
        properties: state[optionsReducerName].properties
    };
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps)(OptionsRoot);