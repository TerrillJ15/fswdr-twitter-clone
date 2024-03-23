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
  );
};
