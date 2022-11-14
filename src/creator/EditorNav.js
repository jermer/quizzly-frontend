
import QuizSettingsForm from "./QuizSettingsForm";
import QuestionThumbnail from "./QuestionThumbnail";

const EditorNav = ({ questionList, navClick }) => {

    return (
        <div>
            {/* QUIZ SETTINGS BUTTON */}
            <button
                type="button"
                className="btn btn-secondary mb-2"
                id="quizSettingsButton"
                onClick={navClick}
            >
                <i className="fa-solid fa-gear me-1"></i> Quiz Settings
            </button>

            {/* QUESTION THUMBNAILS */}
            {questionList.map(q => (
                <QuestionThumbnail
                    key={q.id}
                    question={q}
                    questionClick={navClick}
                />
            ))}

            {/* NEW QUESTION BUTTON */}
            <button
                type="button"
                className="btn btn-success"
                id="addQuestionButton"
                onClick={navClick}
            >
                <i className="fa-solid fa-circle-plus me-1" /> Add Question
            </button>


        </div>
    )
}

export default EditorNav;


/*
            <div class="modal fade" id="quizSettingsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Quiz Settings</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <QuizSettingsForm />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            */