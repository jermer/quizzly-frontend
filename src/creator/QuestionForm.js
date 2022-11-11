import { useEffect, useState } from "react";

const QuestionForm = ({ question }) => {
    const INITIAL_FORM = {
        q_text: '',
        right_a: '',
        wrong_a1: '',
        wrong_a2: '',
        wrong_a3: ''
    }
    const [formData, setFormData] = useState(INITIAL_FORM);

    useEffect(() => {
        if (!question)
            setFormData(INITIAL_FORM);
        else
            setFormData({
                q_text: question.q_text,
                right_a: question.right_a,
                wrong_a1: question.wrong_a1,
                wrong_a2: question.wrong_a2,
                wrong_a3: question.wrong_a3
            })
    }, [question])

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fdata => ({ ...fdata, [name]: value }));
    };

    return (
        <form>
            <div className="form-group">
                <label>
                    Question Text
                </label>
                <input
                    id="q_text"
                    name="q_text"
                    type="text"
                    className="form-control"
                    autoComplete="question-text"
                    placeholder="type your question here"
                    value={formData.q_text}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mt-4">
                <label>
                    <i className="fa-solid fa-circle-check me-2 text-success" /> Correct Answer
                </label>
                <input
                    id="right_a"
                    name="right_a"
                    type="text"
                    className="form-control"
                    autoComplete="correct-answer"
                    placeholder="type the right answer here"
                    value={formData.right_a}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mt-4">
                <label>
                    <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #1
                </label>
                <input
                    id="wrong_a1"
                    name="wrong_a1"
                    type="text"
                    className="form-control"
                    autoComplete="wrong-answer"
                    placeholder="type a wrong answer here"
                    value={formData.wrong_a1}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>
                    <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #2 (optional)
                </label>
                <input
                    id="wrong_a2"
                    name="wrong_a2"
                    type="text"
                    className="form-control"
                    autoComplete="wrong-answer"
                    placeholder="type a wrong answer here"
                    value={formData.wrong_a2}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>
                    <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #3 (optional)
                </label>
                <input
                    id="wrong_a3"
                    name="wrong_a3"
                    type="text"
                    className="form-control"
                    autoComplete="wrong-answer"
                    placeholder="type a wrong answer here"
                    value={formData.wrong_a3}
                    onChange={handleChange}
                    required
                />
            </div>

        </form>
    )
}

export default QuestionForm;