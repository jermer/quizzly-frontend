
const OutroScreen = ({ title, numCorrect, numQuestions }) => {
    const percent = Math.round(100 * numCorrect / numQuestions);
    let msg;

    if (percent === 100)
        msg = "Perfect!";
    else if (percent >= 90)
        msg = "Excellent!";
    else if (percent >= 80)
        msg = "Keep up the good work!";
    else if (percent >= 70)
        msg = "You're getting there!";
    else
        msg = "Don't give up!";

    return (
        <div>
            <h2>{title}</h2>
            <p className="lead">You scored {numCorrect}/{numQuestions} ({percent}%) on this quiz.</p>
            <p className="lead fw-bold">
                {msg}
                <i className="fa-solid fa-face-smile-beam ms-2"></i>
            </p>
        </div>
    )
}

export default OutroScreen;