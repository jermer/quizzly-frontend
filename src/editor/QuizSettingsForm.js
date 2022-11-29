import { useEffect, useState } from 'react';

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

    function handleChange(evt) {
        let { name, value } = evt.target;
        if (name === "isPublic") value = (value === 'public');
        setFormData(fdata => ({ ...fdata, [name]: value }));
    };

    /** Render form */
    return (
        <div className="QuizSettingsForm">
            {/* <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4"> */}
            {/* <div className="card"> */}
            {/* <div className="card-body"> */}

            <form>
                <div className="form-group">
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description (optional)
                    </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        className="form-control"
                        autoComplete="quiz-description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
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

                {/* {formErrors.length */}
                {/* ? <Alert type="danger" messages={formErrors} /> */}
                {/* : null} */}

                <div>
                    <button
                        type="button"
                        className="btn btn-danger mt-4"
                        onClick={(evt) => saveQuiz(evt, formData)}
                    >
                        SAVE CHANGES
                    </button>
                </div>

            </form>

            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
        </div>
    );
}

export default QuizSettingsForm;