
/** Individual question thumbnail.
 * 
 * Displays question text and a button to delete the
 * question from the quiz.
 * 
 * Parent component is 'EditorNav', which passes down
 * props for question details and button functionality.
 */

const QuestionThumbnail = ({ question, showQuestion, deleteQuestion }) => {

    return (
        <div
            className="card mb-2"
            onClick={showQuestion}
        >
            <div className="card-body small" id={question.id}>
                {question.qText}

                <button
                    className="btn btn-danger ms-2"
                    onClick={deleteQuestion}
                >
                    <i className="fa-solid fa-trash-can" />
                </button>

            </div>

        </div>

    )

}

export default QuestionThumbnail;