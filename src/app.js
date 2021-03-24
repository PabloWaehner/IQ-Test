import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Footer from "./Footer";
import IntelligenceTest from "./IntelligenceTest";
import Header from "./Header";
import testhistory from "./testhistory";
import Assessments from "./Assessments";
import Homepage from "./Homepage";
import Introduction from "./Introduction";
import Information from "./Information";
import IntelligenceInfo from "./IntelligenceInfo";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            console.log("App.js-componentDidMount: ", data);
            console.log("App.js-this.state: ", this.state);
            console.log("props in app.js: ", this.props);
            this.setState({
                id: data.id,
                firstname: data.first_name,
                lastname: data.last_name
            });
        });
    }

    render() {
        // if (!this.state.id) {
        //     return <div>Loading...</div>;
        // }
        const { firstname, lastname, id } = this.state;
        return (
            <div id="app">
                <BrowserRouter>
                    <div className="browser">
                        <Header />

                        <Route exact path="/" component={Homepage} />
                        <Route
                            exact
                            path="/intelligencetest"
                            component={IntelligenceTest}
                        />
                        <Route
                            exact
                            path="/introduction"
                            component={Introduction}
                        />
                        <Route
                            exact
                            path="/assessments"
                            component={Assessments}
                        />
                        <Route
                            exact
                            path="/testhistory"
                            component={testhistory}
                        />
                        <Route
                            exact
                            path="/information"
                            component={Information}
                        />
                        <Route
                            exact
                            path="/intelligenceinfo"
                            component={IntelligenceInfo}
                        />
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
