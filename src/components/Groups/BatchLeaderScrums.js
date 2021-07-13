import React, { useEffect, useState, useMemo } from 'react';
import icons from '../../utils/getIcons';
import { Table, Button } from 'react-bootstrap';
import BatchLeaderButttons from './BatchLeaderButtons';
import { StarRating } from './ScrumButtons';
import Select from '@atlaskit/select';
import { useUser } from '../../redux/slices/loginSlice';
import { toast } from 'react-toastify';
import getScrums from '../../services/Group/BatchLeader';

const DEFAULT_BATCH_LEADER_SCRUM = {
  // user_id: 1,
  // group_id: 1,
  Coordination: null,
  scrum_filled: null,
  mentor_meet: null,
  owner_active: null,
  co_owner_active: null,
  remarks: null,
  rating: null,
  active_members: [],
  par_active_members: [],
  inactive_members: [],
  extra_activity: [],
  doubt_session_taker: [],
};

export default function BatchLeaderScrums({ group, groupMembers, groupId }) {
  const user = useUser();
  const isBatchLeader = group.batch_leader_id === user.id;
  const [questions, setQuestions] = useState([]);
  //this array will be used in multiselect as options
  const group_members_array = [];

  for (const group_member of groupMembers) {
    const {
      user_id,
      user_details: { username: name },
    } = group_member;

    let anObj = {
      label: name,
      value: name,
    };

    group_members_array.push(anObj);
  }

  const today_date = useMemo(() => {
    const now = new Date();
    let formatDate = now.toLocaleDateString().split('/');
    return `${formatDate[2]}-${formatDate[0]}-${formatDate[1]}`;
  }, []);

  useEffect(() => {
    const fetchScrum = async () => {
      try {
        const response = await getScrums(groupId);

        const scrumsData = [];
        for (const group_member of groupMembers) {
          const { user_id } = group_member;
          const respData = response.find(
            (member) => member.user_id === user_id
          );
          if (respData) {
            scrumsData.push({ ...respData, user_id });
          } else {
            scrumsData.push({
              user_id,
              group_id: groupId,
              ...DEFAULT_BATCH_LEADER_SCRUM,
            });
          }
        }

        setQuestions(scrumsData);
      } catch (e) {
        toast.error('An error occurred fetching scrums');
      }
    };
    fetchScrum();
  }, [group, groupId, groupMembers]);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 0 20px #0003',
        height: '100%',
        borderRadius: '18px',
        maxWidth: '900px',
        padding: '40px 40px',
        width: 'calc(100% - 80px - 15px)',
      }}
    >
      <div className="d-flex justify-content-between ">
        <h3 className="h4 text-primary mb-3 ml-2">Batch Leader</h3>
        <div className="d-flex">
          <div className="mx-1">
            <img src={icons.scrums_calender} alt="calender" />
          </div>
          <div className="mx-1" style={{ color: '#9B9B9B' }}>
            {today_date}
          </div>
        </div>
      </div>
      {questions}
      <div className="container mt-5">
        <Table
          responsive
          bordered
          className="mt-3 p-2"
          style={{ borderCollapse: 'collapse' }}
        >
          <tbody style={{ color: '#000000', fontFamily: 'Montserrat' }}>
            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Scrum sheet filling status
              </td>
              <td
                colspan="2"
                style={{ borderLeft: 'none', borderRight: 'none' }}
              >
                <BatchLeaderButttons
                  value={questions.scrum_filled}
                  onChange={(newValue) =>
                    setQuestions({ ...questions, scrum_filled: newValue })
                  }
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  color: '#006716',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Active
              </td>

              <td
                style={{
                  color: '#B57300',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Partially active
              </td>

              <td
                style={{
                  color: '#7A0000',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Inactive
              </td>
            </tr>
            <tr>
              <td>
                {/* active_members */}
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  options={group_members_array}
                  isMulti
                  isSearchable={false}
                  placeholder="Choose a member"
                />
              </td>
              <td>
                {/* par_active_members */}
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  options={group_members_array}
                  isMulti
                  isSearchable={false}
                  placeholder="Choose a member"
                />
              </td>
              <td style={{ borderRight: 'none' }}>
                {/* inactive_members */}
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  options={group_members_array}
                  isMulti
                  isSearchable={false}
                  placeholder="Choose a member"
                />
              </td>
            </tr>

            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Team Coordination
              </td>

              <td
                colspan="2"
                style={{ borderLeft: 'none', borderRight: 'none' }}
              >
                <div style={{ marginLeft: '300px' }}>
                  <StarRating
                    value={questions.Coordination}
                    onChange={(newValue) => {
                      setQuestions({ ...questions, Coordination: newValue });
                    }}
                    size={30}
                    disabled={false}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Availability of Team Leader in Scrum
              </td>
              <td
                colspan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <BatchLeaderButttons
                  value={questions.owner_active}
                  onChange={(newValue) =>
                    setQuestions({ ...questions, owner_active: newValue })
                  }
                />
              </td>
            </tr>

            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Availability of team Vice Leader in Scrum
              </td>
              <td
                colspan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <BatchLeaderButttons
                  value={questions.co_owner_active}
                  onChange={(newValue) =>
                    setQuestions({ ...questions, co_owner_active: newValue })
                  }
                />
              </td>
            </tr>

            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Members who generally takes doubt sessions
              </td>
              <td
                colspan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                {/* doubt_session_taker */}
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  options={group_members_array}
                  isMulti
                  isSearchable={false}
                  placeholder="Choose a member"
                />
              </td>
            </tr>

            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                }}
              >
                Team Rating
              </td>
              <td
                colspan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <div style={{ marginLeft: '300px' }}>
                  <StarRating
                    value={questions.rating}
                    onChange={(newValue) => {
                      setQuestions({ ...questions, rating: newValue });
                    }}
                    size={30}
                    disabled={false}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div style={{ marginTop: '60px', marginLeft: '700px' }}>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
