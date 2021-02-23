import React from 'react';
import { Link } from 'react-router-dom';
import taken_by_ufo from '../assets/images/taken_by_ufo.svg';

function NotFound() {
  return (
    <div
      style={{ height: '100vh' }}
      className="d-flex flex-column align-items-center justify-content-center mx-4"
    >
      <img
        src={taken_by_ufo}
        alt="Human taken away by ufo"
        style={{
          width: '100%',
          height: 300,
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
      <h2 className="text-secondary text-center mt-5 mb-3">
        This page doesn't exists.
      </h2>
      <Link to="/" className="text-center">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
