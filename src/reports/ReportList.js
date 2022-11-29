import { useContext } from "react";

import UserContext from "../auth/UserContext";

const ReportList = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div>
            Quiz scores for... {currentUser.username}
            <ul>
                {currentUser.scores.length
                    ?
                    (currentUser.scores.map(s => (
                        <li>quizId = {s.quizId} and score = {s.score}</li>
                    )))
                    :
                    (<p>No scores yet...</p>)
                }
            </ul>

        </div>
    )
}

export default ReportList;