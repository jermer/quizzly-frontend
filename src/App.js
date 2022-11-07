import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import QuizzlyApi from './api/api';
import QuizzlyRoutes from './nav-routes/QuizzlyRoutes';
import Navigation from './nav-routes/Navigation';

const TOKEN_STORAGE_ID = "jobly-token"

/** Quizzly App
 * 
 */

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** Handles site-wide signup */
  async function signup({ signupData }) {

  }

  /** Handles site-wide login */
  async function login({ loginData }) {
    try {
      let token = QuizzlyApi.login(loginData);
      setToken(token);
      return { success: true };

    } catch (err) {
      return { success: false, err }
    }
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** App render */
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <QuizzlyRoutes signup={signup} login={login} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
