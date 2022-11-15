import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import QuestionPlayer from "./QuestionPlayer";

import LoadingSpinner from "../common/LoadingSpinner";

const Player = () => {
    const { id } = useParams();

    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        async function fetchQuiz() {
            const quiz = await QuizzlyApi.getQuiz(id);
            setQuiz(quiz);
        }
        fetchQuiz();
    }, [id]);

    if (!quiz) return <LoadingSpinner />;

    return (
        <div>
            <h1>Quiz Player... quiz {id}</h1>
            <QuestionPlayer question={quiz.questions[0]} />
        </div>
    )

}

export default Player;