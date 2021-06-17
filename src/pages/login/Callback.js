import '../../assets/css/login.scss';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { login } from '../../actions/loginActions';
import bg from '../../assets/images/login/bg.png';
import left from '../../assets/images/login/Group 17.svg';
import right from '../../assets/images/login/Group 65.svg';
import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
import useActions from '../../hooks/useActions';
import myLog from '../../utils/myLog';

export default function LoginCallback() {
  const history = useHistory();
  const location = useLocation();
  const actions = useActions({ login });
  const loginState = useSelector((state) => state.loginState);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    myLog('code', code);
    axios
      .post(`${API_ENDPOINTS.LOGIN}`, { code })
      .then((response) => {
        myLog('response from api: ', response);
        if (
          response.data &&
          response.data.data &&
          response.data.data.attributes
        ) {
          actions.login({
            ...response.data.data.attributes,
            authorization: response.headers['authorization'],
          });
          axios.get(API_ENDPOINTS.CURRENT_USER).then((resp) => {
            actions.login({
              ...resp.data.data.attributes,
            });
            history.push('/');
          });
        }
      })
      .catch((err) => {
        myLog('error from api: ', err);
        setHasError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          {hasError ? (
            <p className="py-1 text-danger text-center m-0">
              Something went wrong, Reach out to us at support@devsnest.in
            </p>
          ) : (
            <button
              className="btn py-05 mx-auto my-3 login-btn btn-disabled"
              disabled
            >
              <div
                className="spinner-border text-light spinner-border-sm"
                role="status"
              />
            </button>
          )}
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
