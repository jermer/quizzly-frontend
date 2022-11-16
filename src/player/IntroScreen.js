
const IntroScreen = ({ title, description, startQuiz }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
            <button
                className="btn btn-primary"
                onClick={startQuiz}
            >
                Start the Quiz!
            </button>
        </div>
    )
}

export default IntroScreen;