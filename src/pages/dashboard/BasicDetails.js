import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// ICONS
import default_user from '../../assets/images/default_user.svg';
import UserImage from '../../components/UserImage';
import birthday from '../../assets/images/dashboard/birthday.svg';
import github from '../../assets/images/dashboard/github.svg';
import linkedin from '../../assets/images/dashboard/linkedin.svg';
import resume from '../../assets/images/dashboard/resume.svg';
import team from '../../assets/images/dashboard/team.svg';
import batch from '../../assets/images/dashboard/batch.svg';
import edit from '../../assets/images/dashboard/edit.svg';

// COMPONENTS
import { BasicDetailsModal } from './modals/BasicDetailsModal';
import { Row } from './components/Row';

export const BasicDetails = ({ user }) => {
  const [modalShow, setModalShow] = useState(false);
  const loginState = useSelector((state) => state.loginState);
  const currentUsername = loginState.loggedIn ? loginState.username : '';
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
              src={user.image_url ? user.image_url : default_user}
              alt={`Shrishti's profile`}
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
                  src={github}
                  alt={github}
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
                  src={linkedin}
                  alt={linkedin}
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
                  src={resume}
                  alt={resume}
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
          <Row icon={birthday} value={user.dob || DEFAULT_VALUE} />
          <Row
            icon={team}
            value={`Team : ${user.group_name || DEFAULT_VALUE}`}
          />
          <Row icon={batch} value={`Batch : ${user.batch || DEFAULT_VALUE}`} />
        </div>
        <div className="d-flex justify-content-end">
          {user === currentUsername && (
            <img
              src={edit}
              alt="edit"
              onClick={() => setModalShow(true)}
              style={{ cursor: 'pointer' }}
              height="20px"
              width="20px"
            />
          )}
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
