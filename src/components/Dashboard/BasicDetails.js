import React from 'react';

import UserImage from '../../components/Layout/UserImage';
import icons from '../../utils/getIcons';
import { BasicDetailsModal } from './BasicDetailsModal';
import { Row } from './Row';

export const BasicDetails = ({ user, modalShow, setModalShow }) => {
  // Default values
  const DEFAULT_VALUE = '-- N/A --';

  return (
    <div
      className="d-flex flex-column shadow profile-card m-3"
      style={{ width: '350px' }}
    >
      <div className="profile-img-bg">{user.username}</div>
      <div className="mx-4">
        <div className="d-flex flex-wrap align-items-start justify-content-between">
          <div>
            <UserImage
              src={user.image_url ? user.image_url : icons.user_default_profile}
              alt="user-profile"
              className="profile-img"
            />
          </div>
          <div className="pt-3">
            {user.github_url && (
              <a
                href={user.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icons.github}
                  alt="github-icon"
                  className="pl-3"
                  height="27px"
                  style={{ cursor: 'pointer' }}
                />
              </a>
            )}
            {user.linkedin_url && (
              <a
                href={user.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icons.linkedin}
                  alt="linkedin-icon"
                  className="pl-3"
                  height="27px"
                  style={{ cursor: 'pointer' }}
                />
              </a>
            )}
            {user.resume_url && (
              <a
                href={user.resume_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icons.resume}
                  alt="resume-icon"
                  className="pl-3"
                  height="27px"
                  style={{ cursor: 'pointer' }}
                />
              </a>
            )}
          </div>
        </div>
        <h1 className="h5 my-2 font-weight-bold">{user.name}</h1>
        <div className="py-1">
          <Row icon={icons.user_birthday} value={user.dob || DEFAULT_VALUE} />
          <Row
            icon={icons.user_team}
            value={`Team : ${user.group_name || DEFAULT_VALUE}`}
          />
          <Row
            icon={icons.user_batch}
            value={`Batch : ${user.batch || DEFAULT_VALUE}`}
          />
        </div>
        <div className="d-flex justify-content-end">
          <img
            src={icons.edit_outline}
            alt="edit"
            onClick={() => setModalShow(true)}
            style={{ cursor: 'pointer' }}
            height="20px"
            width="20px"
          />
        </div>
      </div>
      {modalShow && (
        <BasicDetailsModal
          modalProps={{ show: modalShow, onHide: () => setModalShow(false) }}
          user={user}
          id={user.id}
        />
      )}
    </div>
  );
};
