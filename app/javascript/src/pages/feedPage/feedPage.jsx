import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileDisplay } from '../../components/displays/profileDisplay.jsx';
import { TrendsDisplay } from '../../components/displays/trendsDisplay.jsx';
import { TweetFeedDisplay } from '../../components/displays/tweetFeedDisplay.jsx';
import { TweetForm } from '../../components/forms/tweetForm.jsx';
import { useAuthenticatedUser } from '../../hooks/authenticateUserHook.js';
import { getAllTweets, getUserTweets } from '../../services/tweetsService.js';
import './feedPage.scss';

export const FeedPage = () => {
  const currentUser = useAuthenticatedUser();
  const { username } = useParams();
  const [tweets, setTweetsState] = useState(undefined);

  /**
   * Sets the tweets state and sorts the tweets by id in descending order.
   *
   * @param {Array} tweets - The array of tweets to set.
   */
  const setTweets = tweets => {
    setTweetsState(tweets.sort((a, b) => parseInt(b.id) - parseInt(b.id)));
  };

  // load the tweets when the current user is authenticated
  useEffect(() => {
    const load = async () => {
      if (!currentUser) return; // not authenticated
      let tweets = [];
      if (!username) {
        // fetch all tweets
        tweets = await getAllTweets();
      } else {
        // fetch user tweets
        tweets = await getUserTweets(username);
      }
      setTweets(tweets);
    };
    load();
  }, [currentUser]);

  const onTweetPost = tweet => {
    setTweets([tweets, ...tweet]);
  };
  return (
    <div className="container">
      <div className="row no-gutters">
        <div className="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1">
          <div className="row no-gutters">
            <div className="col-4 col-md-6 col-lg-3">
              <div className="mb-2">
                {username && (
                  <ProfileDisplay
                    username={username}
                    tweets={tweets}
                  />
                )}
                {!username && <h1>Main Feed</h1>}
              </div>
              <div>
                <TrendsDisplay />
              </div>
            </div>
            <div className="col-8 col-md-6 col-lg-6">
              <div className="mb-2">
                {(!username || username === currentUser) && (
                  <TweetForm
                    username={currentUser}
                    onTweetPost={onTweetPost}
                  />
                )}
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
