import React, { useEffect, useState } from 'react';
import { fetchAllTweets, fetchUserTweets } from '../../services/tweetsService';

/**
 * Renders a feed of tweets based on the provided username.
 * If `username` is `null`, fetches all tweets.
 * If `username` is a string, fetches tweets for that user.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.username - The username to filter the tweets. If `null`, fetches all tweets.
 * @returns {JSX.Element} The rendered component.
 */
export const TweetFeedDisplay = ({ username }) => {
  const [tweets, setTweets] = useState(undefined);

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
      setTweets(tweets);
    };
    load();
  }, [username]);

  if (tweets && tweets.length > 0) {
    return (
      <div className="feed-tweet-box">
        {tweets.map((tweet, index) => (
          <div
            key={index}
            className="tweet"
          >
            <a
              className="tweet-profileName"
              href="#"
            >
              <strong>{tweet.user.name}</strong>
            </a>
            <a
              className="tweet-username"
              href="#"
            >
              &nbsp;@{tweet.user.username}
            </a>
            <p>{tweet.content}</p>
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
