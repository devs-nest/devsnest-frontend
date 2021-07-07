import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import { getStreak } from '../../services/weekly_todo';
import icons from '../../utils/getIcons';

const Streak = ({ group_id }) => {
  const [streak, setStreak] = useState([]);
  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await getStreak(group_id);
        console.log(response);
        setStreak(response);
      } catch (e) {
        toast.error('An error occurred fetching weekly streak');
      }
    };
    fetchStreak();
  }, [group_id]);

  return (
    <div className="d-flex flex-column w-100" style={{ color: '#707070' }}>
      <div
        className="d-flex flex-wrap pb-2"
        style={{ borderBottom: '1.5px solid #BBBBBB' }}
      >
        {streak.map((val, idx) => {
          const [date, status] = val;
          let iconSrc = status
            ? icons.group_streak_tick
            : icons.group_streak_cross;
          return (
            <div
              data-tip={date}
              key={idx}
              className="d-flex p-2 justify-content-center align-items-center"
            >
              <img src={iconSrc} alt="streak_icon" width="20px" height="20px" />
              <ReactTooltip effect="solid" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Streak;
