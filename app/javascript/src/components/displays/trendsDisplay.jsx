import React, { useEffect, useState } from 'react';

/**
 * Renders the TrendsDisplay component used to display trend links.
 */
export const TrendsDisplay = () => {
  const [trends, setTrends] = useState([]);

  // fetch user's followers to get amount; set to defaults for now since it is not part of project requirements
  useEffect(() => {
    const load = async () => {
      // normally a service call would be made here to fetch the trends
      setTrends(['#Hongkong', '#Ruby', '#foobarbaz', '#rails', '#API']);
    };
    load();
  }, []);
  return (
    <div className="info-box">
      <div className="mx-2">
        <div className="trends-twitter">
          <span>Trends</span>
          <span> · </span>
          <small>
            <a href="">Change</a>
          </small>
        </div>
        <ul className="trends-list">
          {trends.map((trend, index) => (
            <li key={index}>
              <a href="#">{trend}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
