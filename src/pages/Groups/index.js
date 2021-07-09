import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NoGroupData from '../../components/Groups/NoGroupData';
import TeamCard from '../../components/Groups/TeamCard';
import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
import { useUser } from '../../redux';
import myLog from '../../utils/myLog';

export default function AllGroups() {
  const history = useHistory();
  const [allTeams, setAllTeams] = useState([]);
  const [myTeam, setMyTeam] = useState(null);
  const user = useUser();
  const my_group_id = user.group_id;
  const [isLoading, setIsLoading] = useState(true);
  const [noTeam, setNoTeam] = useState(false);

  useEffect(() => {
    if (user.group_name === null) {
      history.push('/onboarding');
      return;
    }
  }, [history, user]);

  useEffect(() => {
    const getAllTeams = async () => {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await axios.get(`${API_ENDPOINTS.GROUPS}`);

        let otherTeam = [];
        let myTeam = null;
        for (let i = 0; i < data.length; i++) {
          if (parseInt(data[i].id, 10) === my_group_id) {
            myTeam = data[i];
          } else {
            otherTeam.push(data[i]);
          }
        }

        if (otherTeam.length === 0) {
          if (myTeam && myTeam.attributes) {
            history.push(`/groups/${myTeam.attributes.slug}`);
          } else {
            setNoTeam(true);
          }
        } else {
          setMyTeam(myTeam);
          setAllTeams(otherTeam);
        }
      } catch (e) {
        myLog(e);
      }
      setIsLoading(false);
    };

    getAllTeams();
  }, [my_group_id, history]);

  if (isLoading) {
    return (
      <div className="groups d-flex">
        <div className="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

  if (noTeam) {
    return <NoGroupData />;
  }

  return (
    <div className="groups">
      <div className="d-flex flex-column container py-5">
        {myTeam && (
          <div className="d-flex flex-column">
            <h3 className="mb-4">My team</h3>
            <TeamCard {...myTeam.attributes} />
          </div>
        )}

        {allTeams.length > 0 && (
          <div className="d-flex flex-column">
            <h3 className="mb-4 d-flex align-items-center">
              <div style={{ height: 1, flex: 1 }} className="bg-dark" />
              <span className="mx-3">Other teams</span>
              <div style={{ height: 1, flex: 1 }} className="bg-dark" />
            </h3>

            <div className="d-flex align-items-stretch justify-content-around flex-wrap">
              {allTeams.map((team) => (
                <TeamCard key={team.id} {...team.attributes} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
