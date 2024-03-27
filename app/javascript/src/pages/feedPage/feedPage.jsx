import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileDisplay } from '../../components/displays/profileDisplay.jsx';
import { TrendsDisplay } from '../../components/displays/trendsDisplay.jsx';
import { TweetFeedDisplay } from '../../components/displays/tweetFeedDisplay.jsx';
import { TweetForm } from '../../components/forms/tweetForm.jsx';
import { AppContext } from '../../contexts/appContext.js';
import {
  deleteTweet,
  getAllTweets,
  getUserTweets,
} from '../../services/tweetsService.js';
import './feedPage.scss';

export const FeedPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const { username } = useParams();
  const [tweets, setTweetsState] = useState(undefined);

  /**
   * Sets the tweets state and sorts the tweets by id in descending order.
   *
   * @param {Array} newTweets - The array of tweets to set.
   */
  const setTweets = newTweets => {
    const sortedTweets = newTweets.sort(
      (a, b) => parseInt(b.id) - parseInt(a.id), // normally would be date, but only ids are available
    );
    setTweetsState(sortedTweets);
  };

  // load the tweets when the current user is authenticated
  useEffect(() => {
    const load = async () => {
      // validate user
      if (user === undefined) return; // not authenticated
      if (user === null) {
        navigate('/'); // redirect to home page if user is not authenticated
        return;
      }

      // get tweets
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
  }, [user, username]);

  const onTweetPost = newTweet => {
    setTweets([...tweets, newTweet]);
  };

  const onDelete = async id => {
    const result = await deleteTweet(id);
    if (result) {
      setTweets(tweets.filter(tweet => tweet.id !== id));
    }
  };
  return (
    <div
      className="body"
      style={{
        backgroundImage:
          "url('https://abs.twimg.com/images/themes/theme1/bg.png')",
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
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
                  {!username && <h2>Main Feed</h2>}
                </div>
                <div>
                  <TrendsDisplay />
                </div>
              </div>
              <div className="col-8 col-md-6 col-lg-6">
                <div className="mb-2">
                  {(!username || username === user) && (
                    <TweetForm
                      username={user}
                      onTweetPost={onTweetPost}
                    />
                  )}
                </div>
                <div>
                  <TweetFeedDisplay
                    username={user}
                    tweets={tweets}
                    onDelete={onDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
