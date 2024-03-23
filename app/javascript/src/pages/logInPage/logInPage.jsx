import React from 'react';
import { LogInForm } from '../../components/forms/logInForm';
import { SignUpForm } from '../../components/forms/signUpForm';
import './logInPage.scss';

export const LogInPage = () => {
  return (
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
  );
};
