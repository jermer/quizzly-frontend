import { useEffect, useState } from 'react';

import Alert from '../common/Alert';

/** Form for editing general quiz settings.
 * 
 * Displays inputs for quiz title, description, and
 * whether the quiz is public or private.
 * 
 * Parent component is 'Editor' which passes down
 * quiz details and button functionality.
 */

const QuizSettingsForm = ({ quiz, saveQuiz }) => {

    const INITIAL_FORM = {
        id: null,
        title: '',
        description: '',
        isPublic: false
    }
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    useEffect(() => {
        if (!quiz)
            setFormData(INITIAL_FORM);
        else
            setFormData({
                id: quiz.id,
                title: quiz.title,
                description: quiz.description,
                isPublic: quiz.isPublic
            });
    }, [quiz]);

    function handleSubmit(evt) {
        evt.preventDefault();

        // verify form data
        if (formData.title === '') {
            setFormErrors(["Title cannot be left blank."]);
            return;
        }
        saveQuiz(formData);
        setFormErrors([]);
        setSaveConfirmed(true);
    }

    function handleChange(evt) {
        let { name, value } = evt.target;

        // adjust the radio button input value
        if (name === "isPublic") value = (value === 'public');

        setFormData(fdata => ({ ...fdata, [name]: value }));
        setFormErrors([]);
        setSaveConfirmed(false);
    };

    /** Render form */
    return (
        <div className="QuizSettingsForm">
            <div className="container col-md-8 col-lg-8">
                {/* <div className="card"> */}
                {/* <div className="card-body"> */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title">
                            Quiz Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            autoComplete="quiz-title"
                            value={formData.title}
                            onChange={handleChange}
                        // required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description">
                            Description (optional)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            type="text"
                            className="form-control"
                            autoComplete="quiz-description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <div className="form-check">
                            <input
                                id="radioPrivate"
                                name="isPublic"
                                type="radio"
                                className="form-check-input"
                                value="private"
                                checked={!formData.isPublic}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="radioPrivate"
                            >
                                Private
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                id="radioPublic"
                                name="isPublic"
                                type="radio"
                                className="form-check-input"
                                value="public"
                                checked={formData.isPublic}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="radioPublic"
                            >
                                Public
                            </label>
                        </div>
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

                {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default QuizSettingsForm;