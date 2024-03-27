import { safeCredentials } from '../utils/fetchHelper';

/**
 * Creates a new user.
 *
 * @param {Object} data - The request data used to signup.
 * @param {string} data.username - The username of the user.
 * @param {string} data.email - The email of the user.
 * @param {string} data.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the response data containing the user
 */
export const createUser = async request => {
  const response = await fetch(
    `api/users`,
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: request.username,
          email: request.email,
          password: request.password,
        },
      }),
    }),
  );
  if (response.ok) {
    const data = await response.json();
    if (data && data.user) {
      // success, so return the data
      return data;
    } else {
      // failed, so show unable to sign up message
      return { error: 'Unable to sign up.' };
    }
  } else {
    // failed, so show unable to sign up message
    return {
      error:
        'Error occurred while signing up. Please try again or contact support.',
    };
  }
};

/**
 * Gets the user details for the provided username.
 * NOTE: This is a mock function and does not actually fetch user details.
 *       Due to not being in requirements, it returns default values.
 *
 * @param {string} username - The username of the user to fetch details for.
 * @returns {Promise<Array>} - A promise that resolves to the user details.
 */
export const getUserDetails = async username => {
  return {
    username,
    followingAmount: 0,
    followersAmount: 0,
  };
};
