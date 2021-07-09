import React from 'react';
import ReactTooltip from 'react-tooltip';

import icons from '../../utils/getIcons';

const Streak = ({ group_id, streak }) => {
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
