import React, { useState } from 'react';

// ICONS
import academicLevel from '../../assets/images/dashboard/academicLevel.svg';
import branch from '../../assets/images/dashboard/branch.svg';
import college from '../../assets/images/dashboard/college.svg';
import rollNumber from '../../assets/images/dashboard/rollNumber.svg';
import session from '../../assets/images/dashboard/session.svg';
import year from '../../assets/images/dashboard/year.svg';
import edit from '../../assets/images/dashboard/edit.svg';

// COMPONENTS
import { AcademicDetailsModal } from './modals/AcademicDetailsModal';
import { Row } from './components/Row';

export const AcademicDetails = ({ user }) => {
  const [modalShow, setModalShow] = useState(false);

  // Default Values
  const DEFAULT_GRAD_STATUS = '-- N/A --';
  const DEFAULT_COLLEGE_NAME = '-- N/A --';
  const DEFAULT_REGISTRATION_NUM = '-- N/A --';
  const DEFAULT_GRAD_SPECIALIZATION = '-- N/A --';
  const DEFAULT_GRAD_START = '-- N/A -- ';
  const DEFAULT_GRAD_END = '-- N/A --';
  const DEFAULT_GRAD_YEAR = '-- N/A --';

  // Function to add Ordinal Suffix to a Number: Example 1 -> 1st, 2 -> 2nd, 3 -> 3rd
  const addOrdinalSuffix = (i) => {
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + 'st';
    }
    if (j === 2 && k !== 12) {
      return i + 'nd';
    }
    if (j === 3 && k !== 13) {
      return i + 'rd';
    }
    return i + 'th';
  };

  return (
    <div
      className="d-flex flex-column flex-fill shadow user-detail-card py-3 px-1 m-3"
      style={{ maxWidth: '400px' }}
    >
      <div className="mx-4" style={{ backgroundColor: '#FFFFFF' }}>
        <h1 className="h5 my-2 font-weight-bold mb-3">Academic Details:</h1>
        <div className="py-1">
          <Row
            icon={academicLevel}
            value={user.grad_status ? user.grad_status : DEFAULT_GRAD_STATUS}
          />
          <Row
            icon={college}
            value={user.college_name ? user.college_name : DEFAULT_COLLEGE_NAME}
          />
          <Row
            icon={rollNumber}
            value={
              user.registration_num
                ? user.registration_num
                : DEFAULT_REGISTRATION_NUM
            }
          />
          <Row
            icon={branch}
            value={
              user.grad_specialization
                ? user.grad_specialization
                : DEFAULT_GRAD_SPECIALIZATION
            }
          />
          <Row
            icon={session}
            value={`${
              user.grad_start ? user.grad_start : DEFAULT_GRAD_START
            } - ${user.grad_end ? user.grad_end : DEFAULT_GRAD_END}`}
          />
          <Row
            icon={year}
            value={
              user.grad_year
                ? `${addOrdinalSuffix(user.grad_year)} Year`
                : DEFAULT_GRAD_YEAR
            }
          />
        </div>
        <div className="d-flex justify-content-end">
          <img
            src={edit}
            alt="edit"
            onClick={() => setModalShow(true)}
            style={{ cursor: 'pointer' }}
            height="20px"
            width="20px"
          />
        </div>
      </div>
      {modalShow && (
        <AcademicDetailsModal
          modalProps={{ show: modalShow, onHide: () => setModalShow(false) }}
          user={user}
          id={user.id}
        />
      )}
    </div>
  );
};
