import optionsReducer from "./optionsReducer";

const arrayOfReducers = [optionsReducer];

/**
 * All reducers for the web application portion of the extension.
 * Actions dispatched to the store should have types prefixed with the corresponding
 * reducer.
 */
const reducers = allReducers => {
    const r = {};

    allReducers.forEach(reducer => {
        r[reducer.name] = reducer.reducer;
    });

    return r;
};

export default reducers(arrayOfReducers);