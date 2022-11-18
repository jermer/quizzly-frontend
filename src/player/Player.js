import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import QuestionScreen from "./QuestionScreen";

import LoadingSpinner from "../common/LoadingSpinner";
import IntroScreen from "./IntroScreen";
import { shuffleArray } from "../helpers/shuffleArray";

const Player = () => {
    const { id } = useParams();

    console.debug("Quiz Player", "id =", id);

    // holds the current quiz and its questions
    const [quiz, setQuiz] = useState(null);

    // holds a randomized list of quiz questions
    const [questions, setQuestions] = useState([]);

    // holds the index of the current question in the shuffled array
    const [currQuestionIdx, setCurrQuestionIdx] = useState(null);

    // holds the current question object
    const [currQuestion, setCurrQuestion] = useState(null);

    // update quiz data in state when id changes
    useEffect(() => {
        async function fetchQuiz() {
            const quiz = await QuizzlyApi.getQuiz(id);
            setQuiz(quiz);

            // set up and shuffle the quiz questions
            setQuestions(shuffleArray(quiz.questions));
        }
        fetchQuiz();

    }, [id]);

    // Start the quiz
    function startQuiz(evt) {
        evt.preventDefault();

        // set question state to the first question
        setCurrQuestionIdx(0);
        setCurrQuestion(questions[0]);
    }

    function nextQuestion() {
        // increment the question index
        const nextQuestionIdx = currQuestionIdx + 1;

        // update state variables for the new question
        setCurrQuestionIdx(nextQuestionIdx);
        setCurrQuestion(questions[nextQuestionIdx]);
    }

    // choose which component to render, one of:
    // - the intro screen (if no questions have been answered)
    // - the outro screen (if all questions have been answered)
    // - the current question screen
    function selectScreen() {
        if (!currQuestion) {
            // return the quiz introduction component
            return (
                <IntroScreen
                    title={quiz.title}
                    description={quiz.description}
                    startQuiz={startQuiz}
                />
            )
        } else {
            // return a question screen
            // for the current question
            return (
                <QuestionScreen
                    question={currQuestion}
                    nextQuestion={nextQuestion}
                />
            )
        }
    }

    // render the component

    if (!quiz) return <LoadingSpinner />;

    return (
        <div>
            {selectScreen()}
        </div>
    )

}

export default Player;