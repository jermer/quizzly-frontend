import { Link } from "react-router-dom";

import "./DiscoverCard.css";

const DiscoverCard = ({ id, title, description, creator }) => {
    return (
        <Link
            className="DiscoverCard card mx-2"
            to={`/player/${id}`}
        >
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>

                <div className="card-text small">
                    <p>{description}</p>
                    <p>by: {creator}</p>
                </div>

                <div>
                    <button className="btn btn-small btn-primary">
                        <span>
                            <i className="fa-solid fa-circle-play me-1"></i> Play!
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default DiscoverCard;