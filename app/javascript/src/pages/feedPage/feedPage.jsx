import React, { useState } from 'react';
import './feedPage.scss';

export const FeedPage = () => {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleTweetChange = event => {
    setTweetMessage(event.target.value);
  };

  const handleTweetButtonClick = () => {
    const newTweet = {
      content: tweetMessage,
    };
    setTweets(prevTweets => [newTweet, ...prevTweets]);
    setTweetMessage('');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-xs-3 profile-trends">
          <div className="profile-box">
            <div className="user-profile">
              <a
                className="profileName"
                href="#"
              >
                <strong>TO DO</strong>
              </a>
              <br />
              <a
                className="userName"
                href="#"
              >
                @TO DO
              </a>
            </div>
            <div className="row user-profile-stats">
              <div className="col col-xs-4">
                <a href="">
                  <span>Tweets</span>
                  <br />
                  <span className="user-tweets">0</span>
                </a>
              </div>
              <div className="col col-xs-4">
                <a href="">
                  <span>Following</span>
                  <br />
                  <span className="user-following">0</span>
                </a>
              </div>
              <div className="col col-xs-4">
                <a href="">
                  <span>Followers</span>
                  <br />
                  <span className="user-followers">0</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col col-xs-12 mt-2">
            <div className="trends">
              <div className="trends-twitter">
                <span>Trends</span>
                <span> · </span>
                <small>
                  <a href="">Change</a>
                </small>
              </div>
              <ul className="trends-list">
                <li>
                  <a href="#">#Hongkong</a>
                </li>
                <li>
                  <a href="#">#Ruby</a>
                </li>
                <li>
                  <a href="#">#foobarbaz</a>
                </li>
                <li>
                  <a href="#">#rails</a>
                </li>
                <li>
                  <a href="#">#API</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col col-xs-12 col-xs-offset-3 tweet-box">
          <div className="col-xs-6 post-tweet-box">
            <textarea
              type="text"
              className="form-control post-input"
              rows="3"
              placeholder="What's happening?"
              value={tweetMessage}
              onChange={handleTweetChange}
            ></textarea>
            <div className="tweet-upload mt-2">
              <label
                id="upload-image-btn"
                htmlFor="image-select"
              >
                <strong>Upload image</strong>
              </label>
              <img
                id="image-preview"
                src=""
                alt="image preview"
              />
              <input
                type="file"
                id="image-select"
                name="image"
                accept="image/*"
              />
              <span className="post-char-counter">140</span>
              <button
                className="btn btn-primary"
                disabled=""
                id="tweet-btn"
                onClick={handleTweetButtonClick}
              >
                Tweet
              </button>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};
