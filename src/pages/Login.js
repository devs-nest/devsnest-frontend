import React, { useCallback, useState, useEffect } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../constants/api';
import { login } from '../actions/loginActions';
import { useSelector } from 'react-redux';
import useActions from '../hooks/useActions';
import GoogleLogin from 'react-google-login';
import axios from '../config/axios.config';
import myLog from '../utils/myLog';
import '../assets/css/login.scss';

import bg from '../assets/images/login/bg.png';
import right from '../assets/images/login/Group 65.svg';
import left from '../assets/images/login/Group 17.svg';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const loginState = useSelector((state) => state.loginState);
  const actions = useActions({ login });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onGoogleLogin = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        myLog('id_token:', data.tokenObj.id_token);
        const loginResponse = await axios.post(`${API_ENDPOINTS.LOGIN}`, {
          type: 'google',
          code: data.tokenObj.id_token,
          googleId: data.profileObj.googleId,
        });
        actions.login({
          ...loginResponse.data.data.attributes,
          authorization: loginResponse.headers['authorization'],
        });
        const userResponse = await axios.get(API_ENDPOINTS.CURRENT_USER);
        actions.login({ ...userResponse.data.data.attributes });
        history.push('/');
      } catch (e) {
        console.error(e.message);
        setHasError(true);
      }
      setIsLoading(false);
    },
    [actions, history]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const loginCallback = async () => {
      setIsLoading(true);
      try {
        myLog('code', code);
        const loginResp = await axios.post(`${API_ENDPOINTS.LOGIN}`, {
          code,
          type: 'discord',
        });
        myLog('response from api: ', loginResp);
        if (
          loginResp.data &&
          loginResp.data.data &&
          loginResp.data.data.attributes
        ) {
          actions.login({
            ...loginResp.data.data.attributes,
            authorization: loginResp.headers['authorization'],
          });
          const userResp = await axios.get(API_ENDPOINTS.CURRENT_USER);
          actions.login({
            ...userResp.data.data.attributes,
          });
          history.push('/');
        }
      } catch (err) {
        myLog('error from api: ', err);
        setHasError(true);
      }
      setIsLoading(false);
    };

    if (code) {
      loginCallback();
    }
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
              #1 : Be a part of your discord community,
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

          <div className="login-btns">
            {isLoading || hasError ? (
              hasError ? (
                <p className="py-1 text-danger text-center m-0">
                  Something went wrong, Reach out to us at support@devsnest.in
                </p>
              ) : (
                <button
                  className="btn py-05 mx-auto my-3 login-btn btn-disabled"
                  disabled
                >
                  <div
                    class="spinner-border text-light spinner-border-sm"
                    role="status"
                  />
                </button>
              )
            ) : (
              <>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  onSuccess={onGoogleLogin}
                  onFailure={() => {}}
                  render={(props) => (
                    <button
                      className="btn py-05 mx-auto my-2 login-btn"
                      onClick={props.onClick}
                      disabled={props.disabled}
                    >
                      <i className="fa fa-google" aria-hidden="true"></i>
                      <span className="ml-2">Login with Google</span>
                    </button>
                  )}
                />
                <button
                  onClick={() => {
                    window.location = API_ENDPOINTS.DISCORD_LOGIN_REDIRECT;
                  }}
                  className="btn py-05 mx-auto my-2 login-btn"
                >
                  <span>Login with Discord</span>
                </button>
              </>
            )}
          </div>
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
