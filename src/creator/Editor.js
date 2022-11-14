import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
// import EditorWorkspace from "./EditorWorkspace";
import EditorNav from "./EditorNav";
import QuestionForm from "./QuestionForm";
import QuizSettingsForm from "./QuizSettingsForm";

const Editor = () => {
    const { id } = useParams();

    console.debug("Quiz Editor", "id =", id);

    const [quiz, setQuiz] = useState(null);
    // const [currentQuestion, setCurrentQuestion] = useState(null);
    const [workspaceComponent, setWorkspaceComponent] = useState(null);

    useEffect(() => {
        async function fetchQuiz() {
            const quiz = await QuizzlyApi.getQuiz(id);
            setQuiz(quiz);
            // setCurrentQuestion(quiz.questions[0] || null);
            setWorkspaceComponent(
                <QuizSettingsForm
                    quiz={quiz}
                    saveQuiz={saveQuiz}
                />
            )
        }
        fetchQuiz();
    }, [id]);

    //
    // Handle clicks on "save changes" button in Quiz component
    //
    async function saveQuiz(evt, formData) {
        evt.preventDefault();
        // call the quis update function in the API
        const { id, ...data } = formData;
        const question = await QuizzlyApi.updateQuiz(id, data);
    }

    //
    // Handle clicks on "save changes" button in Question component
    //
    async function saveQuestion(evt, formData) {
        evt.preventDefault();
        // call the question update function in the API
        const { id, ...data } = formData;
        const question = await QuizzlyApi.updateQuestion(id, data);
    }

    //
    // Handle clicks in the editor navigation panel
    //
    async function navClick(evt) {
        evt.preventDefault();
        const targetId = evt.target.id;

        console.debug("Editor navigation click, target:", targetId);

        if (targetId === "quizSettingsButton") {
            // display the quiz settings editor
            setWorkspaceComponent(
                <QuizSettingsForm
                    quiz={quiz}
                    saveQuiz={saveQuiz}
                />
            );
        }
        else if (targetId === "addQuestionButton") {
            // add a new blank question to this quiz
            const data = {
                qText: '(new question)',
                rightA: '',
                wrongA1: '',
                questionOrder: quiz.questions.length,
                quizId: quiz.id
            }
            const newQ = await QuizzlyApi.createQuestion(data);

            console.log(newQ);
            quiz.questions.push(newQ);

            // display the new question in the editor
            setWorkspaceComponent(
                <QuestionForm
                    question={quiz.questions[quiz.questions.length - 1]}
                    saveQuestion={saveQuestion}
                />
            );
        }
        else {
            // display the selected question in the editor
            setWorkspaceComponent(
                <QuestionForm
                    question={quiz.questions[+targetId - 1]}
                    saveQuestion={saveQuestion}
                />
            );
        }
    }

    if (!quiz) return <LoadingSpinner />;

    return (
        <div className="container h-100">
            <div className="row h-100">
                <aside className="col">
                    {/* offcanvas offcanvas-start show */}
                    <div className="py-3">
                        <EditorNav
                            questionList={quiz.questions}
                            navClick={navClick}
                        />
                    </div>
                </aside>
                <main className="container col-10 px-5 text-start">
                    <div className="py-3">
                        {workspaceComponent}
                    </div>
                </main>
            </div>
        </div >
    )

}

export default Editor;