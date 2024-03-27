import React, { useState } from 'react';
import { postTweet } from '../../services/tweetsService';

/**
 * A form component for creating a new tweet.
 *
 * @param {Object} props - The component props.
 * @param {string} props.username - The username of the logged-in user.
 * @param {Function} props.onTweetPost - A callback function to handle the tweet post event.
 */
export const TweetForm = ({ username, onTweetPost }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(undefined);
  const [errors, setErrors] = useState({});

  /**
   * Handles the change event for the tweet input field
   * to set the message state.
   *
   * @param {Object} event - The event object.
   */
  const handleTweetChange = event => {
    setMessage(event.target.value);
  };

  /**
   * Validates the form input and returns true if the form is valid, false otherwise.
   *
   * @returns {boolean} True if the form is valid, false otherwise.
   */
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

  /**
   * Submits a tweet by validating the form inputs and posting the tweet.
   * If the tweet is successfully posted, it alerts the parent component of success,
   * resets the tweet values, and returns the saved post.
   * If there is an error posting the tweet, it shows an error message.
   *
   * @returns {Promise<void>} A promise that resolves when the tweet is submitted.
   */
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

  /**
   * Represents the number of remaining characters in a tweet message.
   */
  const remainingCharacters = 140 - message.length;

  return (
    <div
      className="p-2 mt-2"
      style={{
        backgroundColor: '#daedf4',
        borderRadius: '5px',
      }}
    >
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
    </div>
  );
};
