import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

import "./Navigation.css";

const Navigation = ({ logout }) => {

    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item me-2">
                    <NavLink className="nav-link" to="/discover">
                        <i className="fa-solid fa-compass me-1"></i>
                        Discover
                    </NavLink>
                </li>
                <li className="nav-item me-2">
                    <NavLink className="nav-link" to="/editor/library">
                        <i className="fa-solid fa-pen-to-square me-1"></i>
                        Library
                    </NavLink>
                </li>
                <li className="nav-item me-2">
                    <NavLink className="nav-link" to="/reports">
                        <i className="fa-solid fa-square-poll-vertical me-1"></i>
                        Reports
                    </NavLink>
                </li>

                <li className="nav-item dropdown me-2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user"></i>
                    </a>
                    <ul className="dropdown-menu">
                        <li><span className="dropdown-item-text">
                            {currentUser.username}
                        </span></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li className="dropdown-item">
                            <Link className="nav-link" to="/profile">
                                Edit Profile
                            </Link>
                        </li>
                        <li className="dropdown-item">
                            <Link className="nav-link" to="/" onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket fa-flip-horizontal me-1"></i> Logout
                            </Link>
                        </li>

                    </ul>
                </li>

            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand ms-3 me-5 fw-bold" to="/">
                Quizzly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
            {/* {loggedInNav()} */}
        </nav>
    );
}

export default Navigation;