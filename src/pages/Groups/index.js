import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TeamCard from '../../components/AllTeams/TeamCard';
import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';

export default function AllGroups() {
  const history = useHistory();
  const [allTeams, setAllTeams] = useState([]);
  const [myTeam, setMyTeam] = useState(null);
  const my_group_id = useSelector((state) => state.loginState.user.group_id);
  const [isLoading, setIsLoading] = useState(true);
  const [noTeam, setNoTeam] = useState(false);

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
    return (
      <div className="groups d-flex flex-column align-items-center justify-content-center px-3">
        <img
          className="img-fluid"
          src={icons.group_no_data}
          alt="New things are coming soon!"
        />
        <h5 className="text-center text-muted mt-5 mb-2">
          {"You're"} not in any group yet.
          <br />
          Join our server and find one that fits you!
        </h5>
        <a
          href="https://discord.gg/DVmruvFfDN"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join our discord server
        </a>
      </div>
    );
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

            <div className="d-flex flex-wrap">
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
