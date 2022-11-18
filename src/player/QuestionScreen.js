import { useEffect, useState } from "react";

import { shuffleArray } from "../helpers/shuffleArray";

const QuestionScreen = ({ question, nextQuestion }) => {

    // holds a randomized array of answer choices
    const [answers, setAnswers] = useState([]);

    // holds a flag to indicate whether the user has
    // selected one of the answer choices yet
    const [done, setDone] = useState(false);

    useEffect(() => {
        // set up and shuffle the answer choices
        setAnswers(
            shuffleArray([
                question.rightA,
                question.wrongA1,
                question.wrongA2,
                question.wrongA3
            ]))

        // this question has not yet been answered
        setDone(false);

    }, [question]);

    // accept clicks on the answer choices
    function answerClick(evt) {
        evt.preventDefault();

        const id = evt.target.closest('button').id;
        console.log("Click on button", id);

        if (answers[id] === question.rightA) {
            console.log("CORRECT!");
        } else {
            console.log("INCORRECT");
        }
        setDone(true);
    }

    // rendering
    return (
        <div>
            <div className="question-text-area">
                <h3>{question.qText}</h3>
            </div>

            <div className="question-answer-area">
                <button
                    id="0"
                    className="btn btn-primary"
                    onClick={answerClick}
                >
                    <i className="fa-solid fa-square me-2"></i> {answers[0]}
                </button>

                <button
                    id="1"
                    className="btn btn-warning"
                    onClick={answerClick}
                >
                    <i className="fa-solid fa-diamond me-2"></i> {answers[1]}
                </button>

                <button
                    id="2"
                    className="btn btn-success"
                    onClick={answerClick}
                >
                    <i className="fa-solid fa-play fa-rotate-270 me-2"></i> {answers[2]}
                </button>

                <button
                    id="3"
                    className="btn btn-danger"
                    onClick={answerClick}
                >
                    <i className="fa-solid fa-circle me-2"></i> {answers[3]}
                </button>
            </div>

            <div className="question-next-button-area">
                <button
                    id="next-btn"
                    className="btn btn-secondary mt-3"
                    onClick={nextQuestion}
                    disabled={!done}
                >
                    NEXT QUESTION
                </button>
            </div>

        </div>
    )
}

export default QuestionScreen;