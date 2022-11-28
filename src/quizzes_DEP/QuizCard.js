import { Link } from "react-router-dom";

import "./QuizCard.css";

const QuizCard = ({ id, title, description, creator, cardAction }) => {
    return (
        <Link
            className="QuizCard card"
            to={cardAction === 'edit' ?
                `/creator/${id}`
                :
                `/player/${id}`
            }
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
                        {cardAction === 'edit'
                            ?
                            <span>
                                <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                            </span>
                            :
                            <span>
                                <i className="fa-solid fa-circle-play me-1"></i> Play!
                            </span>
                        }
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default QuizCard;