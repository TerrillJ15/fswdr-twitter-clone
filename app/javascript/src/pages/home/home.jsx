import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from '../../components/app/navBar';
import { AppContext } from '../../contexts/appContext';
import { getUser, logoutUser } from '../../services/sessionsService';
import { FeedPage } from '../feedPage/feedPage';
import { LogInPage } from '../logInPage/logInPage';
import './home.scss';

const App = () => {
  const [user, setUser] = useState(undefined); // undefined = not loaded
  const [rememberMe, setRememberMe] = useState(false);

  // try to load user on mount
  useEffect(() => {
    const load = async () => {
      const username = await getUser();
      if (username) {
        setRememberMe(true); // previously remembered
        setUser(username); // authenticated
      } else {
        setUser(null); // not authenticated
      }
    };
    load();
  }, []); // Empty array means this effect runs once on mount and not on updates

  // logout user if remember me is not set on app close
  useEffect(() => {
    console.log('rememberMe', rememberMe);
    if (!rememberMe) {
      window.addEventListener('beforeunload', logoutUser);
    } else {
      window.removeEventListener('beforeunload', logoutUser);
    }

    return () => {
      // cleanup
      window.removeEventListener('beforeunload', logoutUser);
    };
  }, [rememberMe]);

  return (
    <AppContext.Provider value={{ user, setUser, rememberMe, setRememberMe }}>
      <React.StrictMode>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<LogInPage />}
            />
            <Route
              path="/feed"
              element={<FeedPage />}
            />
            <Route
              path="/feed/:username?"
              element={<FeedPage />}
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </AppContext.Provider>
  );
};
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});
