import { Link } from "react-router-dom";

import "./QuizCard.css";

const QuizCard = ({ id, title, description }) => {
    return (
        <Link className="QuizCard card" to={`/quizzes/${id}`}>
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                    {/* {logoUrl && <img src={logoUrl}
                        alt={name}
                        className="float-right ml-5" />} */}
                </h5>
                <p className="card-text"><small>{description}</small></p>
                (Button?)
            </div>
        </Link>
    );
}

export default QuizCard;