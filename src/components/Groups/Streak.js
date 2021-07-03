import React from 'react';

import icons from '../../utils/getIcons';

const Streak = () => {
  const arr = [
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
  ];

  return (
    <div className="d-flex flex-column w-100" style={{ color: '#707070' }}>
      <h3 className="h4 my-1 mb-2">Streak :</h3>
      <div
        className="d-flex flex-wrap pb-2"
        style={{ borderBottom: '1.5px solid #BBBBBB' }}
      >
        {arr.map((val, idx) => {
          let iconSrc = val
            ? icons.group_streak_tick
            : icons.group_streak_cross;
          return (
            <div
              key={idx}
              className="d-flex p-2 justify-content-center align-items-center"
            >
              <img src={iconSrc} alt="streak_icon" width="20px" height="20px" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Streak;
