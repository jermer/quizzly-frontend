import { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";

import LoadingSpinner from "../common/LoadingSpinner";

import QuizzlyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import LibraryCard from "./LibraryCard";

/** Displays a list of quizzes in the users library.
 * This list includes quizzes that the user has created,
 * both public and private.
 * 
 * In addition to a list of 'QuizCard's, this component
 * renders a search box and a button for creating a new
 * quiz. 
 */

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

    async function handleNew(evt) {
        evt.preventDefault();

        const data = {
            title: '(new quiz)',
            description: '',
            creator: currentUser.username
        };

        // add new blank quiz in db
        const newQuiz = await QuizzlyApi.createQuiz(data);

        // add new quiz to state
        setQuizzes(qz => ([...qz, newQuiz]));
    }

    async function handleDelete(evt) {
        evt.preventDefault();
        const id = +evt.target.closest(".LibraryCard").id;
        console.debug("Library: delete quiz, id =", id);

        // remove quiz in db
        await QuizzlyApi.deleteQuiz(id);

        // remove quiz in state
        setQuizzes(qz => (qz.filter(q => q.id !== id)));
    }

    if (!currentUser || !quizzes) return <LoadingSpinner />;

    return (
        <div className="LibraryList col-md-8 offset-md-2 pt-3">
            <h3> User Library: {currentUser.username} </h3>
            <div className="row">
                <div className="col-10">
                    <SearchForm handleSearch={search} />
                </div>
                <div className="col my-3">
                    <button
                        className="btn btn-success"
                        onClick={handleNew}
                    >
                        <i className="fa-solid fa-circle-plus me-2"></i>
                        New Quiz
                    </button>
                </div>
            </div>

            {quizzes.length
                ? (
                    <div className="QuizList-list row row-cols-3 g-3">
                        {quizzes.map(q => (
                            <LibraryCard
                                key={q.id}
                                id={q.id}
                                title={q.title}
                                description={q.description}
                                creator={q.creator}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                )
                :
                (<p className="lead">No results found!</p>)
            }

        </div>
    )
}

export default Library;