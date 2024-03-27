import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInForm } from '../../components/forms/logInForm';
import { SignUpForm } from '../../components/forms/signUpForm';
import { AppContext } from '../../contexts/appContext';
import './logInPage.scss';

export const LogInPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    if (user) {
      navigate('/feed');
    } else if (user === null) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [user]);
  return showLogin ? (
    <div
      className="body"
      style={{
        backgroundImage:
          "url('https://abs.twimg.com/images/themes/theme1/bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="row no-gutters">
          <div className="col col-12 col-md-4 offset-md-1 text-center mt-4">
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
              <div
                className="col col-12 mb-4 mt-2 my-2"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '5px',
                }}
              >
                <LogInForm />
              </div>
              <div
                className="col col-12"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  padding: '10px',
                }}
              >
                <SignUpForm />
              </div>
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
