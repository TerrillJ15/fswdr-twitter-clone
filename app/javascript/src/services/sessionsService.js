import { safeCredentials } from '../utils/fetchHelper';

/**
 * Creates a new session for the provided username and password.
 *
 * @param {Object} request - The request data used to create a session.
 * @param {string} request.username - The username of the user.
 * @param {string} request.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the response data containing the success indication
 */
export const logIn = async request => {
  const response = await fetch(
    `api/sessions`,
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: request.username,
          password: request.password,
        },
      }),
    }),
  );
  if (response.ok) {
    const data = await response.json();
    if (data && data.success) {
      // success, so return the data
      return data;
    } else {
      // failed, so show unable to message
      return {
        error:
          'The username and password does not match an account. Please try again.',
      };
    }
  } else {
    // failed, so show error message
    return {
      error:
        'Error occurred while logging in. Please try again or contact support.',
    };
  }
};

/**
 * Gets the authenticated user.
 * @returns {Promise<string>} The username of the authenticated user.
 */
export const getUser = async () => {
  const response = await fetch(
    `${window.location.origin}/api/authenticated`,
    safeCredentials({
      method: 'GET',
    }),
  );
  if (response.ok) {
    const data = await response.json();
    if (data?.username) {
      // success, so use the user
      return data.username;
    } else {
      // denied, so show unable to log in message
      console.log('You do not have access to this page. Please log in.');
    }
  } else {
    // error, so show unable to log in message
    console.log('Unable to authenticate user. Please try logging in again.');
  }
};

/**
 * Logouts the current user.
 */
export const logoutUser = async () => {
  const response = await fetch(
    `${window.location.origin}/api/sessions`,
    safeCredentials({
      method: 'DELETE',
    }),
  );
  if (response.ok) {
    const data = await response.json();
    return data && data.success;
  } else {
    console.log('Unable to logout user. Please try again.');
  }
};
