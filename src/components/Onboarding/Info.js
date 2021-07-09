import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

export const Info = ({ content, percentage, progressPercent }) => {
  return (
    <div className="shadow profile-card py-4 px-4 flex-fill m-5 d-lg-flex flex-column justify-content-between left-content onboarding-info d-none">
      <div>
        <div className="main-title my-4">Devsnest&apos;s 6 months course</div>
        <ul>
          {content.map((data, index) => {
            return (
              <li key={index} className="my-3">
                <div
                  key={data.title}
                  className="title"
                  style={{ cursor: 'default' }}
                >
                  {data.title}
                </div>
                <div className="description close" key={data.description}>
                  {data.description}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="d-flex mt-5 mb-4 ml-4 justify-content-space-between">
        <button
          className="applying-button blue-border-button"
          style={{ cursor: 'default' }}
        >
          Applying
        </button>
        <div style={{ width: '60px', marginLeft: '40px' }}>
          <CircularProgressbar
            value={progressPercent > 95 ? 100 : percentage}
            text={`${progressPercent > 95 ? 100 : percentage}%`}
            strokeWidth={12}
            styles={buildStyles({
              textColor: 'darkgray',
              pathColor: '#55CB6E',
            })}
          />
        </div>
      </div>
    </div>
  );
};
