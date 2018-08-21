export default function(state = { score: 0, counter: 0 }, action) {
    if (action.type == "SEE_QUESTIONS") {
        console.log("see questions-reducers.js");
        state = {
            ...state,
            assessments: action.questions
        };
    }

    if (action.type === "INCREMENT_SCORE") {
        console.log("increment score-reducers.js");
        state = Object.assign({}, state, {
            score: state.score + 1 //it can't be state.score++
        });
    }

    if (action.type === "INCREMENT_COUNTER") {
        console.log("increment counter-reducers.js");
        state = Object.assign({}, state, {
            counter: state.counter + 1
        });
    }

    if (action.type === "RESET_COUNTER") {
        console.log("reset counter-reducers.js");
        state = Object.assign({}, state, {
            counter: 0
        });
    }

    if (action.type === "FINAL_SCORE") {
        // console.log("final score-reducers.js");
        let finalScore;
        if (state.score < 7) {
            finalScore = "below average";
        } else if (state.score >= 5 && state.score < 7) {
            finalScore = "average";
        } else if (state.score == 8) {
            finalScore = "above average";
        } else if (state.score == 9) {
            finalScore = "high";
        } else if (state.score >= 10) {
            finalScore = "very high";
        }
        state = Object.assign({}, state, {
            final_score: finalScore
        });
    }

    console.log("state-reducer.js: ", state);
    console.log("state.assessments-reducer.js: ", state.assessments);
    return state;
}

// let arr = [1,2,3,4,5]
// let sum = arr.reduce((x,y) => x + y)
// console.log(sum)  //15
