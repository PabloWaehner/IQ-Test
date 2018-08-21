import React from "react";
import { connect } from "react-redux";

import { finalScore } from "./Actions";

const mapStateToProps = state => {
    console.log("state-Result.js: ", state);
    return {
        score: state.score
    };
};

class Result extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.score:", this.props.score);
        this.props.dispatch(finalScore(this.props.score));
        const { score } = this.props;
        if (score >= 0 && score < 5) {
            this.setState({
                message: "below average",
                Y: "challenging"
            });
        } else if (score >= 5 && score < 7) {
            this.setState({
                message: "average",
                Y: "sometimes challenging"
            });
        } else if (score == 8) {
            this.setState({
                message: "above average",
                Y: "sometimes fun but ocassionally challenging",
                congratulations: "Well done!"
            });
        } else if (score == 9) {
            this.setState({
                message: "high",
                Y: "fun and exciting",
                congratulations: "Well done!"
            });
        } else if (score >= 10) {
            this.setState({
                message: "very high",
                Y: "fun and exciting",
                congratulations: "Well done!"
            });
        }
    }

    render() {
        const { score } = this.props;
        const { message, Y, congratulations } = this.state;
        return (
            <div className="feedback">
                <p id="results-feedback">Your Results</p>
                <p>
                    In this test you solved correctly{" "}
                    <u>
                        <b>{score} questions out of 11</b>
                    </u>. {congratulations} Based on your results, your general
                    intelligence is likely to be{" "}
                    <u>
                        <b>{message}</b>
                    </u>.
                    <br />What does that actually mean? Compared to other
                    people, your ability to identify rules in new tasks without
                    prior learning or knowledge is{" "}
                    <u>
                        <b>{message}</b>
                    </u>. Thus, compared to other people, you are likely to find
                    dealing with new activities or entering new environments {Y}.
                    <br />Can I improve my intelligence? Scientific findings are
                    inconsistent regarding the potential of people to improve
                    their intelligence. Studies do show that functioning is more
                    optimal when people are more comfortable and enjoying what
                    they are doing, when people are interested in learning and
                    developing their abilities, and most interestingly – when
                    people believe intelligence can be improved.<br /> Please
                    note that this test cannot serve as an official certificate
                    of your intelligence score.<br />
                    We hope you enjoyed the assessment!
                </p>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Result);
