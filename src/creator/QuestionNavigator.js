import QuestionThumbnail from "./QuestionThumbnail";

const QuestionNavigator = ({ questionList, questionClick }) => {

    // list of thumbnails
    return (
        <div>
            {questionList.map(q => (
                <QuestionThumbnail
                    key={q.id}
                    question={q}
                    questionClick={questionClick}
                />
            ))}
            <button
                className="btn btn-success"
                id="addQuestionButton"
                onClick={questionClick}
            >
                <i className="fa-solid fa-circle-plus me-1" /> Add Question
            </button>
        </div>
    )
}

export default QuestionNavigator;