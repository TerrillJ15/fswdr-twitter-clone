import React, { useState } from 'react';
import { safeCredentials } from '../../utils/fetchHelper';

const DEFAULTS = {
  username: '',
  email: '',
  password: '',
  errors: {},
  isSigningUp: false,
  signUpSuccess: false,
  signUpError: undefined,
};

export const SignUpForm = () => {
  const [data, setData] = useState({
    ...DEFAULTS,
  });

  const validateForm = () => {
    const errors = {};

    if (!!!data.username) {
      errors.username = 'Username is required';
    }

    if (!!!data.email) {
      errors.email = 'Email is required';
    } else if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,9}$/.test(data.email) ===
      false
    ) {
      errors.email = `Email is invaild: xxxxx@xxxxx.xxx`;
    }

    if (!!!data.password) {
      errors.password = 'Password is required';
    }

    setValue('errors', errors);

    return Object.keys(errors).length === 0;
  };

  const setValue = (name, value) => {
    setData(state => ({ ...state, [name]: value }));
  };

  const handleValueChange = event => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (validateForm()) {
      createUser();
    }
  };

  const createUser = async () => {
    setValue('isSigningUp', true);
    let signUpSuccess = false;
    let signUpError = undefined;
    const response = await fetch(
      `api/users`,
      safeCredentials({
        method: 'POST',
        body: JSON.stringify({
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        }),
      }),
    );
    if (response.ok) {
      const data = await response?.json();
      if (data?.user) {
        // success, so clear other values and show success
        setData(() => ({
          ...DEFAULTS,
        }));
        signUpSuccess = true;
      } else {
        // failed, so show unable to sign up message
        signUpError = 'Unable to sign up.';
      }
    } else {
      // failed, so show unable to sign up message
      signUpError =
        'Error occurred while signing up. Please try again or contact support.';
    }
    setValue('signUpSuccess', signUpSuccess);
    setValue('signUpError', signUpError);
    setValue('isSigningUp', false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <p>
          <strong>New to Twitter?</strong>
          <span> Sign Up</span>
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
        type="text"
        className={
          'mb-2 form-control' + (data.errors.email ? ' is-invalid' : '')
        }
        placeholder="Email"
        name="email"
        value={data.email}
        onChange={handleValueChange}
      ></input>
      {data.errors.email && <p className="text-danger">{data.errors.email}</p>}
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
      <button
        disabled={data.isLoggingIn}
        className="btn btn-default btn-warning pull-right"
        value="Submit"
      >
        Sign up
      </button>
      {data.signUpError !== undefined && (
        <p className="text-danger">{data.signUpError}</p>
      )}
      {data.signUpSuccess && (
        <p className="text-success">User signed up! Please log in.</p>
      )}
    </form>
  );
};
