import React from 'react';

const BatchLeaderButtons = ({ value, onChange }) => {
  return (
    <div className="d-flex ">
      <button
        style={{
          width: '135px',
          minWidth: 'fit-content',
          height: 'auto',
          borderRadius: '5px',
          opacity: '1',
          backgroundColor: value === 2 ? '#58D68D' : '#ddd',
          margin: '1px 6px',
          cursor: 'pointer',
          padding: '4px',
        }}
        onClick={(e) => {
          onChange(2);
        }}
      >
        <span style={{ color: 'black', fontStyle: 'bold' }}>Active</span>
      </button>

      <button
        style={{
          width: '135px',
          height: 'auto',
          minWidth: 'fit-content',
          borderRadius: '5px',
          opacity: '1',
          backgroundColor: value === 1 ? '#F6D57A' : '#ddd',
          margin: '1px 6px',
          cursor: 'pointer',
          padding: '4px',
        }}
        onClick={(e) => {
          onChange(1);
        }}
      >
        <span style={{ color: 'black', fontStyle: 'bold' }}>
          Partially Active
        </span>
      </button>

      <button
        style={{
          width: '135px',
          height: 'auto',
          minWidth: 'fit-content',
          borderRadius: '5px',
          opacity: '1',
          backgroundColor: value === 0 ? '#F1948A' : '#ddd',
          margin: '1px 6px',
          cursor: 'pointer',
          padding: '4px',
        }}
        onClick={(e) => {
          onChange(0);
        }}
      >
        <span style={{ color: 'black', fontStyle: 'bold' }}>Inactive</span>
      </button>
    </div>
  );
};

export default BatchLeaderButtons;
