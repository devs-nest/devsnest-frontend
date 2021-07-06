import React from 'react';

const Question = ({ title, answer, onChange, index }) => {
  return (
    <div className="p-3 my-2 todo-question-container ">
      <p className="m-0">{title}</p>
      <div className="my-2 border-bottom" style={{ width: '40%' }}></div>
      <input
        type="text"
        value={answer}
        placeholder="Click here to Answer"
        onChange={(e) => onChange(index, e.target.value)}
      />
    </div>
  );
};

export default Question;
