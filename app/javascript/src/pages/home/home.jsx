import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from '../../components/app/navBar';
import { UserContext } from '../../contexts/userContext';
import { getUser } from '../../services/sessionsService';
import { FeedPage } from '../feedPage/feedPage';
import { LogInPage } from '../logInPage/logInPage';
import './home.scss';

const App = () => {
  const [user, setUser] = useState(undefined); // undefined = not loaded

  useEffect(() => {
    const load = async () => {
      const username = await getUser();
      if (username) {
        setUser(username); // authenticated
      } else {
        setUser(null); // not authenticated
      }
    };
    load();
  }, []); // Empty array means this effect runs once on mount and not on updates

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
};
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );
});
