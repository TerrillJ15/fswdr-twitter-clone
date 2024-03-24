import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from '../../components/app/navBar';
import { FeedPage } from '../feedPage/feedPage';
import { LogInPage } from '../logInPage/logInPage';
import './home.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
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
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  );
});
