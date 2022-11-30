import { useState, useContext } from "react";

import QuizzlyApi from "../api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

const ProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    function handleChange(evt) {
        // evt.preventDefault();
        const { name, value } = evt.target;
        setFormData(fd => ({
            ...fd,
            [name]: value
        }));
        // clear form errors
        setFormErrors([]);
        setSaveConfirmed(false);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            email: formData.email,
            password: formData.password
        }
        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await QuizzlyApi.updateUser(username, profileData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(fd => ({
            ...fd,
            password: ""
        }));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(updatedUser);
    }

    return (
        <div className="ProfileForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">
                    Edit User Profile: {currentUser.username}
                </h3>
                <div className="card">
                    <div className="card-body text-start">

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Confirm password to make changes:</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    autoComplete="current-password"
                                    value={formData.password}
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
                                    <Alert type="success" messages={["Updated successfully."]} />
                                </div>
                                : null}

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;