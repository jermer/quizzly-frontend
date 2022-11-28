import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import './App.css';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import QuizzlyApi from './api/api';
import QuizzlyRoutes from './nav-routes/QuizzlyRoutes';
import Navigation from './nav-routes/Navigation';

const TOKEN_STORAGE_ID = "quizzly-token";

/** Quizzly App
 * 
 */

function App() {

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {

    async function fetchUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          QuizzlyApi.token = token;
          const user = await QuizzlyApi.getUser(username);
          setCurrentUser(user);

        } catch (err) {
          console.error("Error loading user info.", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    fetchUser();
  }, [token]);

  /** Handles site-wide signup */
  async function signup(signupData) {

  }

  /** Handles site-wide login */
  async function login(loginData) {
    try {
      let token = await QuizzlyApi.login(loginData);
      setToken(token);
      return { success: true };

    } catch (errors) {
      // console.log("+++++", errors)
      return { success: false, errors }
    }
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** App render */
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      <div className="App">
        <Navigation logout={logout} />
        <QuizzlyRoutes signup={signup} login={login} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
