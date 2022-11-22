import { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";

import LoadingSpinner from "../common/LoadingSpinner";


import QuizzlyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import LibraryCard from "./LibraryCard";

// import QuizList from "../quizzes/QuizList";

const Library = () => {
    const { currentUser } = useContext(UserContext);

    const [quizzes, setQuizzes] = useState(null);
    const [searchFields, setSearchFields] = useState({});

    // console.log(">>>", currentUser.username);

    useEffect(function getQuizzesOnMount() {

        // async function fetchQuizzes() {
        //     // let quizzes = await QuizzlyApi.getQuizzes(searchFields);
        //     let quizzes = await QuizzlyApi.getQuizzes({
        //         creator: currentUser.username
        //     });
        //     setQuizzes(quizzes);
        // }

        if (currentUser) {
            // setSearchFields(filters);
            // setSearchFields({
            //     creator: currentUser.username
            // })
            // fetchQuizzes();
            search();
        }

    }, [currentUser]);

    async function search(searchString) {
        // const newSearchFields = { ...searchFields, searchString };
        // setSearchFields(newSearchFields);
        let quizzes = await QuizzlyApi.getQuizzes({
            creator: currentUser.username,
            searchString
        });
        setQuizzes(quizzes);
    }

    if (!currentUser || !quizzes) return <LoadingSpinner />;

    return (
        <div>
            <h3> User Library: {currentUser.username} </h3>

            <SearchForm handleSearch={search} />

            <button className="btn btn-warning">
                New Quiz
            </button>

            {/* <QuizList
                filters={{ creator: currentUser.username }}
                cardAction={'edit'}
            /> */}

            {quizzes.length
                ? (
                    <div className="QuizList-list">
                        {quizzes.map(q => (
                            <LibraryCard
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
    )
}

export default Library;