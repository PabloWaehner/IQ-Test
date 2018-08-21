import React from "react";
import { Link } from "react-router-dom";
//stateless functional component
function Introduction() {
    return (
        <div className="introduction">
            <h3 className="title-introduction">
                The Raven Matrix Intelligence Test
            </h3>{" "}
            <div className="text-introduction">
                The purpose of this short test{" "}
                <u>
                    <b>(up to 8 minutes)</b>
                </u>{" "}
                is to assess your ability to process information and reason to
                solve problems and identify logical rules. This test is a
                non-verbal, culture-fair multiple choice IQ test, which measures
                your fluid intelligence. Indeed, this test is one of the most
                highly correlated assessments with IQ scores. <br />In this
                test, you will be presented with{" "}
                <u>
                    <b>11 questions</b>
                </u>. <br />In each question, you will be asked to identify the
                missing element that completes a pattern of shapes. Please note
                that each item is limited to{" "}
                <u>
                    <b>45 seconds</b>
                </u>. A clock will be presented, and once your time is up you
                will automatically be directed to the following item.{" "}
                <p>Have fun and good luck!</p>
            </div>
            <div className="link-in-introduction">
                <Link to="/intelligencetest" className="linkonhover">
                    Click here to start the test
                </Link>
            </div>
        </div>
    );
}
export default Introduction;
