import { useContext } from "react";

import UserContext from "../auth/UserContext";
import ReportCard from "./ReportCard";

const ReportList = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="ReportList col-md-8 offset-md-2 mt-3">
            <h3>Quiz Scores: {currentUser.username}</h3>
            <ul>
                {currentUser.scores.length
                    ?
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Quiz Title</th>
                                <th scope="col">Most Recent Score</th>
                                <th scope="col">Best Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUser.scores.map(s => (
                                <ReportCard
                                    key={s.quizId}
                                    title={s.title}
                                    lastScore={s.lastScore}
                                    bestScore={s.bestScore}
                                    numQuestions={s.numQuestions}
                                />
                            ))}
                        </tbody>
                    </table>
                    :
                    (<p className="lead">No results found!</p>)
                }
            </ul>

        </div>
    )
}

export default ReportList;