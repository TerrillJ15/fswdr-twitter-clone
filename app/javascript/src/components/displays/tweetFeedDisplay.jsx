import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TweetFeedDisplay = ({ tweets }) => {
  const navigate = useNavigate();
  const navigateToUser = (event, username) => {
    event.preventDefault();
    navigate(`/feed/${username}`);
  };
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
                onClick={event => navigateToUser(event, tweet.username)}
              >
                <strong>{tweet.username}</strong>
              </a>
              <a
                className="tweet-username"
                href="#"
                onClick={event => navigateToUser(event, tweet.username)}
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
