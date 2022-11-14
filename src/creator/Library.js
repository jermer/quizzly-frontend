

import { useContext } from "react";
import UserContext from "../auth/UserContext";
import QuizList from "../quizzes/QuizList";
import LoadingSpinner from "../common/LoadingSpinner";

const Library = () => {

    const { currentUser } = useContext(UserContext);

    if (!currentUser) return <LoadingSpinner />;

    return (
        <div>
            <h3> User Library: {currentUser.username} </h3>
            <QuizList
                filters={{ creator: currentUser.username }}
                cardAction={'edit'}
            />
        </div>
    )
}

export default Library;