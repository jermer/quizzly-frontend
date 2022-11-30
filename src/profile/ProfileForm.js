import { useState, useContext } from "react";

import QuizzlyApi from "../api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

const ProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: currentUser.email,
        currentPassword: "",
        newPassword: "",
        repeatPassword: ""
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

    async function callAPIUpdate(data) {
        let updatedUser;

        try {
            updatedUser = await QuizzlyApi.updateUser(currentUser.username, data);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(fd => ({
            ...fd,
            currentPassword: "",
            newPassword: "",
            repeatPassword: ""
        }));
        setFormErrors([]);
        setSaveConfirmed(true);
        setCurrentUser(updatedUser);
    }

    async function handleDataUpdate(evt) {
        evt.preventDefault();

        callAPIUpdate({
            email: formData.email
        })
    }

    async function handlePasswordChange(evt) {
        evt.preventDefault();

        // verify that current password is correct
        const valid = await QuizzlyApi.validate({
            username: currentUser.username,
            password: formData.currentPassword
        })
        if (!valid) {
            setFormErrors(["Incorrect current password"]);
            return;
        }

        // verify that new password and repeated password match
        if (formData.newPassword !== formData.repeatPassword) {
            setFormErrors(["Repeated password does not match"]);
            return;
        }

        // all clear, update password in db
        callAPIUpdate({
            password: formData.newPassword
        })
    }

    return (
        <div className="ProfileForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">
                    Edit User Profile: {currentUser.username}
                </h3>
                <div className="card">
                    <div className="card-body text-start">

                        <form onSubmit={handleDataUpdate}>
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

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Update Email
                                </button>
                            </div>
                        </form>

                        <hr />

                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    id="currrent-password"
                                    type="password"
                                    name="currentPassword"
                                    className="form-control"
                                    autoComplete="current-password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    id="new-password"
                                    type="password"
                                    name="newPassword"
                                    className="form-control"
                                    autoComplete="new-password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Repeat New Password</label>
                                <input
                                    id="repeat-password"
                                    type="password"
                                    name="repeatPassword"
                                    className="form-control"
                                    autoComplete="repeat-password"
                                    value={formData.repeatPassword}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>

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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;