import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../services/userService';

/**
 * Renders the profile display component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.username - The username of the profile.
 * @param {Array<{id, username, message}>} props.tweets - The tweets that belong to the user.
 */
export const ProfileDisplay = ({ username, tweets }) => {
  const [profileName, setProfileName] = useState('--');
  const [handleName, setHandleName] = useState('--');
  const [tweetsAmount, setTweetsAmount] = useState('--');
  const [followingAmount, setFollowingAmount] = useState('--');
  const [followersAmount, setFollowersAmount] = useState('--');

  // when username updates, then load the user details
  useEffect(() => {
    const load = async () => {
      if (!username) return;
      setProfileName(username);
      setHandleName(username);
      // get the user details
      const userDetails = await getUserDetails(username);
      // fetch user's following to get amount
      setFollowingAmount(userDetails.followingAmount);
      // fetch user's followers to get amount
      setFollowersAmount(userDetails.followersAmount);
    };
    load();
  }, [username]);

  // when tweets update, then update the count
  useEffect(() => {
    let newAmount = '--';
    if (Array.isArray(tweets)) {
      newAmount = tweets.length;
    }
    setTweetsAmount(newAmount);
  }, [tweets]);

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
