import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';
import myLog from '../utils/myLog';
import { AcademicDetails } from '../pages/dashboard/AcademicDetails';
import { ActivityMap } from '../pages/dashboard/ActivityMap';
import { BasicDetails } from '../pages/dashboard/BasicDetails';
import { ProblemsDetails } from '../pages/dashboard/ProblemsDetails';
import { ProjectsComingSoon } from '../pages/dashboard/ProjectsComingSoon';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const loginState = useSelector((state) => state.loginState);

  let history = useHistory();
  if (loginState.loggedIn && username === loginState.user.username) {
    history.push('/');
  }
  useEffect(() => {
    const loadData = async () => {
      try {
        const userRequest = await axios.get(
          `${API_ENDPOINTS.USER}/${username}/get_by_username`
        );
        setUser(userRequest.data.data.attributes);
      } catch (e) {
        setError(e.message);
        myLog(e);
      }
    };
    loadData();
  }, [username]);

  if (error) {
    return <div> {error} </div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="p-1 py-4"
        style={{
          minHeight: 'calc(100vh - 92px)',
          backgroundColor: '#F2EFF7',
        }}
      >
        <div
          className="d-flex flex-column m-auto justify-content-center"
          style={{ maxWidth: '1225px' }}
        >
          {/* Row 1 */}
          <div className="d-flex flex-wrap justify-content-center">
            <BasicDetails user={user} />
            <div className="d-flex flex-wrap flex-fill justify-content-center">
              <AcademicDetails user={user} />
              <ProblemsDetails user={user} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="d-flex flex-wrap justify-content-center">
            <ProjectsComingSoon />
            <ActivityMap user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
