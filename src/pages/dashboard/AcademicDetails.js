import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

// UTILS
import { addOrdinalSuffix } from '../../utils/addOrdinalSuffix';

export const AcademicDetails = ({ user }) => {
  const [modalShow, setModalShow] = useState(false);
  const loginState = useSelector((state) => state.loginState);
  console.log(loginState);
  // Default Values
  const DEFAULT_VALUE = '-- N/A --';

  return (
    <div
      className="d-flex flex-column flex-fill shadow user-detail-card py-3 px-1 m-3"
      style={{ maxWidth: '400px' }}
    >
      <div className="mx-4" style={{ backgroundColor: '#FFFFFF' }}>
        <h1 className="h5 my-2 font-weight-bold mb-3">Academic Details:</h1>
        <div className="py-1">
          <Row icon={academicLevel} value={user.grad_status || DEFAULT_VALUE} />
          <Row icon={college} value={user.college_name || DEFAULT_VALUE} />
          <Row
            icon={rollNumber}
            value={user.registration_num || DEFAULT_VALUE}
          />
          <Row
            icon={branch}
            value={user.grad_specialization || DEFAULT_VALUE}
          />
          <Row
            icon={session}
            value={`${user.grad_start || DEFAULT_VALUE} - ${
              user.grad_end || DEFAULT_VALUE
            }`}
          />
          <Row
            icon={year}
            value={
              user.grad_year
                ? `${addOrdinalSuffix(user.grad_year)} Year`
                : DEFAULT_VALUE
            }
          />
        </div>
        <div className="d-flex justify-content-end">
          {loginState.loggedIn &&
            user.username === loginState.user.username && (
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
        <AcademicDetailsModal
          modalProps={{ show: modalShow, onHide: () => setModalShow(false) }}
          user={user}
          id={user.id}
        />
      )}
    </div>
  );
};
