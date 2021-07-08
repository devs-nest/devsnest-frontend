import React, { useEffect, useState, useMemo } from 'react';
import icons from '../../utils/getIcons';
import { Table, Button } from 'react-bootstrap';
import BatchLeaderButtons from './BatchLeaderButtons';
import { StarRating } from './ScrumButtons';
import Select from '@atlaskit/select';
import { useUser } from '../../redux/slices/loginSlice';
import { toast } from 'react-toastify';
import { getScrums, saveScrum } from '../../services/Groups/batchLeaderScrums';

export default function BatchLeaderScrums({ group, groupMembers, groupId }) {
  const user = useUser();
  const isBatchLeader = group.batch_leader_id === user.id;
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState({});
  // this options array of object will be used in multiselect
  // const options = groupMembers.map(({ user_details: { username } }) => ({
  //   value: username,
  //   label: username,
  // }));

  const options = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' },
    { value: 'd', label: 'd' },
    { value: 'e', label: 'e' },
    { value: 'f', label: 'f' },
  ];
  const [group_member_activity, setGroup_member_activity] = useState(options);
  const copy_group_member_activity = options;

  const today_date = useMemo(() => {
    const now = new Date();
    let formatDate = now.toLocaleDateString().split('/');
    return `${formatDate[2]}-${formatDate[0]}-${formatDate[1]}`;
  }, []);
  const [scrumDate, setScrumDate] = useState(today_date);

  const Fetch_specific_scrum = async (scrum_date) => {
    try {
      setIsLoading(true);

      const response = await getScrums(groupId, scrum_date);
      const scrumsData = [];

      scrumsData.push({
        user_id: user.id,
        group_id: groupId,
        ...response,
      });

      setQuestions(scrumsData[0]);
    } catch (e) {
      toast.error('An error occurred fetching Batch Leader Sheet');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchScrum = async () => {
      try {
        setIsLoading(true);

        const response = await getScrums(groupId, today_date);
        const scrumsData = [];

        scrumsData.push({
          user_id: user.id,
          group_id: groupId,
          ...response,
        });

        setQuestions(scrumsData[0]);
      } catch (e) {
        toast.error('An error occurred fetching Batch Leader Sheet');
      }
      setIsLoading(false);
    };
    fetchScrum();
  }, [groupId, user, today_date]);

  const postScrumData = async (scrum_data) => {
    try {
      const repsonse = await saveScrum(scrum_data);
      const scrum_id = repsonse.data.id;

      setQuestions({ ...questions, id: scrum_id });
      toast.success(`batch leader Sheet for ${group.name}!!`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard d-flex">
        <div className="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

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
        position: 'relative',
      }}
    >
      <div className="d-flex justify-content-between ">
        <h3 className="h4 text-primary mb-3 ml-2">Batch Leader</h3>
        <div className="d-flex">
          <div className="mx-1">
            <img src={icons.scrums_calender} alt="calender" />
          </div>
          <div className="mx-1 mb-2">
            <input
              type="date"
              name="scrum_date"
              onChange={(e) => {
                console.log(e.target.value);
                setScrumDate(e.target.value);
                Fetch_specific_scrum(e.target.value);
              }}
              value={scrumDate}
            />
          </div>
          <div className="mx-1 mt-1" style={{ color: '#9B9B9B' }}>
            {scrumDate}
          </div>
        </div>
      </div>

      <div className="container my-5">
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
                  fontWeight: 'bold',
                }}
              >
                Scrum sheet filling status
              </td>
              <td
                colSpan="2"
                style={{ borderLeft: 'none', borderRight: 'none' }}
              >
                <BatchLeaderButtons
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
                  // options= {options}
                  options={group_member_activity}
                  isMulti
                  isSearchable={true}
                  placeholder="Select ..."
                  value={
                    !questions.active_members
                      ? questions.active_members
                      : questions.active_members.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    const updated_active_members = val.map(({value}) => value); 
                    setQuestions({
                      ...questions,
                      active_members: updated_active_members,
                    });
                    setGroup_member_activity(
                      copy_group_member_activity.filter(
                        (elm) =>
                          !(val
                            .map((elm) => JSON.stringify(elm))
                            .includes(JSON.stringify(elm))
                          ||
                            (updated_active_members && updated_active_members
                            .includes(elm.value))
                          ||
                            (questions.par_active_members && questions.par_active_members
                            .includes(elm.value))
                          ||
                            (questions.inactive_members && questions.inactive_members
                            .includes(elm.value)))
                      )
                    );
                  }}
                />
              </td>
              <td>
                {/* par_active_members */}
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  // options={options}
                  options={group_member_activity}
                  isMulti
                  isSearchable={true}
                  placeholder="Select ..."
                  value={
                    !questions.par_active_members
                      ? questions.par_active_members
                      : questions.par_active_members.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    const updated_par_active_members = val.map(({value}) => value);
                    setQuestions({
                      ...questions,
                      par_active_members: updated_par_active_members,
                    });
                    setGroup_member_activity(
                      copy_group_member_activity.filter(
                        (elm) =>
                          !(val
                            .map((elm) => JSON.stringify(elm))
                            .includes(JSON.stringify(elm)) 
                          ||
                            (questions.active_members && questions.active_members
                            .includes(elm.value))
                          ||
                            (updated_par_active_members && updated_par_active_members
                            .includes(elm.value))
                          ||
                            (questions.inactive_members && questions.inactive_members
                            .includes(elm.value)))
                      )
                    );
                  }}
                />
              </td>
              <td style={{ borderRight: 'none' }}>
                {/* inactive_members */}
                <Select
                  className="multi-select"
                  classNamePrefix="react-select"
                  // options={options}
                  options={group_member_activity}
                  isMulti
                  isSearchable={false}
                  placeholder="Select ..."
                  value={
                    !questions.inactive_members
                      ? questions.inactive_members
                      : questions.inactive_members.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    const updated_inactive_members = val.map(({value}) => value);
                    setQuestions({
                      ...questions,
                      inactive_members: updated_inactive_members,
                    });
                    setGroup_member_activity(
                      copy_group_member_activity.filter(
                        (elm) =>
                          !(val
                            .map((elm) => JSON.stringify(elm))
                            .includes(JSON.stringify(elm)) 
                            ||
                              (questions.active_members && questions.active_members
                              .includes(elm.value))
                            ||
                            (questions.par_active_members && questions.par_active_members
                              .includes(elm.value))
                            ||
                              (updated_inactive_members && updated_inactive_members
                              .includes(elm.value)))
                      )
                    );
                  }}
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
                colSpan="2"
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
                colSpan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <BatchLeaderButtons
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
                colSpan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <BatchLeaderButtons
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
                colSpan="2"
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
                  options={options}
                  isMulti
                  isSearchable={false}
                  placeholder="Select ..."
                  value={
                    !questions.doubt_session_taker
                      ? questions.doubt_session_taker
                      : questions.doubt_session_taker.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    setQuestions({
                      ...questions,
                      doubt_session_taker: val.map(({ value }) => value),
                    });
                  }}
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
                colSpan="2"
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
        <div
          style={{ paddingTop: '30px', position: 'absolute', right: '30px' }}
        >
          <Button
            disabled={!isBatchLeader}
            onClick={(e) => {
              postScrumData(questions);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}