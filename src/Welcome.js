import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";

function Welcome() {
    console.log("Welcome.js");
    return (
        <div>
            <HashRouter>
                <div className="firstpage">
                    <div className="blueline" />
                    <h1 className="testyouriq">Take a Free IQ Test!</h1>
                    <Route
                        exact
                        path="/registration"
                        component={Registration}
                    />
                    {/*<Route exact path="/" component={Registration} />*/}
                    <Route exact path="/login" component={Login} />
                    <Footer />
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
