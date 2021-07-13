import { CheckboxSelect } from '@atlaskit/select';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useUser } from '../../redux/slices/loginSlice';
import { getScrums, saveScrum } from '../../services/Groups/batchLeaderScrums';
import { isEqualStartWeekDate } from '../../utils/dateUtils';
import BatchLeaderButtons from './BatchLeaderButtons';
import { StarRating } from './ScrumButtons';

export default function BatchLeaderScrums({ group, groupMembers, groupId }) {
  const user = useUser();
  const canEdit =
    group.batch_leader_id === user.id || user.user_type === 'admin';
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState({});
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);

  // this options array of object will be used in multiselect
  const options = groupMembers.map(({ user_details: { username } }) => ({
    value: username,
    label: username,
  }));

  const today_date = useMemo(() => {
    const now = new Date().toLocaleString('in-IN').split(' ')[0].split('/');
    return `${now[2]}-${now[1].padStart(2, '0')}-${now[0].padStart(2, '0')}`;
  }, []);

  const copy_group_member_activity = options;
  const [group_member_activity, setGroup_member_activity] = useState(options);
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
        maxWidth: '1000px',
        padding: '40px 40px',
        width: 'calc(100% - 80px - 15px)',
        position: 'relative',
        maxHeight: '100%',
      }}
    >
      <div className="d-flex justify-content-between ">
        <h3 className="h4 text-primary  ml-2">Batch Leader</h3>
        <div className="d-flex">
          <div className="mx-1 mb-2">
            <input
              type="date"
              name="scrum_date"
              className="batch-leader-date"
              max={today_date}
              onChange={(e) => {
                setIsCurrentWeek(
                  isEqualStartWeekDate(new Date(e.target.value), new Date())
                );
                setScrumDate(e.target.value);
                Fetch_specific_scrum(e.target.value);
              }}
              value={scrumDate}
              style={{
                border: 'none',
                outline: 'none',
                width: '150px',
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mt-3  pb-5 ">
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
                  fontSize: '17px',
                  fontWeight: '700',
                }}
              >
                <div className="py-2">Scrum Sheet Filling Status</div>
              </td>
              <td
                colSpan="2"
                style={{ borderLeft: 'none', borderRight: 'none' }}
              >
                <div style={{ paddingLeft: '80px' }}>
                  <BatchLeaderButtons
                    value={questions.scrum_filled}
                    onChange={(newValue) => {
                      if (isCurrentWeek) {
                        setQuestions({ ...questions, scrum_filled: newValue });
                      } else {
                        toast.warn("You can only edit current week's sheet");
                      }
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  color: '#006716',
                  fontSize: '19px',
                  fontWeight: 'bolder',
                  width: '33%',
                  textAlign: 'center',
                  borderLeft: 'none',
                }}
              >
                Active
              </td>

              <td
                style={{
                  color: '#B57300',
                  fontSize: '19px',
                  fontWeight: 'bolder',
                  width: '34%',
                  textAlign: 'center',
                }}
              >
                Partially active
              </td>

              <td
                style={{
                  textAlign: 'center',
                  borderRight: 'none',
                  color: '#7A0000',
                  fontSize: '19px',
                  fontWeight: 'bolder',
                  width: '33%',
                }}
              >
                Inactive
              </td>
            </tr>

            <tr>
              <td style={{ borderLeft: 'none' }}>
                <CheckboxSelect
                  className="multi-select"
                  classNamePrefix="react-select"
                  options={group_member_activity}
                  isMulti
                  isSearchable={true}
                  placeholder="Select ..."
                  isDisabled={!isCurrentWeek}
                  value={
                    !questions.active_members
                      ? questions.active_members
                      : questions.active_members.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    const updated_active_members = val.map(
                      ({ value }) => value
                    );
                    setQuestions({
                      ...questions,
                      active_members: updated_active_members,
                    });
                    setGroup_member_activity(
                      copy_group_member_activity.filter(
                        (elm) =>
                          !(
                            val
                              .map((elm) => JSON.stringify(elm))
                              .includes(JSON.stringify(elm)) ||
                            (updated_active_members &&
                              updated_active_members.includes(elm.value)) ||
                            (questions.par_active_members &&
                              questions.par_active_members.includes(
                                elm.value
                              )) ||
                            (questions.inactive_members &&
                              questions.inactive_members.includes(elm.value))
                          )
                      )
                    );
                  }}
                />
              </td>

              <td>
                <CheckboxSelect
                  className="multi-select"
                  classNamePrefix="react-select"
                  isMulti
                  isSearchable={true}
                  placeholder="Select ..."
                  isDisabled={!isCurrentWeek}
                  options={group_member_activity}
                  value={
                    !questions.par_active_members
                      ? questions.par_active_members
                      : questions.par_active_members.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    const updated_par_active_members = val.map(
                      ({ value }) => value
                    );
                    setQuestions({
                      ...questions,
                      par_active_members: updated_par_active_members,
                    });
                    setGroup_member_activity(
                      copy_group_member_activity.filter(
                        (elm) =>
                          !(
                            val
                              .map((elm) => JSON.stringify(elm))
                              .includes(JSON.stringify(elm)) ||
                            (questions.active_members &&
                              questions.active_members.includes(elm.value)) ||
                            (updated_par_active_members &&
                              updated_par_active_members.includes(elm.value)) ||
                            (questions.inactive_members &&
                              questions.inactive_members.includes(elm.value))
                          )
                      )
                    );
                  }}
                />
              </td>

              <td style={{ borderRight: 'none' }}>
                <CheckboxSelect
                  className="multi-select"
                  classNamePrefix="react-select"
                  isMulti
                  isSearchable={false}
                  placeholder="Select ..."
                  isDisabled={!isCurrentWeek}
                  options={group_member_activity}
                  value={
                    !questions.inactive_members
                      ? questions.inactive_members
                      : questions.inactive_members.map((name) => ({
                          value: name,
                          label: name,
                        }))
                  }
                  onChange={(val) => {
                    const updated_inactive_members = val.map(
                      ({ value }) => value
                    );
                    setQuestions({
                      ...questions,
                      inactive_members: updated_inactive_members,
                    });
                    setGroup_member_activity(
                      copy_group_member_activity.filter(
                        (elm) =>
                          !(
                            val
                              .map((elm) => JSON.stringify(elm))
                              .includes(JSON.stringify(elm)) ||
                            (questions.active_members &&
                              questions.active_members.includes(elm.value)) ||
                            (questions.par_active_members &&
                              questions.par_active_members.includes(
                                elm.value
                              )) ||
                            (updated_inactive_members &&
                              updated_inactive_members.includes(elm.value))
                          )
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
                  fontSize: '17px',
                  fontWeight: '700',
                }}
              >
                <div className="py-2">Team Coordination</div>
              </td>

              <td
                colSpan="2"
                style={{ borderLeft: 'none', borderRight: 'none' }}
              >
                <div style={{ paddingLeft: '390px' }}>
                  <StarRating
                    value={questions.Coordination}
                    onChange={(newValue) => {
                      if (isCurrentWeek) {
                        setQuestions({ ...questions, Coordination: newValue });
                      } else {
                        toast.warn("You can only edit current week's sheet");
                      }
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
                  fontSize: '17px',
                  fontWeight: '700',
                }}
              >
                <div className="py-2">Team Leader Availability</div>
              </td>
              <td
                colSpan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <div style={{ paddingLeft: '80px' }}>
                  <BatchLeaderButtons
                    value={questions.owner_active}
                    onChange={(newValue) => {
                      if (isCurrentWeek) {
                        setQuestions({ ...questions, owner_active: newValue });
                      } else {
                        toast.warn("You can only edit current week's sheet");
                      }
                    }}
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
                  fontSize: '17px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                }}
              >
                <div className="py-2">Team Vice Leader Availability</div>
              </td>
              <td
                colSpan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <div style={{ paddingLeft: '80px' }}>
                  <BatchLeaderButtons
                    value={questions.co_owner_active}
                    onChange={(newValue) => {
                      if (isCurrentWeek) {
                        setQuestions({
                          ...questions,
                          co_owner_active: newValue,
                        });
                      } else {
                        toast.warn("You can only edit current week's sheet");
                      }
                    }}
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
                  fontSize: '17px',
                  fontWeight: '700',
                }}
              >
                <div className="py-2">Doubt Sessions Takers</div>
              </td>
              <td
                colSpan="2"
                style={{
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <div
                  style={{
                    width: '455px',
                    padding: '1px 5px',
                    marginLeft: '82px',
                  }}
                >
                  <CheckboxSelect
                    className="multi-select batch-leader-select-doubt"
                    classNamePrefix="react-select"
                    options={options}
                    isMulti
                    isSearchable={false}
                    placeholder="Select ..."
                    isDisabled={!isCurrentWeek}
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
                </div>
              </td>
            </tr>

            <tr>
              <td
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                  fontSize: '17px',
                  fontWeight: '700',
                }}
              >
                <div className="py-2"> Team Rating </div>
              </td>

              <td
                colSpan="2"
                style={{
                  minWidth: 'fit-content',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <div style={{ paddingLeft: '390px' }}>
                  <StarRating
                    value={questions.rating}
                    onChange={(newValue) => {
                      if (isCurrentWeek) {
                        setQuestions({ ...questions, rating: newValue });
                      } else {
                        toast.warn("You can only edit current week's sheet");
                      }
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
            disabled={!canEdit || !isCurrentWeek}
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
