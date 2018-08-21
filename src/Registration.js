import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Cookies from "./Cookies";

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            cookiesIsVisible: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideCookiesWarning = this.hideCookiesWarning.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("cookiesinregistration")) {
            setTimeout(() => {
                this.setState({ cookiesIsVisible: true });
            }, 500);
        }
    }
    hideCookiesWarning() {
        this.setState({
            cookiesIsVisible: false
        });
        localStorage.setItem("cookiesinregistration", true);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("Running handleSubmit", this.state);
        axios.post("/registration", this.state).then(resp => {
            console.log("resp.data: ", resp.data);
            if (resp.data.error) {
                this.setState({
                    error: resp.data.error
                });
            } else {
                location.replace("/");
            }
        });
    }

    render() {
        return (
            <div className="registration">
                <h1 className="margin-bottom">Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        name="firstname"
                        placeholder="Name"
                        type="text"
                    />
                    <div>
                        <input
                            onChange={this.handleChange}
                            name="lastname"
                            placeholder="Last name"
                            type="text"
                        />
                    </div>
                    <div>
                        <input
                            onChange={this.handleChange}
                            name="email"
                            placeholder="Email"
                            type="email"
                        />
                    </div>
                    <div className="center-button">
                        <input
                            onChange={this.handleChange}
                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                        <div>
                            <button className="submit-button" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <div align="center">
                    <div>Already a member?</div>
                    <Link to="/login">Click here to Log in</Link>

                    {this.state.error ? (
                        <div className="error">ERROR: {this.state.error}</div>
                    ) : null}
                </div>

                {this.state.cookiesIsVisible && (
                    <div id="modal">
                        <button
                            className="accept"
                            onClick={this.hideCookiesWarning}
                        >
                            Accept
                        </button>
                        <div className="no-modal">
                            <Cookies />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Registration;
