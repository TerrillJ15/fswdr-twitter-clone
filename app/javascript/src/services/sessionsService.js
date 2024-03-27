import { safeCredentials } from '../utils/fetchHelper';

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
