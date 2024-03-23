import React from 'react';

export const TrendsDisplay = ({ trends }) => {
  return (
    <div className="col col-xs-9 mt-2">
      <div className="trends">
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
