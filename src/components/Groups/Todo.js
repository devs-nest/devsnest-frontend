import React from 'react';

import icons from '../../utils/getIcons';

const Todo = ({ title, status }) => {
  const todoColor = status ? '#FFC3AC' : '#92FDA9';
  const todoStatusImg = status ? icons.question_tick : icons.question_solve;

  return (
    <div className="d-flex align-items-center mb-4 todo-item">
      <div style={{ backgroundColor: todoColor }} className="todo-status"></div>
      <p className="mb-0">{title}</p>
      <img src={todoStatusImg} alt="status-icon" height="30px" width="30px" />
    </div>
  );
};

export default Todo;
