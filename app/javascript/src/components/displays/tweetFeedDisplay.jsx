import React from 'react';

export const TweetFeedDisplay = ({ tweets }) => {
  return (
    <div className="feed-tweet-box">
      <div className="tweet">
        <a
          className="tweet-profileName"
          href="#"
        >
          <strong>Jane Doe</strong>
        </a>
        <a
          className="tweet-username"
          href="#"
        >
          &nbsp;@janedoe
        </a>
        <p>test</p>
      </div>
      {tweets.map((tweet, index) => (
        <div
          key={index}
          className="tweet"
        >
          <p>{tweet.content}</p>
        </div>
      ))}
    </div>
  );
};
