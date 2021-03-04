import React from 'react';

export default function CommingSoon() {
  return (
    <div
      className="my-5 d-flex flex-wrap align-items-start justify-content-center"
      style={{ minHeight: '70vh' }}
    >
      <div className="d-flex flex-column shadow mx-4 comming-soon-card">
        <img
          src={require('../assets/images/under_construction.svg')}
          alt="Under Construction"
          className="mb-4"
        />
        <h5 className="text-center mx-4 mb-3">
          Exciting things are coming soon!
        </h5>
      </div>
    </div>
  );
}
