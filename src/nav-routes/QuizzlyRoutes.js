import { Routes, Route } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

const QuizzlyRoutes = ({ login, signup }) => {

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<LoginForm login={login} />} />
            <Route path="signup" element={<SignupForm signup={signup} />} />
        </Routes>
    );

}

export default QuizzlyRoutes;