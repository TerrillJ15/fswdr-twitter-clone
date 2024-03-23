import React, { useState } from 'react';

export const TweetForm = ({ onTweetSubmit }) => {
  const [tweetMessage, setTweetMessage] = useState('');

  const handleTweetChange = event => {
    setTweetMessage(event.target.value);
  };

  const handleTweetButtonClick = () => {
    onTweetSubmit(tweetMessage);
    setTweetMessage('');
  };

  const remainingCharacters = 140 - tweetMessage.length;

  return (
    <div>
      <textarea
        type="text"
        className="form-control post-input"
        rows="3"
        placeholder="What's happening?"
        value={tweetMessage}
        onChange={handleTweetChange}
      ></textarea>
      <div className="tweet-upload mt-2 d-flex justify-content-end align-items-center">
        <span className="file-upload">
          <label htmlFor="image-select">
            <strong>Upload image</strong>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
          />
        </span>
        <span className="mx-2">{remainingCharacters}</span>
        <button
          className="btn btn-primary"
          disabled=""
          onClick={handleTweetButtonClick}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};
