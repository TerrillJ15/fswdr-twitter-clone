import React, { useEffect, useState } from 'react';
import { fetchAllTweets, fetchUserTweets } from '../../services/tweetsService';

/**
 * Renders a feed of tweets based on the provided username.
 * If `username` is `null`, fetches all tweets.
 * If `username` is a string, fetches tweets for that user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<{id, username, message}>} props.postedTweets - The posted tweets since the page was shown.
 * @param {string} props.username - The username to filter the tweets. If `null`, fetches all tweets.
 */
export const TweetFeedDisplay = ({ username, postedTweets }) => {
  const [tweets, setTweetsState] = useState(undefined);
  const [loadedTweets, setLoadedTweets] = useState(undefined);

  /**
   * Sets the tweets state and sorts the tweets by id in descending order.
   *
   * @param {Array} tweets - The array of tweets to set.
   */
  const setTweets = tweets => {
    setTweetsState(tweets.sort((a, b) => parseInt(b.id) - parseInt(b.id)));
  };

  // load the tweets
  useEffect(() => {
    const load = async () => {
      if (username === undefined) return;
      let tweets = [];
      if (username === null) {
        // fetch all tweets
        tweets = await fetchAllTweets();
      } else {
        // fetch user tweets
        tweets = await fetchUserTweets(username);
      }
      setLoadedTweets(tweets);
      setTweets(tweets);
    };
    load();
  }, [username]);

  // update the tweets when new tweets are posted
  useEffect(() => {
    if (Array.isArray(postedTweets) && postedTweets.length > 0) {
      setTweets([...postedTweets, ...loadedTweets]);
    }
  }, [postedTweets]);

  if (tweets && tweets.length > 0) {
    return (
      <div>
        {tweets.map((tweet, index) => (
          <div className="feed-tweet-box my-2">
            <div
              key={index}
              className="tweet mx-2"
            >
              <a
                className="tweet-profileName"
                href="#"
              >
                <strong>{tweet.username}</strong>
              </a>
              <a
                className="tweet-username"
                href="#"
              >
                &nbsp;@{tweet.username}
              </a>
              <p>{tweet.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">
        {tweets === undefined ? 'Loading...' : 'No tweets found'}
      </div>
    );
  }
};
