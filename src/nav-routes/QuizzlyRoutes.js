import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

// import QuizList from "../quizzes/QuizList";
import Library from "../editor/Library";
import Editor from "../editor/Editor";

import DiscoverList from "../player/DiscoverList";
import Player from "../player/Player";

const QuizzlyRoutes = ({ login, signup }) => {

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<LoginForm login={login} />} />
            <Route path="signup" element={<SignupForm signup={signup} />} />

            {/* <Route path="/discover" element={<QuizList />} /> */}
            <Route path="/discover" element={<DiscoverList />} />
            <Route path="/player/:id" element={<Player />} />

            <Route path="/creator/library" element={<Library />} />
            <Route path="/creator/:id" element={<Editor />} />

            {/* <Route path="/reports" element={<QuizList />} /> */}
            {/* <Route path="/profile" element={<QuizList />} /> */}
        </Routes>
    );

}

export default QuizzlyRoutes;