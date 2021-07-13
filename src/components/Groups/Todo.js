import React from 'react';
import ReactTooltip from 'react-tooltip';

import icons from '../../utils/getIcons';

const Todo = ({ title, status, onTodoUpdate, index }) => {
  const todoColor = status ? '#92FDA9' : '#FFC3AC';
  const todoStatusImg = status ? icons.question_tick : icons.question_solve;

  return (
    <div className="d-flex align-items-center mb-3 todo-item">
      <div style={{ backgroundColor: todoColor }} className="todo-status"></div>
      <p className="mb-0" data-tip={title}>
        {title}
      </p>
      <img
        src={todoStatusImg}
        alt="status-icon"
        height="30px"
        width="30px"
        onClick={() => onTodoUpdate(index)}
      />
      <ReactTooltip effect="solid" />
    </div>
  );
};

export default Todo;
