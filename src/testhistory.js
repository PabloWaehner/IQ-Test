import React from "react";
import axios from "./axios";
//stateless functional component
export default class testhistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get("/user", this.state).then(({ data }) => {
            console.log("testhistory.js-componentDidMount: ", data);
            console.log(
                "testhistoryfinalscore.js-componentDidMount: ",
                data.final_score
            );
            if (!data.final_score && data.final_score != 0) {
                this.setState({
                    message: "You haven't taken any test yet"
                });
            } else {
                if (data.final_score >= 0 && data.final_score < 5) {
                    this.setState({
                        message: "Your IQ is likely below average"
                    });
                } else if (data.final_score >= 5 && data.final_score < 7) {
                    this.setState({
                        message: "Your IQ is likely average"
                    });
                } else if (data.final_score == 8) {
                    this.setState({
                        message: "Your IQ is likely above average"
                    });
                } else if (data.final_score == 9) {
                    this.setState({
                        message: "Your IQ is likely high"
                    });
                } else if (data.final_score >= 10) {
                    this.setState({
                        message: "Your IQ is likely very high"
                    });
                }
            }
        });
    }
    render() {
        return (
            <div className="testhistory">
                <p>{this.state.message}</p>
            </div>
        );
    }
}
