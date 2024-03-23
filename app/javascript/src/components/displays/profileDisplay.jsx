import React from 'react';

export const ProfileDisplay = ({
  profileName,
  userName,
  tweets,
  following,
  followers,
}) => {
  return (
    <div className="profile-box">
      <div className="user-profile">
        <a
          className="profileName"
          href="#"
        >
          <strong>{profileName}</strong>
        </a>
        <br />
        <a
          className="userName"
          href="#"
        >
          @{userName}
        </a>
      </div>
      <div className="row user-profile-stats">
        <div className="col col-xs-4">
          <a href="">
            <span>Tweets</span>
            <br />
            <span className="user-tweets">{tweets}</span>
          </a>
        </div>
        <div className="col col-xs-4">
          <a href="">
            <span>Following</span>
            <br />
            <span className="user-following">{following}</span>
          </a>
        </div>
        <div className="col col-xs-4">
          <a href="">
            <span>Followers</span>
            <br />
            <span className="user-followers">{followers}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
