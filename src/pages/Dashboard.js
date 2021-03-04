import React from 'react';
import { useSelector } from 'react-redux';
import default_user from '../assets/images/default_user.png';

export default function Dashboard() {
  const user = useSelector((state) => state.loginState.user);

  return (
    <div
      className="my-5 d-flex flex-wrap align-items-start justify-content-center"
      style={{ minHeight: '70vh' }}
    >
      <div className="d-flex flex-column shadow profile-card mb-4 mx-5">
        <div className="profile-img-bg" />

        <div className="mx-4">
          <img
            src={user.image_url || default_user}
            alt={`${user.name}'s profile`}
            className="profile-img"
          />
          <h1 className="h5 my-2">{user.name}</h1>
          <h5 className="h6 text-muted my-2">{user.username}</h5>
        </div>
      </div>

      <div
        className="d-flex flex-column shadow comming-soon-card"
        style={{ margin: '0px auto', width: '100%', maxWidth: '500px' }}
      >
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
