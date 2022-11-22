import { Link } from "react-router-dom";

import "./LibraryCard.css";

const LibraryCard = ({ id, title, description, creator }) => {
    return (
        <Link
            className="LibraryCard card"
            to={`/creator/${id}`}
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
                    <button className="btn btn-small btn-primary">
                        <span>
                            <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default LibraryCard;