import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import QuestionNavigator from "./QuestionNavigator";

const Editor = () => {
    const { id } = useParams();

    console.debug("Quiz Editor", "id=", id);

    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        async function fetchQuiz() {
            setQuiz(await QuizzlyApi.getQuiz(id));
        }
        fetchQuiz();
    }, [id]);

    if (!quiz) return <LoadingSpinner />;

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <QuestionNavigator questions={quiz.questions} />
                </div>
                <div className="col-10">
                    <h2>{quiz.title}</h2>
                    <p>{quiz.description}</p>
                </div>
            </div>
        </div>
    )

}

export default Editor;