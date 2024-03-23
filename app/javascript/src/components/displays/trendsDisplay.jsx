import React from 'react';

export const TrendsDisplay = ({ trends }) => {
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
