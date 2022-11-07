import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    };

    /** Render form */
    return (
        <form onSubmit={handleSubmit}>
            <p>Under construction...</p>
        </form>
    );
}

export default LoginForm;
