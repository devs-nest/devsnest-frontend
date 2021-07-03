import React from 'react';

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

export default Question;
