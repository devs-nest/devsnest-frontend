import React from 'react';

export const Info = ({ content }) => {
  return (
    <div className="shadow profile-card py-4 px-4 flex-fill m-5 d-md-flex flex-column justify-content-start left-content onboarding-info d-none">
      <div className="main-title my-4">Devsnest&apos;s 6 months course</div>
      <ul>
        {content.map((data, index) => {
          return (
            <li key={index}>
              <div key={data.title} className="title">
                {data.title}
              </div>
              <div
                className={`description ${data.isOpen ? 'open' : 'close'}`}
                key={data.description}
              >
                {data.description}
              </div>
            </li>
          );
        })}
      </ul>
      <button
        className="applying-button blue-border-button"
        style={{ cursor: 'default' }}
      >
        Applying
      </button>
    </div>
  );
};
