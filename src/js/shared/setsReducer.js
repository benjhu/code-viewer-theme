export const name = "propertySets";

/**
 * Available actions for this reducer.
 */
export const actions = {
    ADD_SET: "SETS_ADD_SET",
    DELETE_SET: "SETS_DELETE_SET",
    AMEND_SET: "SETS_AMEND_SET"
};

/**
 * Returns the next state after amending a new set.
 *
 * @param {object} state state of available state
 * @param {object} setInfo information about the new set
 * @param {boolean} amend determines how the incoming set is treated
 */
const newSet = (state, setInfo, amend = false) => {
    // If set already exists, do nothing.
    // Or, if we try to amend when there is no set.
    if ((!amend && state[setInfo.id]) || (amend && !state[setInfo.id]))
        return state;

    return {
        ...state,
        nextID: setInfo.id + 1,
        sets: {
            ...state.sets,
            [setInfo.name]: {
                ...setInfo
            }
        }
    };
};

/**
 * A "sub-reducer" that updates the object containing the ID-property set pairs.
 * Accepts a an action formatted with:
 *  - setName: string name of incoming set
 *
 * @param {object} state the state of the Redux store
 * @param {object} action an action dispatched to the Redux store
 */
export const reducer = (state = { sets: {} }, action) => {
    switch (action.type) {
        case actions.ADD_SET:
            return newSet(state, {
                id: state.nextID,
                name: action.setName,
                displayName: action.displayName || action.setName,
                disabled: action.disabled
            });

        case actions.AMEND_SET:
            return newSet(state, {
                id: state.nextID,
                name: action.setName,
                displayName: action.displayName || action.setName,
                disabled: action.disabled
            }, true);

        default:
            return state;
    }
};

export default {
    name, actions, reducer
};