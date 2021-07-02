import '../../assets/css/group_todos.scss';

import React from 'react';

import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';

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

const questions = [
  {
    title: 'Who was the most active member in the last week?',
    answer: 'John Doe',
  },
  {
    title: 'Who Helped You the most in the last week?',
    answer: 'John Doe',
  },
  {
    title: 'Who Helped You the most in the last week?',
    answer: 'John Doe',
  },
];

const Question = ({ title, answer }) => {
  return (
    <div
      className="p-3 my-2"
      style={{
        boxShadow: '0px 0px 10px #00000029',
        borderRadius: '10px',
        color: '#707070',
        width: '100%',
      }}
    >
      <p className="m-0">{title}</p>
      <div className="my-2 border-bottom" style={{ width: '40%' }}></div>
      <p className="m-0">{answer}</p>
    </div>
  );
};

const WeeklyTodoGroups = ({ group, groupMembers, groupId }) => {
  myLog(group);
  myLog(groupMembers);
  myLog(groupId);
  return (
    <div
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 0 20px #0003',
        height: '100%',
        borderRadius: '20px',
        maxWidth: '1000px',
        padding: '30px',
        width: '100%',
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between flex-wrap">
        <h3 className="h4 text-primary">Weekly Team To-do</h3>
        <div className="d-flex" style={{ height: '20px' }}>
          <img className="mx-1" src={icons.scrums_calender} alt="calender" />
          <div className="mx-1" style={{ color: '#9b9b9b', width: '210px' }}>
            21-06-2021 to 28-06-2021
          </div>
        </div>
      </div>
      {/* Main section */}
      <section className="d-flex w-100 h-100">
        <div
          className="flex-column pr-4"
          style={{
            borderRight: '1.5px solid #BBBBBB',
            width: '45%',
            height: '90%',
            color: '#707070',
          }}
        >
          <Streak />
          <h3 className="h4 my-3">Questions :</h3>
          <div
            className="d-flex flex-column pr-3 mb-1 p-1 todo-questions-container"
            style={{ maxHeight: '220px', overflowY: 'auto' }}
          >
            {questions.map(({ title, answer }, idx) => {
              return <Question key={idx} title={title} answer={answer} />;
            })}
          </div>
        </div>
        <div
          className="h-100 d-flex flex-column ml-4"
          style={{ flexGrow: 1, color: '#707070' }}
        >
          <h3 className="h4">This Week&#39;s tasks</h3>
        </div>
      </section>
    </div>
  );
};

export default WeeklyTodoGroups;
