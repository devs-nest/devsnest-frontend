import '../../assets/css/groups.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import icons from '../../utils/getIcons';

export default function TeamCard({ name, owner_name, co_owner_name, slug }) {
  return (
    <div className="card w-33 my-3 group-card">
      <div className="card-header d-flex align-items-center py-2 px-3 group-card-header">
        <h4 className="text-truncate mb-0 mr-3">{name}</h4>
        <Link
          to={`/groups/${slug}`}
          className="ml-auto"
          style={{ userSelect: 'none' }}
        >
          <img src={icons.group_left_arrow} alt="" width={44} height={44} />
        </Link>
      </div>
      <div className="card-body p-3">
        <p className="mb-2 text-truncate">
          Team Leader: {owner_name || 'No owner'}
        </p>
        <p className="mb-0 text-truncate">
          Vice Team Leader: {co_owner_name || 'No co-owner'}
        </p>
      </div>
    </div>
  );
}
