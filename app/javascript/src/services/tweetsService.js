import { safeCredentials } from '../utils/fetchHelper';

/**
 * Fetches tweets for a specific user.
 *
 * @param {string} username - The username of the user whose tweets to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of tweets.
 */
export const fetchUserTweets = async username => {
  const response = await fetch(
    `api/users/${username}/tweets`,
    safeCredentials({
      method: 'GET',
    }),
  );
  if (response.ok) {
    const text = await response.text();
    if (text.length) {
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          return data;
        }
      } catch (error) {
        console.error('Invalid JSON:', text);
      }
    }
  } else {
    // error, so log it
    console.log(`Unable to fetch user tweets for: ${username}`);
  }
  return []; // none found
};
