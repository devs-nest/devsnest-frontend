import '../../assets/css/login.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import bg from '../../assets/images/login/bg.png';
import left from '../../assets/images/login/Group 17.svg';
import right from '../../assets/images/login/Group 65.svg';
import { API_ENDPOINTS } from '../../constants/api';

function Login() {
  const loginState = useSelector((state) => state.loginState);

  if (!loginState.isLoading && loginState.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="login-main row align-items-strech">
        <div className="login-left d-flex flex-column px-4 col-md-3">
          <div
            className="text-light my-5 mx-3 mb-auto"
            style={{ fontSize: '1.2em' }}
          >
            Education which makes you financially independent.
          </div>
          <img
            src={left}
            alt="discord sheild and hammer"
            className="mt-4 mx-auto"
            style={{ maxWidth: 250, width: '100%' }}
          />
        </div>

        <div className="col-md-6 d-flex flex-column py-4">
          <h2 className="h3 font-weight-bold text-primary-dark text-center mx-4 my-4">
            Welcome to DEVSNEST!
          </h2>

          <div className="ml-4 mr-3 my-4">
            <h3 className="h6 mt-2">
              #1 : Be a part of your discord community,{' '}
              <a
                href="https://discord.gg/E8YcJpGJKB"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join us!
              </a>
            </h3>
            <p className="h6 text-muted ml-4 mt-3 mb-4">
              If you're already a part of our team proceed to step #2
            </p>
            <h3 className="h6 mt-2">#2 : Login/Signup via discord</h3>
          </div>

          <button
            onClick={() => {
              window.location = API_ENDPOINTS.DISCORD_LOGIN_REDIRECT;
            }}
            className="btn py-05 mx-auto my-3 login-btn"
          >
            Login
          </button>
        </div>

        <div className="col-md-3 d-flex align-items-center justify-content-center">
          <img
            src={right}
            alt="people building together"
            className="img-fluid my-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
