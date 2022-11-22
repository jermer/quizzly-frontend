
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