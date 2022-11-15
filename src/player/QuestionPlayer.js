
const QuestionPlayer = ({ question }) => {

    return (
        <div>
            <h3>{question.qText}</h3>

            <button className="btn btn-primary">
                <i className="fa-solid fa-square me-2"></i> {question.rightA}
            </button>

            <button className="btn btn-warning">
                <i className="fa-solid fa-diamond me-2"></i> {question.wrongA1}
            </button>

            {question.wrongA2 &&
                <button className="btn btn-success">
                    <i className="fa-solid fa-play fa-rotate-270 me-2"></i> {question.wrongA2}
                </button>
            }

            {question.wrongA3 &&
                <button className="btn btn-danger">
                    <i className="fa-solid fa-circle me-2"></i> {question.wrongA3}
                </button>
            }

        </div>
    )
}

export default QuestionPlayer;