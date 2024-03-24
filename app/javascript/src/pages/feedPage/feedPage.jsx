import React, { useState } from 'react';
import { ProfileDisplay } from '../../components/displays/profileDisplay.jsx';
import { TrendsDisplay } from '../../components/displays/trendsDisplay.jsx';
import { TweetFeedDisplay } from '../../components/displays/tweetFeedDisplay.jsx';
import { TweetForm } from '../../components/forms/tweetForm.jsx';
import { useAuthenticatedUser } from '../../hooks/authenticateUserHook.js';
import './feedPage.scss';

export const FeedPage = () => {
  const username = useAuthenticatedUser();
  const [trends, setTrends] = useState();
  const [tweets, setTweets] = useState([]);

  // retrieve authenticated user

  // retrieve trends

  // retrieve latest tweets to display on feed
  return (
    <div className="container">
      <div className="row no-gutters">
        <div className="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1">
          <div className="row no-gutters">
            <div className="col-4 col-md-6 col-lg-3">
              <div className="mb-2">
                <ProfileDisplay username={username} />
              </div>
              <div>
                <TrendsDisplay username={username} />
              </div>
            </div>
            <div className="col-8 col-md-6 col-lg-6">
              <div className="mb-2">
                <TweetForm username={username} />
              </div>
              <div>
                <TweetFeedDisplay username={null} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
