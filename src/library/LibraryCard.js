import { Link } from "react-router-dom";

import "./LibraryCard.css";

/** Displays an individual quiz in the user library
 * with buttons to launch the editor for that quiz, or
 * delete the quiz.
 * 
 * Parent is 'LibraryList' which passes down quiz details
 * and button functionality.
 */

const LibraryCard = ({ id, title, description, creator, handleDelete }) => {
    return (
        <div
            id={id}
            className="LibraryCard card"
        // to={`/creator/${id}`}
        >
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                    {/* {logoUrl && <img src={logoUrl}
                        alt={name}
                        className="float-right ml-5" />} */}
                </h5>

                <div className="card-text small">
                    <p>{description}</p>
                    <p>by: {creator}</p>
                </div>

                <div>
                    <Link
                        className="btn btn-small btn-primary"
                        to={`/creator/${id}`}
                    >
                        <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                    </Link>

                    <button
                        className="btn btn-small btn-danger ms-1"
                        onClick={handleDelete}
                    >
                        <span>
                            <i className="fa-solid fa-trash-can"></i>
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default LibraryCard;