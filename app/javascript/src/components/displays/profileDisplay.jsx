import React, { useEffect, useState } from 'react';
import { fetchUserTweets } from '../../services/tweetsService';

/**
 *
 * @param {string} username
 * @returns
 */
export const ProfileDisplay = ({ username }) => {
  const [profileName, setProfileName] = useState('--');
  const [handleName, setHandleName] = useState('--');
  const [tweetsAmount, setTweetsAmount] = useState('--');
  const [followingAmount, setFollowingAmount] = useState('--');
  const [followersAmount, setFollowersAmount] = useState('--');

  // retrieve user's tweets, following, and followers
  useEffect(() => {
    const load = async () => {
      if (!username) return;
      setProfileName(username);
      setHandleName(username);
      // fetch user's tweets to get amount
      const tweets = await fetchUserTweets(username);
      setTweetsAmount(tweets.length);
      // fetch user's following to get amount
      setFollowingAmount(0);
      // fetch user's followers to get amount
      setFollowersAmount(0);
    };
    load();
  }, [username]);

  return (
    <div className="info-box">
      <div className="mx-2">
        <div className="user-profile">
          <a href="#">
            <strong>{profileName}</strong>
          </a>
          <br />
          <a href="#">@{handleName}</a>
        </div>
        <div className="row user-profile-stats">
          <div className="col col-xs-4">
            <a href="">
              <span>Tweets</span>
              <br />
              <span className="user-tweets">{tweetsAmount}</span>
            </a>
          </div>
          <div className="col col-xs-4">
            <a href="">
              <span>Following</span>
              <br />
              <span className="user-following">{followingAmount}</span>
            </a>
          </div>
          <div className="col col-xs-4">
            <a href="">
              <span>Followers</span>
              <br />
              <span className="user-followers">{followersAmount}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
