import * as Redux from "redux";
import reducers from "./reducers";
import subscriptions from "./subscriptions";

const store = Redux.createStore(
    Redux.combineReducers(reducers)
);

subscriptions.forEach(subscription => store.subscribe(subscription));

export default store;