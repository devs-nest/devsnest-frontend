import React from 'react';

const BatchLeaderButtons = ({ value, onChange }) => {
  return (
    <div className="d-flex ">
      <button
        style={{
          // width: '135px',
          minWidth: 'fit-content',
          height: 'auto',
          borderRadius: '8px',
          opacity: '1',
          margin: '1px 6px',
          cursor: 'pointer',
          border: 'none',
          color: 'white',
          padding: '8px 38px',
          textAlign: 'center',
          textDecoration: 'none',
          // display: "inline-block"
          fontSize: '16px',
          backgroundColor: value === 2 ? '#58D68D' : '#ddd',
        }}
        onClick={(e) => {
          onChange(2);
        }}
      >
        <span style={{ color: 'black', fontStyle: 'bold' }}>Active</span>
      </button>

      <button
        style={{
          // width: '135px',
          minWidth: 'fit-content',
          height: 'auto',
          borderRadius: '8px',
          opacity: '1',
          margin: '1px 6px',
          cursor: 'pointer',
          border: 'none',
          color: 'white',
          padding: '8px 18px',
          textAlign: 'center',
          textDecoration: 'none',
          // display: "inline-block"
          fontSize: '16px',
          backgroundColor: value === 1 ? '#F6D57A' : '#ddd',
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
          // width: '135px',
          minWidth: 'fit-content',
          height: 'auto',
          borderRadius: '8px',
          opacity: '1',
          margin: '1px 6px',
          cursor: 'pointer',
          border: 'none',
          color: 'white',
          padding: '8px 38px',
          textAlign: 'center',
          textDecoration: 'none',
          // display: "inline-block"
          fontSize: '16px',
          backgroundColor: value === 0 ? '#F1948A' : '#ddd',
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
