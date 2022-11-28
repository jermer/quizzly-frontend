import { useEffect, useState } from "react";

import LoadingSpinner from "../common/LoadingSpinner";

import QuizzlyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import DiscoverCard from "./DiscoverCard";

const DiscoverList = () => {
    const [quizzes, setQuizzes] = useState(null);

    useEffect(function getQuizzesOnMount() {
        search();
    }, []);

    async function search(searchString) {
        let quizzes = await QuizzlyApi.getQuizzes({
            isPublic: true,
            searchString
        });
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
                            <DiscoverCard
                                key={q.id}
                                id={q.id}
                                title={q.title}
                                description={q.description}
                                creator={q.creator}
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

export default DiscoverList;