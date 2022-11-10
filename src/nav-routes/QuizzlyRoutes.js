import { Routes, Route } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

import QuizList from "../quizzes/QuizList";
import QuizForm from "../quizzes/QuizForm";

const QuizzlyRoutes = ({ login, signup }) => {

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<LoginForm login={login} />} />
            <Route path="signup" element={<SignupForm signup={signup} />} />

            <Route path="/discover" element={<QuizList />} />

            <Route path="/quizzes/new" element={<QuizForm />} />
            <Route path="/quizzes/:id" element={<QuizForm />} />

            <Route path="/library" element={<QuizList />} />

            {/* <Route path="/reports" element={<QuizList />} /> */}
            {/* <Route path="/profile" element={<QuizList />} /> */}
        </Routes>
    );

}

export default QuizzlyRoutes;