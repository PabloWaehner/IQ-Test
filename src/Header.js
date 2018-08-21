import React from "react";
import { Link } from "react-router-dom";
//stateless functional component
function Header() {
    return (
        <div className="header">
            <div>
                <Link to="/" className="link-in-header">
                    Home
                </Link>
            </div>
            <div>
                <Link to="/assessments" className="link-in-header">
                    Assessments
                </Link>
            </div>
            <div>
                <Link to="/testhistory" className="link-in-header">
                    Test History
                </Link>
            </div>
            <div>
                <Link to="/information" className="link-in-header">
                    Information about our tests
                </Link>
            </div>

            <a className="link-in-header" href="/logout">
                Log Out
            </a>
        </div>
    );
}
export default Header;
