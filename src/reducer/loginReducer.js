import { LOGIN, LOGIN_LOADING, LOGOUT } from '../constants/types';

const initialState = {
  isLoading: true,
  loggedIn: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { loggedIn, user } = action.payload;
      return {
        ...state,
        loggedIn,
        user: state.user ? { ...state.user, ...user } : user,
        isLoading: false,
      };
    }
    case LOGOUT: {
      return { ...state, loggedIn: false, user: null, isLoading: false };
    }
    case LOGIN_LOADING:
      const { isLoading } = action.payload;
      return { ...state, isLoading };
    default:
      return state;
  }
};
