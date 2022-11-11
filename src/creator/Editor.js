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
                <QuizSettingsForm quiz={quiz} />
            )
        }
        fetchQuiz();
    }, [id]);

    //
    // Handle clicks on "save changes" button
    //
    async function saveClick(evt) {
        // call the quiz update function in the API

    }

    //
    // Handle clicks in the editor navigation panel
    //
    async function navClick(evt) {
        const targetId = evt.target.id;

        console.debug("Editor navigation click, target:", targetId);

        if (targetId === "quizSettingsButton") {
            // display the quiz settings editor
            setWorkspaceComponent(
                <QuizSettingsForm quiz={quiz} />
            );
        }
        else if (targetId === "addQuestionButton") {
            // add a new question to this quiz
            const data = {
                q_text: '(new question)',
                right_a: '',
                wrong_a1: '',
                wrong_a2: '',
                wrong_a3: '',
                question_order: quiz.questions.length,
                quiz_id: quiz.id
            }
            const newQ = await QuizzlyApi.newQuestion(data);

            console.log(newQ);
            quiz.questions.push(newQ);

            // display the new question in the editor
            setWorkspaceComponent(
                <QuestionForm question={quiz.questions[quiz.questions.length - 1]} />
            );
        }
        else {
            // display the selected question in the editor
            setWorkspaceComponent(
                <QuestionForm question={quiz.questions[+targetId - 1]} />
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
                            saveClick={saveClick}
                        />
                    </div>
                </aside>
                <main className="col-10">
                    <div className="py-3">
                        {/* <EditorWorkspace component={workspaceComponent} /> */}
                        {workspaceComponent}
                    </div>
                </main>
            </div>
        </div >
    )

}

export default Editor;