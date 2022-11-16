import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import QuestionScreen from "./QuestionScreen";

import LoadingSpinner from "../common/LoadingSpinner";
import IntroScreen from "./IntroScreen";

const Player = () => {
    const { id } = useParams();

    const [quiz, setQuiz] = useState(null);
    const [currentScreen, setCurrentScreen] = useState(null);

    const [currQuestion, setCurrQuestion] = useState(null);
    const [ansArray, setAnsArray] = useState([]);

    useEffect(() => {
        async function fetchQuiz() {
            const quiz = await QuizzlyApi.getQuiz(id);
            setQuiz(quiz);
            setCurrQuestion(
                quiz.questions[0]
            );
            setCurrentScreen(
                <IntroScreen
                    title={quiz.title}
                    description={quiz.description}
                    startQuiz={startQuiz}
                />
            )
        }
        fetchQuiz();
    }, [id]);

    useEffect(() => {
        if (currQuestion) {
            // when the current question changes, randomize the answer choice array
            let arr = [
                currQuestion.rightA,
                currQuestion.wrongA1,
                currQuestion.wrongA2,
                currQuestion.wrongA3,
            ]
            shuffleArray(arr);
            setAnsArray(arr);
        }
    }, [currQuestion])

    // Start the quiz
    function startQuiz() {
        console.log("START!");
        console.log(quiz);
        setCurrQuestion(
            quiz.questions[0]
        );
        setCurrentScreen(
            <QuestionScreen
                qText={currQuestion.qText}
                aArray={ansArray}
                handleClick={checkAnswer}
            />
        );
    }

    // Shuffle array
    // Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function checkAnswer(evt) {
        evt.preventDefault();
        const id = evt.target.closest('button').id;
        console.log("Click on button", id);

        if (ansArray[id] === currQuestion.rightA) {
            console.log("CORRECT!");
        } else {
            console.log("INCORRECT");
        }
    }

    // rendering

    if (!quiz) return <LoadingSpinner />;

    return (
        <div>
            {currentScreen}
        </div>
    )

}

export default Player;