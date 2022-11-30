import { useEffect, useState } from "react";

import Alert from "../common/Alert";

/** Form for editing an individual quiz question.
 * 
 * Displays inputs for question and answer texts, plus a
 * button to save the question.
 * 
 * Parent component is 'Editor' which passes down
 * question details and button functionality.
 */

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
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

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

    function handleSubmit(evt) {
        evt.preventDefault();

        // verify form data
        if (!Object.values(formData).every(val => val !== '')) {
            setFormErrors(["None of the question or answer fields may be left blank."]);
            return;
        }

        saveQuestion(formData);
        setFormErrors([]);
        setSaveConfirmed(true);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fdata => ({ ...fdata, [name]: value }));
        setFormErrors([]);
        setSaveConfirmed(false);
    };

    return (
        <div className="QuestionForm">
            <div className="container col-md-8 col-lg-8">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3"
                        data-bs-toggle="tooltip"
                        data-bs-title="TOOLTIP TEXT"
                    >
                        <label
                            htmlFor="qText"
                        >
                            <i className="fa-solid fa-circle-question me-2"></i> Question Text
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
                        // required
                        />
                    </div>

                    <p>Note: The order of the answer choices is randomized when presented to quiz-takers.</p>

                    <div className="form-group mb-3">
                        <label
                            htmlFor="rightA">
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
                        // required
                        />
                    </div>

                    <div className="form-group mb-3">
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
                        // required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label
                            htmlFor="wrongA2"
                        >
                            <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #2
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

                    <div className="form-group mb-3">
                        <label
                            htmlFor="wrongA3"
                        >
                            <i className="fa-solid fa-circle-xmark me-2 text-danger" /> Incorrect Answer #3
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

                    {formErrors.length
                        ?
                        <div className="my-1">
                            <Alert type="danger" messages={formErrors} />
                        </div>
                        : null}

                    {saveConfirmed
                        ?
                        <div className="my-1">
                            <Alert type="success" messages={["Saved."]} />
                        </div>
                        : null}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            SAVE CHANGES
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default QuestionForm;