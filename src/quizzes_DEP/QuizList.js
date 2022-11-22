import { useEffect, useState } from "react";

import LoadingSpinner from "../common/LoadingSpinner";
import QuizCard from "./QuizCard";
import QuizzlyApi from "../api/api";
import SearchForm from "../common/SearchForm";

const QuizList = ({ filters, cardAction }) => {
    const [searchFields, setSearchFields] = useState({});
    const [quizzes, setQuizzes] = useState(null);

    useEffect(function getQuizzesOnMount() {
        async function fetchQuizzes(searchFields) {
            let quizzes = await QuizzlyApi.getQuizzes(searchFields);
            setQuizzes(quizzes);
        }
        setSearchFields(filters);
        fetchQuizzes(filters);
    }, []);

    async function search(searchString) {
        const newSearchFields = { ...searchFields, searchString };
        setSearchFields(newSearchFields);
        let quizzes = await QuizzlyApi.getQuizzes(newSearchFields);
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
                                creator={q.creator}
                                cardAction={cardAction}
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