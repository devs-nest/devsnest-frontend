import '../../assets/css/groups.scss';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import default_user from '../../assets/images/default_user.png';
import assignment_checking from '../../assets/images/groups/assignment_checking.svg';
import discussions_doubts from '../../assets/images/groups/discussions_doubts.svg';
import doubt_class from '../../assets/images/groups/doubt_class.svg';
import mentor_feedback from '../../assets/images/groups/mentor_feedback.svg';
import mentor_mentee_feedback from '../../assets/images/groups/mentor_mentee_feedback.svg';
import no_data from '../../assets/images/groups/no_data.svg';
import peer_interviews from '../../assets/images/groups/peer_interviews.svg';
import scrums from '../../assets/images/groups/scrums.svg';
import team_leader from '../../assets/images/groups/team_leader.svg';
import UserImage from '../../components/Layout/UserImage';
import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
import myLog from '../../utils/myLog';

const group_activities = [
  { title: 'Scrums', key: 'scrums', img: scrums },
  {
    title: 'Discussions & Doubts',
    key: 'discussions_doubts',
    img: discussions_doubts,
  },
  { title: 'Doubt Class', key: 'doubt_class', img: doubt_class },
  { title: 'Peer interviews', key: 'peer_interviews', img: peer_interviews },
  {
    title: 'Mentor/Mentee Feedback',
    key: 'mentor_mentee_feedback',
    img: mentor_mentee_feedback,
  },
  {
    title: 'Assignment Checking',
    key: 'assignment_checking',
    img: assignment_checking,
  },
  { title: 'Mentor Feedback', key: 'mentor_feedback', img: mentor_feedback },
];

export default function Groups() {
  const { slug } = useParams();
  const user = useSelector((state) => state.loginState.user);
  const [isLoading, setIsLoading] = useState(true);
  const [groupData, setGroupData] = useState(null);
  const [currentTab, setCurrentTab] = useState('scrums');

  useEffect(() => {
    const loadData = async () => {
      try {
        const groupReq = await axios.get(`${API_ENDPOINTS.GROUPS}/${slug}`);
        const {
          data: {
            data: { id },
          },
        } = groupReq;
        const groupMembers = await axios.get(
          `${API_ENDPOINTS.GROUPS}/${id}/group-members`
        );
        setGroupData({
          group: groupReq.data.data.attributes,
          groupMembers: groupMembers.data.data.map((item) => item.attributes),
        });
        setIsLoading(false);
      } catch (e) {
        myLog(e);
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="groups d-flex">
        <div className="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

  if (!user.group_id || !groupData) {
    return (
      <div className="groups d-flex flex-column align-items-center justify-content-center px-3">
        <img
          className="img-fluid"
          src={no_data}
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
      <div className="groups__container row align-items-stretch">
        <div
          className="col p-0"
          style={{ position: 'relative', maxWidth: '5rem' }}
        >
          <h1 className="group-title text-truncate text-primary font-weight-bold display-4">
            {groupData.group.name}
          </h1>
        </div>

        <div className="col-3" style={{ maxWidth: 400 }}>
          <div className="team-list p-2">
            <ul className="d-flex flex-column">
              {groupData.groupMembers.map((item) => (
                <li
                  key={item.user_id}
                  className="px-3 py-2 my-1 rounded-lg team-list-item"
                >
                  <UserImage
                    className="team-list-item-avatar"
                    src={item.user_details.avatar || default_user}
                    alt=""
                  />
                  <span className="ml-3 h5 mb-0 text-truncate">
                    {item.user_details.username || 'Team Member'}
                  </span>
                  {item.user_id === groupData.group.owner_id && (
                    <img
                      className="team-list-item-leader ml-3"
                      src={team_leader}
                      alt="Team Leader"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col group-activities">
          <ul className="group-activities-list">
            {group_activities.map((item, index) => {
              const isSelected = item.key === currentTab;
              const onClick = () => {
                if (isSelected) setCurrentTab('');
                else setCurrentTab(item.key);
              };

              return (
                <li
                  key={index}
                  onClick={onClick}
                  className={isSelected ? 'active' : ''}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    id={`item-img-${item.key}`}
                  />
                  <div className="activity-item-hover">
                    <div>
                      <img src={item.img} alt={item.title} />
                      <span className="text-muted-dark mx-3">{item.title}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col d-flex flex-column align-items-center justify-content-center">
          {/* currentTab === 'scrums' ? (
            <Scrums
              group={groupData.group}
              groupMembers={groupData.groupMembers}
            />
          ) :  */}
          {!currentTab ? (
            <>
              <img
                className="img-fluid mx-3"
                src={no_data}
                alt="New things are coming soon!"
              />
              <h5 className="text-center text-muted mt-5 mb-0">
                Select a tab from left.
              </h5>
            </>
          ) : (
            <>
              <img
                className="img-fluid mx-3"
                src={no_data}
                alt="New things are coming soon!"
              />
              <h5 className="text-center text-muted mt-5 mb-0">
                Interesting things are coming soon!
              </h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
