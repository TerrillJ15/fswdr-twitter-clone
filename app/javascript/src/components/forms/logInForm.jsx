import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { safeCredentials } from '../../utils/fetchHelper';

/**
 * LogInForm component handles the user login process.
 * It maintains the state of the form fields and handles form validation and submission.
 */
export const LogInForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    password: '',
    rememberMe: false,
    errors: {},
    isLoggingIn: false,
    logInError: undefined,
  });

  /**
   * Validates the login form.
   *
   * @returns {boolean} Returns true if the form is valid, otherwise false.
   */
  const validateForm = () => {
    const errors = {};

    if (!!!data.username) {
      errors.username = 'Username is required';
    }

    if (!!!data.password) {
      errors.password = 'Password is required';
    }

    setValue('errors', errors);

    return Object.keys(errors).length === 0;
  };

  /**
   * Sets the value of the state.
   * @param {string} name - The name of the state.
   * @param {any} value - The value of the state.
   */
  const setValue = (name, value) => {
    setData(state => ({ ...state, [name]: value }));
  };

  /**
   * Handles the change event for input fields.
   * Updates the state with the new value of the input field.
   *
   * @param {Object} event - The event object.
   */
  const handleValueChange = event => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  /**
   * Handles the change event for checkbox fields.
   * Updates the state with the new checked state of the checkbox.
   *
   * @param {Object} event - The event object.
   */
  const handleCheckChange = event => {
    const { name, checked } = event.target;
    setValue(name, checked);
  };

  /**
   * Handles the form submission event.
   * Prevents the default form submission and checks if the form is valid.
   * If the form is valid, it initiates the session.
   *
   * @param {Object} event - The event object.
   */
  const handleSubmit = async event => {
    event.preventDefault();
    if (validateForm()) {
      getSession();
    }
  };

  /**
   * Initiates the session by sending a POST request to the server.
   * If the response is successful and the data indicates success, it navigates to the feed.
   * If the response is successful but the data indicates failure, it sets an error message.
   * If the response is not successful, it sets an error message.
   */
  const getSession = async () => {
    setValue('isLoggingIn', true);
    let logInError = undefined;
    const response = await fetch(
      `api/sessions`,
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          user: {
            username: data.username,
            password: data.password,
          },
        }),
      }),
    );
    if (response.ok) {
      const data = await response?.json();
      if (data?.success) {
        // success, so go to the tweets feed
        navigate('/feed');
      } else {
        // failed, so show unable to log in message
        logInError =
          'The username and password does not match an account. Please try again.';
      }
    } else {
      // failed, so show unable to log in message
      logInError =
        'Error occurred while logging in. Please try again or contact support.';
    }
    setValue('logInError', logInError);
    setValue('isLoggingIn', false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <p>
          <strong>Existing User?</strong>
          <span> Log In</span>
        </p>
      </div>
      <input
        type="text"
        className={
          'mb-2 form-control' + (data.errors.username ? ' is-invalid' : '')
        }
        placeholder="Username"
        name="username"
        value={data.username}
        onChange={handleValueChange}
      ></input>
      {data.errors.username && (
        <p className="text-danger">{data.errors.username}</p>
      )}
      <input
        type="password"
        className={
          'mb-2 form-control' + (data.errors.password ? ' is-invalid' : '')
        }
        placeholder="Password"
        name="password"
        value={data.password}
        onChange={handleValueChange}
      ></input>
      {data.errors.password && (
        <p className="text-danger">{data.errors.password}</p>
      )}
      <div>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={data.rememberMe}
            onChange={handleCheckChange}
          />
          <span> Remember me</span>
        </label>
        <span className="mx-2">·</span>
        <a href="#">Forgot password?</a>
      </div>
      <button
        disabled={data.isLoggingIn}
        className="mb-2 btn btn-default btn-primary"
        value="Submit"
      >
        Log in
      </button>
      {data.logInError !== undefined && (
        <p className="text-danger">{data.logInError}</p>
      )}
    </form>
  );
};
