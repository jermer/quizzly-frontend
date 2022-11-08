import { useEffect, useState } from "react";

import LoadingSpinner from "../common/LoadingSpinner";
import QuizCard from "./QuizCard";
import QuizzlyApi from "../api/api";
import SearchForm from "./SearchForm";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState(null);

    useEffect(function getQuizzesOnMount() {
        search();
    }, []);

    async function search(name) {
        let quizzes = await QuizzlyApi.getQuizzes(name);
        setQuizzes(quizzes);
    }

    if (!quizzes) return <LoadingSpinner />;

    return (
        <div className="QuizList col-md-8 offset-md-2">
            <SearchForm handleSearch={search} />
            {quizzes.length
                ? (
                    <div className="QuizList-list">
                        {quizzes.map(q => (
                            <QuizCard
                                key={q.id}
                                id={q.id}
                                title={q.title}
                                description={q.description}
                            />
                        ))}
                    </div>
                )
                : (
                    <p className="lead">Sorry, no results were found!</p>
                )
            }
        </div>
    );
}

export default QuizList;