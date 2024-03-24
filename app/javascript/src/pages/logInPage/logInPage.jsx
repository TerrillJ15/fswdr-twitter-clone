import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInForm } from '../../components/forms/logInForm';
import { SignUpForm } from '../../components/forms/signUpForm';
import { useAuthenticatedUser } from '../../hooks/authenticateUserHook';
import './logInPage.scss';

export const LogInPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const username = useAuthenticatedUser();
  useEffect(() => {
    if (username) {
      navigate('/feed');
    } else if (username === null) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [username]);
  return showLogin ? (
    <div className="container">
      <div className="row no-gutters">
        <div className="col col-12 col-md-4 offset-md-1">
          <div>
            <h1>
              <strong>Welcome to Twitter.</strong>
            </h1>
            <p>
              Connect with your friends — and other fascinating people. Get
              in-the-moment updates on the things that interest you. And watch
              events unfold, in real time, from every angle.
            </p>
          </div>
          <p>
            <a href="#">Hack Pacific - Backendium Twitter Project</a>
          </p>
          <p>
            <a href="#">
              Tweet and photo by @Hackpacific
              <br />
              3:20 PM - 15 December 2016
            </a>
          </p>
        </div>
        <div className="col col-12 col-md-4 offset-md-1">
          <div className="row no-gutters">
            <div className="col col-12 mb-4">
              <LogInForm />
            </div>
            <div className="col col-12">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      Loading...
    </div>
  );
};
