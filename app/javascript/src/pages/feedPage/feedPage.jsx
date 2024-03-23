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
      <div className="row no-gutters">
        <div className="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1">
          <div className="row no-gutters">
            <div className="col-4 col-md-6 col-lg-3">
              <div className="mb-2">
                <ProfileDisplay
                  profileName="TO DO"
                  userName="TO DO"
                  tweets={0}
                  following={0}
                  followers={0}
                />
              </div>
              <div>
                <TrendsDisplay
                  trends={[
                    '#Hongkong',
                    '#Ruby',
                    '#foobarbaz',
                    '#rails',
                    '#API',
                  ]}
                />
              </div>
            </div>
            <div className="col-8 col-md-6 col-lg-6">
              <div className="mb-2">
                <TweetForm />
              </div>
              <div>
                <TweetFeedDisplay tweets={tweets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
