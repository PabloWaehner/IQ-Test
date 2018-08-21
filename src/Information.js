import React from "react";
import { Link } from "react-router-dom";

//stateless functional component
function Information() {
    // console.log("profile pic: ", props);
    return (
        <div>
            <div className="positioning-tests">
                <Link
                    to="/personalitytestinfo"
                    style={{ textDecoration: "none" }}
                >
                    <div className="tests">
                        <p>PERSONALITY TEST</p>
                        <br /> <p>(coming soon)</p>
                    </div>
                </Link>

                <Link to="/Intelligenceinfo" style={{ textDecoration: "none" }}>
                    <div className="tests">
                        <p>INTELLIGENCE TEST</p>
                    </div>
                </Link>

                <Link
                    to="/selfesteemtestinfo"
                    style={{ textDecoration: "none" }}
                >
                    <div className="tests">
                        <p>SELF ESTEEM TEST</p>
                        <br /> <p>(coming soon)</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default Information;
