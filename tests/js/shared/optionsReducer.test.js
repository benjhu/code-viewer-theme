import chai from "chai";
import { createStore } from "redux";
import optionsReducer, { OPTIONS_UPDATE } from "../../../src/js/shared/optionsReducer";

const assert = chai.assert;

/* global describe, it, beforeEach */

describe("Options Reducer", () => {
    it("adds a property", () => {
        assert.deepEqual({ properties: [] }, optionsReducer(undefined, undefined));
    });

    describe("Options reducer in the Redux store", () => {
        let store;
        const populate = [
            {
                setID: 0,
                property: "font-family",
                value: "monospace"
            },
            {
                setID: 0,
                property: "font-size",
                value: "16px",
            },
            {
                setID: 0,
                property: "color",
                value: "black"
            },
            {
                setID: 0,
                property: "background",
                value: "transparent"
            }
        ];

        beforeEach("New Redux Store", () => {
            store = createStore(optionsReducer);
        });

        it("property added to store", () => {
            store.dispatch({
                type: OPTIONS_UPDATE,
                id: 0,
                setID: 0,
                property: "font-family",
                setAs: "Menlo"
            });

            assert.equal(1,
                store.getState().properties.length);
        });

        it("multiple properties added to store", () => {
            populate.forEach(
                ({ setID, property, setAs }) => store.dispatch({
                    type: OPTIONS_UPDATE,
                    setID, property,
                    value: setAs
                })
            );

            assert.equal(populate.length,
                store.getState().properties.length);
        });

        it("property is properly replaced", () => {
            populate.forEach(
                ({ setID, property, value }) => store.dispatch({
                    type: OPTIONS_UPDATE,
                    setID, property,
                    setAs: value
                })
            );

            let initialSize = store.getState().properties.length;

            // Should replace font-family
            const addThis = {
                setID: 0,
                property: "font-family",
                value: "Menlo"
            };

            store.dispatch({
                type: OPTIONS_UPDATE,
                setID: 0,
                property: "font-family",
                setAs: "Menlo"
            });

            let finalState = store.getState();
            const findFunction = ({ setID, property, value }) =>
                setID === addThis.setID &&
                property === addThis.property &&
                value === addThis.value;

            // Final length equals initial length
            assert.equal(initialSize, finalState.properties.length);

            // Property in proper position
            assert.equal(0, finalState.properties.findIndex(findFunction));

            // Replaced property correctly
            assert.deepEqual(addThis, finalState.properties.find(findFunction));
        });
    });
});