import { LOGIN, LOGOUT } from '../constants/types';

export const login = async (user) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: {
        loggedIn: true,
        user,
      },
    });
  };
};

export const logout = async () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: {
        loggedIn: false,
        user: null,
      },
    });
  };
};
