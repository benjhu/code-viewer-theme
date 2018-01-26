import * as Redux from "redux";
import reducers from "./reducers";

const store = Redux.createStore(
    Redux.combineReducers(reducers)
);

export default store;