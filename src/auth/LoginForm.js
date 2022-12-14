import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from "../common/Alert";

const LoginForm = ({ login }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        const result = await login(formData);
        if (result.success) {
            // redirect to the homepage
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    };

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fdata => ({ ...fdata, [name]: value }));
        // clear form errors
        setFormErrors([]);
    };

    /** Render form */
    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>
                <div className="card">
                    <div className="card-body text-start">

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                // requiured
                                />
                            </div>

                            {formErrors.length
                                ?
                                <div className="my-1">
                                    <Alert type="danger" messages={formErrors} />
                                </div>
                                : null}

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
