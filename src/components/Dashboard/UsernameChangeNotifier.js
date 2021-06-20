import React from 'react';
import { Toast } from 'react-bootstrap';
export default function Notif({ user, setModalShow }) {
  const [show, setShow] = React.useState(true);

  return (
    <Toast
      show={show}
      delay={10000}
      autohide
      onClose={() => setShow(false)}
      style={{
        position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 10000,
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}
      onClick={() => {
        setShow(false);
        setModalShow(true);
      }}
    >
      <Toast.Header>
        Hello<strong className="ml-auto">{user.username}!</strong>
      </Toast.Header>
      <Toast.Body>Click here to Change username!</Toast.Body>
    </Toast>
  );
}
