import React from 'react';
import { useSelector } from 'react-redux';

import { AcademicDetails } from '../components/Dashboard/AcademicDetails';
import { ActivityMap } from '../components/Dashboard/ActivityMap';
import { BasicDetails } from '../components/Dashboard/BasicDetails';
import { ProblemsDetails } from '../components/Dashboard/ProblemsDetails';
import { ProjectsComingSoon } from '../components/Dashboard/ProjectsComingSoon';
import UsernameChangeNotifier from '../components/Dashboard/UsernameChangeNotifier.js';
import { ConnectWithDiscordBanner } from '../components/Layout/Navbar';
export default function Dashboard() {
  const user = useSelector((state) => state.loginState.user);
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      {user.login_count < 2 && (
        <UsernameChangeNotifier user={user} setModalShow={setModalShow} />
      )}
      <ConnectWithDiscordBanner />

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
            <BasicDetails
              user={user}
              modalShow={modalShow}
              setModalShow={setModalShow}
            />
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
