import QuestionThumbnail from "./QuestionThumbnail";

const QuestionNavigator = ({ questions }) => {

    // list of thumbnails
    return (
        <div>
            {questions.map(q => (
                <QuestionThumbnail question={q} />
            ))}
        </div>
    )
}

export default QuestionNavigator;