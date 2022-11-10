import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

import "./Navigation.css";

const Navigation = ({ logout }) => {

    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/discover">
                        Discover
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/creator/library">
                        Library
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/reports">
                        Reports
                    </NavLink>
                </li>

                <li className="nav-item dropdown mr-4">
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
                                <i className="fa-solid fa-right-from-bracket fa-flip-horizontal"></i> Logout
                            </Link>
                        </li>

                    </ul>
                </li>

            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Quizzly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
            {/* {loggedInNav()} */}
        </nav>
    );
}

export default Navigation;