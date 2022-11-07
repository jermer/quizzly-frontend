import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ signup }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        const result = await signup(formData);
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
    };

    /** Render form */
    return (
        <form onSubmit={handleSubmit}>
            <p>Under construction...</p>
        </form>
    );
}

export default SignupForm;
