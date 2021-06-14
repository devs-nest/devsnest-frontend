import React, { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import { useSelector } from 'react-redux';
import styles from '../assets/css/groupsView.module.scss';
import { API_ENDPOINTS } from '../constants/api';
import axios from '../config/axios.config';
import myLog from '../utils/myLog';
import { Redirect } from 'react-router-dom';

export default function AllGroups() {
  const [allTeams, setAllTeams] = useState([]);
  const [myTeam, setMyTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const my_group_id = useSelector((state) => state.loginState.user.group_id);
  useEffect(() => {
    async function getAllTeams() {
      try {
        const {
          data: { data },
        } = await axios.get(`${API_ENDPOINTS.GROUPS}`);

        let otherTeam = [],
          myTeam = [];
        for (let i = 0; i < data.length; i++) {
          if (parseInt(data[i].id, 10) === my_group_id) {
            myTeam.push(data[i]);
          } else {
            otherTeam.push(data[i]);
          }
        }

        setMyTeam(myTeam[0]);
        setAllTeams(otherTeam);
        setLoading(false);
      } catch (e) {
        myLog(e);
      }
    }
    getAllTeams();
  }, []);

  if (loading) {
    return (
      <div className="groups d-flex">
        <div className="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

  return (
    <>
      {my_group_id !== null ? (
        <div id={styles.myTeam}>
          <TeamCard key={myTeam.id} {...myTeam.attributes} />
        </div>
      ) : null}
      {allTeams.length > 1 && (
        <div id={styles.OtherTeamDemarcation}>
          <div></div>
          <p>Other Teams</p>
          <div></div>
        </div>
      )}
      <div className={styles.TeamView}>
        {allTeams.length !== 0 &&
          allTeams.map((team) => (
            <TeamCard key={team.id} {...team.attributes}></TeamCard>
          ))}
      </div>
      {allTeams.length === 0 && my_group_id === null && (
        <Redirect to="/groups/null" />
      )}
    </>
  );
}
