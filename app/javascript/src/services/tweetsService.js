import { safeCredentials } from '../utils/fetchHelper';

/**
 * Fetches tweets from the specified URL.
 *
 * @param {string} url - The URL to fetch tweets from.
 * @returns {Promise<Array>} - A promise that resolves to an array of tweets.
 */
const getTweets = async url => {
  const response = await fetch(
    url,
    safeCredentials({
      method: 'GET',
    }),
  );
  if (response.ok) {
    const text = await response.text();
    if (text.length) {
      try {
        const data = JSON.parse(text);
        if (data && Array.isArray(data.tweets)) {
          return data.tweets;
        }
      } catch (error) {
        console.error('Invalid JSON:', text);
      }
    }
  } else {
    console.log(`Unable to fetch tweets from: ${url}`);
  }
  return []; // none found
};

/**
 * Gets all tweets.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of tweets.
 */
export const getAllTweets = async () => {
  return getTweets(`api/tweets`);
};

/**
 * Gets tweets for a specific user.
 *
 * @param {string} username - The username of the user whose tweets to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of tweets.
 */
export const getUserTweets = async username => {
  return getTweets(`api/users/${username}/tweets`);
};

/**
 * Posts a tweet with the given message and image.
 *
 * @param {string} message - The message content of the tweet.
 * @param {string} image - The image associated with the tweet.
 * @returns {Promise<Tweet>} - A promise that resolves to a tweet object when successfully posted.
 */
export const postTweet = async (message, image) => {
  const response = await fetch(
    `api/tweets`,
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        message: message,
        image: image,
      }),
    }),
  );
  if (response.ok) {
    const data = response.json();
    if (data) {
      return data;
    } else {
      console.log(`Unable to post tweet.`);
    }
  } else {
    console.log(`Error while posting tweet.`);
  }
  return undefined;
};
