import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuizzlyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

import QuizEditorNav from "./QuizEditorNav";
import QuestionForm from "./QuestionForm";
import QuizSettingsForm from "./QuizSettingsForm";

/** Quiz editor
 * 
 *  Displays a navigation panel that allows user to move between
 *  general quiz settings and individual quiz questions.
 * 
 *  Clicks in the navigation panel prompt different components
 *  to load in the editor workspace.
 */

const QuizEditor = () => {
    const { id } = useParams();

    console.debug("Quiz Editor", "id =", id);

    // holds the current quiz and its questions
    const [quiz, setQuiz] = useState(null);

    // holds a component to be rendered in the workspace
    const [workspaceComponent, setWorkspaceComponent] = useState(null);

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * When component mounts: fetch quiz and update state
     */

    useEffect(() => {
        async function fetchQuiz() {
            const quiz = await QuizzlyApi.getQuiz(id);
            setQuiz(quiz);

            // the initial workspace component is
            // to display the quiz settings form
            setWorkspaceComponent(
                <QuizSettingsForm
                    quiz={quiz}
                    saveQuiz={saveQuiz}
                />
            )
        }
        fetchQuiz();
    }, [id]);

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Handle clicks on "save changes" button in QuizSettingsForm component
     */

    async function saveQuiz(quizData) {
        const { id, ...data } = quizData;

        // call the quiz update function in the API
        await QuizzlyApi.updateQuiz(id, data);

        // update the quiz locally in state
        setQuiz(qz => ({ ...qz, ...data }));
    }

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Handle clicks on "save changes" button in QuestionForm component
     */

    async function saveQuestion(questionData) {
        // evt.preventDefault();
        const { id, ...data } = questionData;

        // call the question update function in the API
        await QuizzlyApi.updateQuestion(id, data);

        // update the question locally, inside the quiz state
        setQuiz(qz => ({
            ...qz,
            questions: qz.questions.map(qst => {
                if (qst.id !== id)
                    return qst;
                return { ...qst, ...data };
            })
        }))
    }

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Handle clicks in the navigator panel
     */

    function showQuizSettings(evt) {
        evt.preventDefault();
        console.debug("Editor: quiz settings", quiz.id);
        // display the quiz settings editor
        setWorkspaceComponent(
            <QuizSettingsForm
                quiz={quiz}
                saveQuiz={saveQuiz}

            />
        );
    }

    function showQuestion(evt) {
        evt.preventDefault();
        console.debug("Editor: show question, id =", evt.target.id);

        // find the target id in the question array 
        let idx = quiz.questions.findIndex(q => q.id === +evt.target.id);

        // show the question in the editor panel
        setWorkspaceComponent(
            <QuestionForm
                question={quiz.questions[idx]}
                saveQuestion={saveQuestion}
            />
        );
    }

    async function addQuestion(evt) {
        evt.preventDefault();
        console.debug("Editor: add question");
        // create a new blank question
        const data = {
            qText: '(new question)',
            rightA: '',
            wrongA1: '',
            wrongA2: '',
            wrongA3: '',
            quizId: quiz.id
        }
        const newQ = await QuizzlyApi.createQuestion(data);

        // add new question to the quiz in state
        setQuiz(qz => ({
            ...qz,
            questions: [...qz.questions, newQ]
        }))

        console.debug("Created new question, id =", newQ.id);

        // show the new question in the editor panel
        // note that quiz.questions.length does not yet reflect
        // the new question we just added
        setWorkspaceComponent(
            <QuestionForm
                // question={quiz.questions[quiz.questions.length]}
                question={newQ}
                saveQuestion={saveQuestion}
            />
        );
    }

    async function deleteQuestion(evt) {
        evt.preventDefault();

        // get the id of the question to be deleted
        const id = +evt.target.closest(".card-body").id;

        console.debug("Editor: delete question, id =", id);

        // find the target id in the question array 
        // let idx = quiz.questions.findIndex(q => q.id === id);

        // delete the question in the db
        await QuizzlyApi.deleteQuestion(id);

        // remove the question from the quiz in state
        setQuiz(qz => ({
            ...qz,
            questions: qz.questions.filter(q => q.id !== id)
        }))

        // show the quiz settings page
        // -- future work: make a more user-friendly choice here
        setWorkspaceComponent(
            <QuizSettingsForm
                quiz={quiz}
                saveQuiz={saveQuiz}
            />
        );
    }

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Render the component
     */

    if (!quiz) return <LoadingSpinner />;

    return (
        <div className="container h-100">
            <div className="row h-100">

                <aside className="col">
                    {/* offcanvas offcanvas-start show */}
                    <div className="py-3">
                        <QuizEditorNav
                            questionList={quiz.questions}
                            showQuizSettings={showQuizSettings}
                            addQuestion={addQuestion}
                            showQuestion={showQuestion}
                            deleteQuestion={deleteQuestion}
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

export default QuizEditor;