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
        <form>
            <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{formData.username}</p>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ?
                <Alert type="success" messages={["Updated successfully."]} />
                : null}

            <button
                className="btn btn-primary btn-block mt-4"
                onClick={handleSubmit}
            >
                Save Changes
            </button>
        </form>
    )
}

export default ProfileForm;