import React from 'react';

export default function UsercountModal({ count, showModal }) {
  const [show, setShow] = React.useState(showModal);
  const styles = {
    div: {
      zIndex: 1052,
      backgroundColor: '#fff',
      position: 'absolute',
      top: 5,
      right: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: '5px',
      boxShadow: '0 0 8px rgba(0,0,0,0.8)',
    },

    button: {
      border: 'none',
      backgroundColor: 'transparent',
    },
    p: {
      padding: '1rem',
      marginBottom: 0,
      wordWrap: 'normal',
    },
  };
  return (
    <>
      {show && (
        <div style={styles.div}>
          <button onClick={() => setShow(false)} style={styles.button}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
          <p style={styles.p}>
            You can change your
            <br /> username <span style={{ color: 'red' }}>
              {2 - count}
            </span>{' '}
            time more!
          </p>
        </div>
      )}
    </>
  );
}
