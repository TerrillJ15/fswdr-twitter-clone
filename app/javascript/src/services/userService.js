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
