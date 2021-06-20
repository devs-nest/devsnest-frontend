import React, { useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { login } from '../../actions/loginActions';
import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
import useActions from '../../hooks/useActions';
import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';



export const BasicDetailsModal = ({ modalProps, user, id }) => {
  // State for Modal
  const [details, setDetails] = useState({
    name: user.name || '',
    github_url: user.github_url || '',
    linkedin_url: user.linkedin_url || '',
    resume_url: user.resume_url || '',
    dob: user.dob || '',
    username: user.username || '',
  });

  const actions = useActions({ login });

  const handleSumbit = async () => {
    myLog(details);

    try {
      const response = await axios.put(
        `${API_ENDPOINTS.UPDATE_USER}/${id}`,
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
    <>
   
      <Modal
        {...modalProps}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton  style={{ backgroundColor: '#E3D2FF' }}>
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
              <img
                src={icons.user_outline}
                alt="user-icon"
                height="25px"
                width="25px"
              />
              <input
                type="text"
                className="p-2 ml-3 w-100"
                value={details.username}
                onChange={(e) =>
                  setDetails({ ...details, username: e.target.value })
                }
                style={{
                  boxShadow: '0px 0px 10px #8264B433',
                  border: '0.800000011920929px solid #D6CCE6',
                  borderRadius: '13px',
                }}
                placeholder="username"
                disabled={user.update_count >= 2}
              />
	
            </div>
<small className="text-muted">You Can Change your Username <span className="text-danger">{2-user.update_count}</span> times more</small>
<div className="m-2 my-3 px-3 d-flex align-items-center w-100">
              <img
                src={icons.user_real_name}
                alt="name-icon"
                height="25px"
                width="25px"
              />
              <input
                type="text"
                className="p-2 ml-3 w-100"
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details,name: e.target.value })
                }
                style={{
                  boxShadow: '0px 0px 10px #8264B433',
                  border: '1px solid #D6CCE6',
                  borderRadius: '13px',
                }}
                placeholder="Real Name"
               
              />
            </div>
            <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
              <img
                src={icons.user_birthday}
                alt="cake-icon"
                height="25px"
                width="25px"
              />
              <input
                type="date"
                className="p-2 ml-3 w-100"
                value={details.dob}
                onChange={(e) =>
                  setDetails({ ...details, dob: e.target.value })
                }
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
                src={icons.github_outline}
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
                placeholder="GitHub Profile Full Link"
              />
            </div>
            <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
              <img
                src={icons.linkedin_outline}
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
                placeholder="LinkedIn Profile Full Link"
              />
            </div>
            <div className="m-2 my-3 px-3 d-flex align-items-center w-100">
              <img
                src={icons.resume_outline}
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
                placeholder="Resume Full Link"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <img
            src={icons.save}
            alt="save-icon"
            className="mx-2"
            height="35px"
            onClick={() => handleSumbit()}
            style={{ cursor: 'pointer' }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
