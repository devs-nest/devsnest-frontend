import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { login, loginLoadingState, logout } from '../actions/loginActions';
import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';
import myLog from '../utils/myLog';
import useActions from './useActions';

export default function useAuth() {
  const loginState = useSelector((state) => state.loginState);
  const actions = useActions({ login, logout, loginLoadingState });

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.CURRENT_USER)
      .then((response) => {
        actions.login(response.data.data.attributes);
      })
      .catch((e) => {
        myLog(e);
        actions.logout();
        actions.loginLoadingState(false);
      });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loginState;
}
