import React, { useState } from 'react';

// ICONS
import userIcon from '../../../assets/images/dashboard/user-outline.svg';
import birthdayIcon from '../../../assets/images/dashboard/birthday.svg';
import linkedinIcon from '../../../assets/images/dashboard/linkedin-outline.svg';
import githubIcon from '../../../assets/images/dashboard/github-outline.svg';
import resumeIcon from '../../../assets/images/dashboard/resume-outline.svg';
import saveIcon from '../../../assets/images/dashboard/save.svg';

import { Modal } from 'react-bootstrap';
import { API_ENDPOINTS } from '../../../constants/api';
import axios from '../../../config/axios.config';
import myLog from '../../../utils/myLog';
import useActions from '../../../hooks/useActions';
import { login } from '../../../actions/loginActions';

export const BasicDetailsModal = ({ modalProps, user, id }) => {
  // State for Modal
  const [details, setDetails] = useState({
    name: user.name || '',
    github_url: user.github_url || '',
    linkedin_url: user.linkedin_url || '',
    resume_url: user.resume_url || '',
    dob: user.dob || '',
  });

  const actions = useActions({ login });

  const handleSumbit = async () => {
    myLog(details);

    try {
      const response = await axios.put(
        `${API_ENDPOINTS.USER}/${id}`,
        {
          data: {
            id: id.toString(),
            type: 'users',
            attributes: details,
          },
        },
        {
          headers: {
            'content-type': 'application/vnd.api+json',
          },
        }
      );
      myLog('response from api: ', response);
      if (
        response.data &&
        response.data.data &&
        response.data.data.attributes
      ) {
        actions.login(response.data.data.attributes);
        myLog('User Detail Updated');
      }
      modalProps.onHide();
    } catch (err) {
      myLog('error from api: ', err);
      modalProps.onHide();
    }
  };

  return (
    <Modal
      {...modalProps}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: '#E3D2FF' }}>
        <Modal.Title id="contained-modal-title-vcenter font-weight-bold ">
          Basic Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex flex-column align-items-center"
          style={{
            maxHeight: '30vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
            <img src={userIcon} alt="user-icon" height="25px" width="25px" />
            <input
              type="text"
              className="p-2 ml-3 w-100"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              style={{
                boxShadow: '0px 0px 10px #8264B433',
                border: '0.800000011920929px solid #D6CCE6',
                borderRadius: '13px',
              }}
              placeholder="Name"
            />
          </div>
          <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
            <img
              src={birthdayIcon}
              alt="cake-icon"
              height="25px"
              width="25px"
            />
            <input
              type="date"
              className="p-2 ml-3 w-100"
              value={details.dob}
              onChange={(e) => setDetails({ ...details, dob: e.target.value })}
              style={{
                boxShadow: '0px 0px 10px #8264B433',
                border: '0.800000011920929px solid #D6CCE6',
                borderRadius: '13px',
              }}
              placeholder="DD-MM-YYYY"
            />
          </div>
          <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
            <img
              src={githubIcon}
              alt="github-icon"
              height="25px"
              width="25px"
            />
            <input
              type="text"
              className="p-2 ml-3 w-100"
              value={details.github_url}
              onChange={(e) =>
                setDetails({ ...details, github_url: e.target.value })
              }
              style={{
                boxShadow: '0px 0px 10px #8264B433',
                border: '0.800000011920929px solid #D6CCE6',
                borderRadius: '13px',
              }}
              placeholder="GitHub Profile Link"
            />
          </div>
          <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
            <img
              src={linkedinIcon}
              alt="linkedin-icon"
              height="25px"
              width="25px"
            />
            <input
              type="text"
              className="p-2 ml-3 w-100"
              value={details.linkedin_url}
              onChange={(e) =>
                setDetails({ ...details, linkedin_url: e.target.value })
              }
              style={{
                boxShadow: '0px 0px 10px #8264B433',
                border: '0.800000011920929px solid #D6CCE6',
                borderRadius: '13px',
              }}
              placeholder="LinkedIn Profile Link"
            />
          </div>
          <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
            <img
              src={resumeIcon}
              alt="resume-icon"
              height="25px"
              width="25px"
            />
            <input
              type="text"
              className="p-2 ml-3 w-100"
              value={details.resume_url}
              onChange={(e) =>
                setDetails({ ...details, resume_url: e.target.value })
              }
              style={{
                boxShadow: '0px 0px 10px #8264B433',
                border: '0.800000011920929px solid #D6CCE6',
                borderRadius: '13px',
              }}
              placeholder="Resume Link"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <img
          src={saveIcon}
          alt="save-icon"
          className="mx-2"
          height="35px"
          onClick={() => handleSumbit()}
          style={{ cursor: 'pointer' }}
        />
      </Modal.Footer>
    </Modal>
  );
};
