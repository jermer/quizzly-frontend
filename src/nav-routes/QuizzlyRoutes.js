import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profile/ProfileForm";

// import QuizList from "../quizzes/QuizList";
import LibraryList from "../library/LibraryList";
import QuizEditor from "../editor/QuizEditor";

import DiscoverList from "../player/DiscoverList";
import Player from "../player/Player";

import ReportList from "../reports/ReportList";

const QuizzlyRoutes = ({ login, signup }) => {

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<LoginForm login={login} />} />
            <Route path="signup" element={<SignupForm signup={signup} />} />

            {/* <Route path="/discover" element={<QuizList />} /> */}
            <Route path="/discover" element={<DiscoverList />} />
            <Route path="/player/:id" element={<Player />} />

            <Route path="/creator/library" element={<LibraryList />} />
            <Route path="/creator/:id" element={<QuizEditor />} />

            <Route path="/reports" element={<ReportList />} />

            <Route path="/profile" element={<ProfileForm />} />
        </Routes>
    );

}

export default QuizzlyRoutes;