import chai from "chai";
import { createStore } from "redux";
import { actions, reducer as optionsReducer } from "../../../src/js/shared/optionsReducer";
import { actions as setsActions } from "../../../src/js/shared/setsReducer";
import Types from "../../../src/js/shared/Types";

const assert = chai.assert;
const OPTIONS_UPDATE = actions.UPDATE;

/* global describe, it, beforeEach */

describe("Options Reducer", () => {
    it("state is populated", () => {
        assert.deepEqual({ properties: [], nextID: 0, sets: {} }, optionsReducer(undefined, undefined));
    });

    describe("Options reducer in the Redux store", () => {
        let store;
        const populate = [
            {
                setID: 0,
                property: "font-family",
                value: "monospace",
                type: Types.TEXT
            },
            {
                setID: 0,
                property: "font-size",
                value: 16,
                unit: "px",
                type: Types.NUMBER
            },
            {
                setID: 0,
                property: "color",
                value: "black",
                type: Types.TEXT
            },
            {
                setID: 0,
                property: "background",
                value: "transparent",
                type: Types.TEXT
            }
        ];

        beforeEach("New Redux Store", () => {
            store = createStore(optionsReducer);
        });

        it("property added to store", () => {
            store.dispatch({
                type: OPTIONS_UPDATE,
                setID: 0,
                property: "font-family",
                setAs: "Menlo",
                propertyType: Types.TEXT
            });

            assert.equal(1,
                store.getState().properties.length);
        });

        it("multiple properties added to store", () => {
            populate.forEach(
                ({ setID, property, value, type }) => store.dispatch({
                    type: OPTIONS_UPDATE,
                    setID, property,
                    setAs: value,
                    propertyType: type
                })
            );

            assert.equal(populate.length,
                store.getState().properties.length);
        });

        it("a single property is properly replaced; property type is not mutated", () => {
            populate.forEach(
                ({ setID, property, value, type }) => store.dispatch({
                    type: OPTIONS_UPDATE,
                    setID, property,
                    setAs: value,
                    propertyType: type
                })
            );

            let initialSize = store.getState().properties.length;

            // Should replace font-family
            const addThis = {
                setID: 0,
                property: "font-family",
                value: "Menlo",
                type: Types.TEXT
            };

            store.dispatch({
                ...addThis,
                setAs: addThis.value,
                type: OPTIONS_UPDATE,
                propertyType: Types.NUMBER
            });

            let finalState = store.getState();
            const findFunction = ({ setID, property, value, type }) =>
                setID === addThis.setID &&
                property === addThis.property &&
                value === addThis.value &&
                type === addThis.type;

            // Final length equals initial length
            assert.equal(initialSize, finalState.properties.length);

            // Property in proper position
            assert.equal(0, finalState.properties.findIndex(findFunction));

            // Replaced property correctly
            assert.deepEqual(addThis, finalState.properties.find(findFunction));
        });
    });

    describe("Sets Reducer", () => {
        let store;

        const sets = [
            { name: "github" }, { name: "bitbucket" }, { name: "times" }
        ];

        beforeEach(() => {
            store = createStore(optionsReducer);
        });

        it("adds a set", () => {
            store.dispatch({
                type: setsActions.ADD_SET,
                setName: "github"
            });

            assert.nestedProperty(store.getState().sets, "github");
        });

        it("adds multiple sets and assigns ID's properly", () => {
            sets.forEach(set => {
                store.dispatch({
                    type: setsActions.ADD_SET,
                    setName: set.name
                });
            });

            const finalState = store.getState();

            Object.keys(finalState.sets).forEach((set, i) => {
                assert.equal(set, sets[i].name);
            });

            assert.equal(finalState.nextID, sets.length);
        });
    });
});