import React, { useState } from 'react';
import { postTweet } from '../../services/tweetsService';

export const TweetForm = ({ username, onTweetPost }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(undefined);
  const [errors, setErrors] = useState({});

  const handleTweetChange = event => {
    setMessage(event.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (!message || message.trim() === '') {
      errors.message = 'Message is required.';
    } else if (message.length > 140) {
      errors.message = 'Message must not exceed 140 characters.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitTweet = async () => {
    if (!username) {
      setErrors({ errorMessage: 'You must be logged in to post.' });
    } else if (validateForm()) {
      const savedPost = await postTweet(message, image);
      if (savedPost) {
        // alert the parent of success
        if (typeof onTweetPost === 'function') {
          onTweetPost({ ...savedPost, username });
        }
        // reset tweet values
        setMessage('');
        setImage(undefined);
      } else {
        // show error message
        setErrors({ errorMessage: 'Unable to post tweet.' });
      }
    }
  };

  const remainingCharacters = 140 - message.length;

  return (
    <div>
      <textarea
        type="text"
        className={`form-control post-input ${
          errors.message ? 'is-invalid' : ''
        }`}
        rows="3"
        placeholder="What's happening?"
        value={message}
        onChange={handleTweetChange}
      ></textarea>
      {errors.message && <p className="text-danger">{errors.message}</p>}
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
          onClick={submitTweet}
        >
          Tweet
        </button>
      </div>
      {errors.errorMessage && (
        <p className="text-danger text-center">{errors.errorMessage}</p>
      )}
    </div>
  );
};
