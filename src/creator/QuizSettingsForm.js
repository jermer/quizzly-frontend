import { useEffect, useState } from 'react';

const QuizSettingsForm = ({ quiz }) => {

    const INITIAL_FORM = {
        title: '',
        description: '',
        visibility: 'private'
    }
    const [formData, setFormData] = useState(INITIAL_FORM);

    useEffect(() => {
        if (!quiz)
            setFormData(INITIAL_FORM);
        else
            setFormData({
                title: quiz.title,
                description: quiz.description,
                visibility: quiz.visibility
            });
    }, [quiz]);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fdata => ({ ...fdata, [name]: value }));
    };

    /** Render form */
    return (
        <div className="QuizSettingsForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
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
                                name="visibility"
                                type="radio"
                                className="form-check-input"
                                value="private"
                                checked={formData.visibility === 'private'}
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
                                name="visibility"
                                type="radio"
                                className="form-check-input"
                                value="public"
                                checked={formData.visibility === 'public'}
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

                </form>

                {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default QuizSettingsForm;