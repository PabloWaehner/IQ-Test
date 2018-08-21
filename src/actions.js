import React from "react";
import axios from "./axios";

export async function seeQuestions() {
    const { data } = await axios.get("/questions");
    console.log("data-Actions.js", data);
    console.log("data-Actions.js-results", data.results);
    return {
        type: "SEE_QUESTIONS",
        questions: data.results
    };
}

export async function incrementScore() {
    return {
        type: "INCREMENT_SCORE"
    };
}

export async function incrementCounter() {
    return {
        type: "INCREMENT_COUNTER"
    };
}

export async function resetCounter() {
    return {
        type: "RESET_COUNTER"
    };
}

export async function finalScore(score) {
    const { data } = await axios.post("/finalscore", { score });
    console.log("finalscore-Actions.js", data);
    console.log("finalscore-Actions.js-results", data.results);
    return {
        type: "FINAL_SCORE",
        score: data.results
    };
}
