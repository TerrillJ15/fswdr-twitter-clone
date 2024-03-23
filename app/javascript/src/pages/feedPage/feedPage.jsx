import React, { useState } from 'react';
import { ProfileDisplay } from '../../components/displays/profileDisplay.jsx';
import { TrendsDisplay } from '../../components/displays/trendsDisplay.jsx';
import { TweetFeedDisplay } from '../../components/displays/tweetFeedDisplay.jsx';
import { TweetForm } from '../../components/forms/tweetForm.jsx';
import './feedPage.scss';

export const FeedPage = () => {
  const [tweets, setTweets] = useState([]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-xs-3">
          <ProfileDisplay
            profileName="TO DO"
            userName="TO DO"
            tweets={0}
            following={0}
            followers={0}
          />
          <TrendsDisplay
            trends={['#Hongkong', '#Ruby', '#foobarbaz', '#rails', '#API']}
          />
        </div>
        <div className="col col-xs-9">
          <TweetForm />
          <TweetFeedDisplay tweets={tweets} />
        </div>
      </div>
    </div>
  );
};
