
const QuestionScreen = ({ qText, aArray, handleClick }) => {

    return (
        <div>
            <h3>{qText}</h3>

            <button
                id="0"
                className="btn btn-primary"
                onClick={handleClick}
            >
                <i className="fa-solid fa-square me-2"></i> {aArray[0]}
            </button>

            <button
                id="1"
                className="btn btn-warning"
                onClick={handleClick}
            >
                <i className="fa-solid fa-diamond me-2"></i> {aArray[1]}
            </button>

            {aArray[2] &&
                <button
                    id="2"
                    className="btn btn-success"
                    onClick={handleClick}
                >
                    <i className="fa-solid fa-play fa-rotate-270 me-2"></i> {aArray[2]}
                </button>
            }

            {aArray[3] &&
                <button
                    id="3"
                    className="btn btn-danger"
                    onClick={handleClick}
                >
                    <i className="fa-solid fa-circle me-2"></i> {aArray[3]}
                </button>
            }

        </div>
    )
}

export default QuestionScreen;