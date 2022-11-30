
const IntroScreen = ({ title, description, startQuiz }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
            <button
                className="btn btn-primary"
                onClick={startQuiz}
            >
                <i className="fa-solid fa-circle-play me-2"></i>Start the quiz!
            </button>
        </div>
    )
}

export default IntroScreen;