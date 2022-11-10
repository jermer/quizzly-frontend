import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import QuestionNavigator from "./QuestionNavigator";
import QuestionForm from "./QuestionForm";

const Editor = () => {
    const { id } = useParams();

    console.debug("Quiz Editor", "id =", id);

    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        async function fetchQuiz() {
            const quiz = await QuizzlyApi.getQuiz(id);
            setQuiz(quiz);
            setCurrentQuestion(quiz.questions[0] || null);
        }
        fetchQuiz();
    }, [id]);

    function questionClick(evt) {
        console.log("clicked on", evt.target.id);

        if (evt.target.id === "addQuestionButton") {
            // add a new question to this quiz
            setCurrentQuestion(null);
            // display the blank question editor

        } else {
            // display the selected question in the editor
            console.log(".....")
            setCurrentQuestion(quiz.questions[+evt.target.id - 1]);
        }
    }

    if (!quiz) return <LoadingSpinner />;

    return (
        <div className="container h-100">
            <div className="row h-100">
                <div className="col overflow-auto h-100">
                    <QuestionNavigator questionList={quiz.questions} questionClick={questionClick} />
                </div>
                <div className="col-10 h-100">
                    <QuestionForm question={currentQuestion} />
                </div>
            </div>
        </div>
    )

}

export default Editor;