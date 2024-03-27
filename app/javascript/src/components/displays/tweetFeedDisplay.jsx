import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a feed of tweets.
 * Tweets matching the current user can be deleted.
 *
 * @param {Object[]} tweets - An array of tweet objects.
 * @param {string} username - The current username.
 * @param {Function} onDelete - The function to handle tweet deletion.
 */
export const TweetFeedDisplay = ({ tweets, username, onDelete }) => {
  const navigate = useNavigate();

  /**
   * Navigates to the user's feed.
   *
   * @param {Event} event - The event object.
   * @param {string} username - The username of the user.
   */
  const navigateToUser = (event, username) => {
    event.preventDefault();
    navigate(`/feed/${username}`);
  };

  if (tweets && tweets.length > 0) {
    return (
      <div>
        {tweets.map(tweet => (
          <div
            key={tweet.id}
            className="feed-tweet-box my-2"
          >
            <div className="tweet mx-2">
              <div className="row">
                <div className="col col-*">
                  <a
                    className="tweet-profileName p-2"
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
                    @{tweet.username}
                  </a>
                </div>
                <div className="col col-auto">
                  {username === tweet.username && (
                    <button
                      className="btn btn-default pull-right"
                      onClick={() => onDelete(tweet.id)}
                      style={{
                        color: 'red',
                        backgroundColor: 'transparent',
                        border: 'none',
                        height: '12px',
                        width: '12px',
                        padding: '0',
                        lineHeight: '0',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="my-1">{tweet.message}</div>
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
