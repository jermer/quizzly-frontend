import { useEffect, useState } from "react";

const QuestionForm = ({ question, saveQuestion }) => {
    const INITIAL_FORM = {
        id: null,
        qText: '',
        rightA: '',
        wrongA1: '',
        wrongA2: '',
        wrongA3: ''
    }
    const [formData, setFormData] = useState(INITIAL_FORM);

    useEffect(() => {
        if (!question)
            setFormData(INITIAL_FORM);
        else
            setFormData({
                id: question.id,
                qText: question.qText,
                rightA: question.rightA,
                wrongA1: question.wrongA1,
                wrongA2: question.wrongA2,
                wrongA3: question.wrongA3
            })
    }, [question])

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fdata => ({ ...fdata, [name]: value }));
    };

    return (
        <form>
            <div className="form-group">
                <label
                    htmlFor="qText"
                >
                    Question Text
                </label>
                <input
                    id="qText"
                    name="qText"
                    type="text"
                    className="form-control"
                    autoComplete="question-text"
                    placeholder="type your question here"
                    value={formData.qText}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mt-4">
                <label
                    htmlFor="rightA
                ">
                    <i className="fa-solid fa-circle-check me-2 text-success" /> Correct Answer
                </label>
                <input
                    id="rightA"
                    name="rightA"
                    type="text"
                    className="form-control"
                    autoComplete="correct-answer"
                    placeholder="type the right answer here"
                    value={formData.rightA}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mt-4">
                <label
                    htmlFor="wrongA1"
                >
                    <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #1
                </label>
                <input
                    id="wrongA"
                    name="wrongA1"
                    type="text"
                    className="form-control"
                    autoComplete="wrong-answer"
                    placeholder="type a wrong answer here"
                    value={formData.wrongA1}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label
                    htmlFor="wrongA2"
                >
                    <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #2 (optional)
                </label>
                <input
                    id="wrongA2"
                    name="wrongA2"
                    type="text"
                    className="form-control"
                    autoComplete="wrong-answer"
                    placeholder="type a wrong answer here"
                    value={formData.wrongA2}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label
                    htmlFor="wrongA3"
                >
                    <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #3 (optional)
                </label>
                <input
                    id="wrongA3"
                    name="wrongA3"
                    type="text"
                    className="form-control"
                    autoComplete="wrong-answer"
                    placeholder="type a wrong answer here"
                    value={formData.wrongA3}
                    onChange={handleChange}
                />
            </div>

            <div>
                <button
                    type="button"
                    className="btn btn-danger mt-4"
                    onClick={(evt) => saveQuestion(evt, formData)}
                >
                    SAVE CHANGES
                </button>
            </div>

        </form>
    )
}

export default QuestionForm;