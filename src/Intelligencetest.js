import React from "react";
import { connect } from "react-redux";
import Result from "./Result";
import {
    seeQuestions,
    incrementScore,
    incrementCounter,
    resetCounter
} from "./Actions";
import axios from "./axios";

const mapStateToProps = state => {
    console.log("state-Assessments.js: ", state);
    console.log("state.assessments-Assessments.js: ", state.assessments);
    return {
        questions: state.assessments,
        counter: state.counter,
        score: state.score
    };
};

class Intelligencetest extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            score: 0,
            options: 0,
            time: 45
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        axios.get("/user", this.state).then(({ data }) => {
            console.log("testhistory.js-componentDidMount: ", data);
            console.log(
                "testhistoryfinalscore.js-componentDidMount: ",
                data.final_score
            );

            // console.log("date today data.create_at: ", data.create_at);
            // console.log("date today NEWDATE: ", new Date());
            // console.log("diferencia de dias: ", diffDays);
            // console.log("dateInTable: ", dateInTable);
            // console.log("date2: ", date2);
            let dateOfTest = new Date(`${data.create_at}`).toLocaleString(
                "en-GB"
            );
            let dateInTable = new Date(`${data.create_at}`);
            let date2 = new Date();
            let timeDiff = Math.abs(date2.getTime() - dateInTable.getTime());
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            let leftDays = 31 - diffDays;
            if (data.final_score && leftDays > 0) {
                this.setState({
                    message: `You have to wait ${leftDays} days before you can take the test again.`,
                    message2: `You took the test on the ${dateOfTest}.`
                });
            } else {
                this.props.dispatch(seeQuestions());
            }
        });

        this.timer = setInterval(() => {
            if (this.props.counter < 11) {
                this.setState(
                    {
                        time: this.state.time - 1
                    },
                    () => {
                        if (this.state.time == 0) {
                            this.props.dispatch(incrementCounter());
                            this.setState({
                                time: 45
                            });
                        }
                    }
                );
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.props.dispatch(resetCounter());
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                console.log("handleChange: ", this.state);
                console.log("event: ", e);
            }
        );
    }
    handleSubmit(e) {
        this.props.dispatch(incrementCounter());
        if (
            this.state.options ==
            this.props.questions[this.props.counter].answer
        ) {
            this.props.dispatch(incrementScore());
        }
        this.elem1.checked = false;
        this.elem2.checked = false;
        this.elem3.checked = false;
        this.elem4.checked = false;
        this.elem5.checked = false;
        this.setState({
            options: null,
            time: 45
        });
    }

    render() {
        console.log("this.props-Assessments.js: ", this.props);
        console.log("this.state-Assessments.js: ", this.state);
        const { questions, counter, score } = this.props;
        if (this.state.message) {
            return (
                <div className="result-message">
                    <p>{this.state.message}</p>
                    <p>{this.state.message2}</p>
                </div>
            );
        }
        if (!questions) {
            return null;
        }
        if (counter == 11) {
            console.log("counter and score, ", counter, score);
            return (
                <div>
                    <Result />
                </div>
            );
        }
        console.log(
            "questions[counter].questions: ",
            questions[counter].question
        );
        return (
            <div className="assessment">
                <h1 style={{ marginBottom: 20 }}>
                    Question {`${counter + 1}`} out of 11
                </h1>
                <div
                    className="timer"
                    style={{
                        color: this.state.time < 11 ? "red" : "black"
                    }}
                >
                    <h1>TIME</h1>
                    <h1>LEFT</h1>
                    <h1>{this.state.time}</h1>
                </div>
                <img
                    className="question-image"
                    src={` ${questions[counter].question} `}
                    width="350"
                    height="200"
                />
                <img
                    src={` ${questions[counter].option} `}
                    width="500"
                    height="100"
                />
                <div className="options">
                    <input
                        ref={elem => (this.elem1 = elem)}
                        type="radio"
                        value="1"
                        name="options"
                        onChange={this.handleChange}
                    />
                    <input
                        ref={elem => (this.elem2 = elem)}
                        type="radio"
                        value="2"
                        name="options"
                        onChange={this.handleChange}
                    />
                    <input
                        ref={elem => (this.elem3 = elem)}
                        type="radio"
                        value="3"
                        name="options"
                        onChange={this.handleChange}
                    />
                    <input
                        ref={elem => (this.elem4 = elem)}
                        type="radio"
                        value="4"
                        name="options"
                        onChange={this.handleChange}
                    />
                    <input
                        ref={elem => (this.elem5 = elem)}
                        type="radio"
                        value="5"
                        name="options"
                        onChange={this.handleChange}
                    />
                </div>
                <button className="next-button" onClick={this.handleSubmit}>
                    Next
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Intelligencetest);
