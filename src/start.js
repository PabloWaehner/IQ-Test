import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import axios from "./axios";
import App from "./app";

// REDUX STUFF
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./Reducers";
//

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
console.log("reducer start.js:", reducer);
console.log("store start.js:", store);
// this is what it console.logs when the reducers.js is empty:
// reducer blah: ƒ () {
// 	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
// 	    var action = arguments[1];
//
// 	    return state;
// 	}

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (location.pathname == "/welcome") {
    console.log("welcome.start.js");
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    console.log("App-start.js");
    ReactDOM.render(elem, document.querySelector("main"));
}
