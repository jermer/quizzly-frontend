
const QuestionThumbnail = ({ question, questionClick }) => {

    return (
        <div
            className="card mb-2"
            onClick={questionClick}
        >
            <div className="card-body small" id={question.id}>
                {question.qText}
            </div>

            {/* buttons to reorder and delete questions */}
            {/* <div className="small"> */}
            {/* <button className="btn btn-light"><i className="fa-solid fa-chevron-up" /></button> */}
            {/* <button className="btn btn-light"><i className="fa-solid fa-chevron-down" /></button> */}
            {/* <button className="btn btn-light ms-2"><i class="fa-solid fa-trash-can" /></button> */}
            {/* </div> */}

        </div>

    )

}

export default QuestionThumbnail;