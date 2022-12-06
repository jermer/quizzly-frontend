import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profile/ProfileForm";

// import QuizList from "../quizzes/QuizList";
import LibraryList from "../library/LibraryList";
import QuizEditor from "../editor/QuizEditor";

import DiscoverList from "../discover/DiscoverList";
import QuizPlayer from "../player/QuizPlayer";

import ReportList from "../reports/ReportList";

/** Routes for Quizzly app
 * 
 * Accepts props for login and signup functions,
 * passed down from App.
 */

const QuizzlyRoutes = ({ login, signup }) => {

    return (
        <Routes>
            <Route exact path="/" element={<Homepage />} />

            <Route exact path="/login" element={<LoginForm login={login} />} />

            <Route path="/signup" element={<SignupForm signup={signup} />} />

            <Route path="/discover" element={<DiscoverList />} />

            <Route path="/player/:id" element={<QuizPlayer />} />

            <Route path="/editor/library" element={<LibraryList />} />

            <Route path="/editor/:id" element={<QuizEditor />} />

            <Route path="/reports" element={<ReportList />} />

            <Route path="/profile" element={<ProfileForm />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );

}

export default QuizzlyRoutes;