import React from 'react';

import icons from '../../utils/getIcons';

export default function NoGroupData() {
  return (
    <div className="groups d-flex flex-column align-items-center justify-content-center px-3">
      <img
        className="img-fluid"
        src={icons.group_no_data}
        alt="New things are coming soon!"
      />
      <h5 className="text-center text-muted mt-5 mb-2">
        {"You're"} not in any group yet.
        <br />
        Join our server and find one that fits you!
      </h5>
      <a
        href="https://discord.gg/DVmruvFfDN"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join our discord server
      </a>
    </div>
  );
}
