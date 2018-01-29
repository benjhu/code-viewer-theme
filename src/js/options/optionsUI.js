import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import OptionsRoot from "./components/OptionsRoot";
import store from "../shared/store";

ReactDOM.render(
    <Provider store={ store }>
        <OptionsRoot />
    </Provider>,
    document.querySelector("#root")
);