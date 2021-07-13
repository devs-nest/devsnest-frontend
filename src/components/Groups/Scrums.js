import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useUser } from '../../redux/slices/loginSlice';
import { getScrums, saveScrum } from '../../services/scrum';
import icons from '../../utils/getIcons';
import TableRow from './TableRow';

const DEFAULT_SCRUM = {
  attendance: false,
  saw_last_lecture: false,
  tha_progress: '',
  topics_to_cover: '',
  backlog_reasons: '',
  class_rating: 0,
};

export default function Scrums({ group, groupMembers, groupId }) {
  const user = useUser();
  const isTeamOwner = group.owner_id === user.id;
  const isTeamCoOwner = group.co_owner_id === user.id;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchScrum = async () => {
      try {
        const response = await getScrums(groupId);

        const scrumsData = [];
        for (const group_member of groupMembers) {
          const {
            user_id,
            user_details: { username: name, avatar },
          } = group_member;
          const respData = response.find(
            (member) => member.user_id === user_id
          );
          if (respData) {
            scrumsData.push({ ...respData, user_id, name, avatar });
          } else {
            scrumsData.push({
              name,
              avatar,
              user_id,
              group_id: groupId,
              ...DEFAULT_SCRUM,
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

  const updateQuestions = (index, newData) => {
    setQuestions((arr) =>
      arr.map((obj, i) => (i === index ? { ...obj, ...newData } : obj))
    );
  };

  const postScrumData = async (member, index) => {
    try {
      const repsonse = await saveScrum(member, isTeamOwner || isTeamCoOwner);
      const scrum_id = repsonse.data.id;
      updateQuestions(index, { scrum_id });
      toast.success(`Scrum Saved for ${member.name}!!`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const today_date = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString().replaceAll('/', '-');
  }, []);

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
        <h3 className="h4 text-primary mb-3 ml-2">Scrums</h3>
        <div className="d-flex">
          <div className="mx-1">
            <img src={icons.scrums_calender} alt="calender" />
          </div>
          <div className="mx-1" style={{ color: '#9B9B9B' }}>
            {today_date}
          </div>
        </div>
      </div>
      <Table
        responsive
        bordered
        className="mt-3 p-0"
        style={{ borderCollapse: 'collapse' }}
      >
        <thead>
          <tr style={{ color: '#9B9B9B', fontFamily: 'Montserrat' }}>
            <th>Name</th>
            <th>Saw Last Lecture</th>
            <th>THA progress</th>
            <th>Today&apos;s plan</th>
            <th>Backlogs</th>
            <th>Class Rating</th>
          </tr>
        </thead>
        <tbody style={{ color: '#000000', fontFamily: 'Montserrat' }}>
          {questions.map((question, index) => (
            <TableRow
              updateQuestions={updateQuestions}
              question={question}
              index={index}
              isTeamOwner={isTeamOwner || isTeamCoOwner}
              postScrumData={postScrumData}
              key={index}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
