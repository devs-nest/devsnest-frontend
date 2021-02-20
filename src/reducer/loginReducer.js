import { LOGIN, LOGOUT } from '../constants/types';

const initialState = {
  loggedIn: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { loggedIn, user } = action.payload;
      return { ...state, loggedIn, user };
    }
    case LOGOUT: {
      return { ...state, loggedIn: false, user: null };
    }
    default:
      return state;
  }
};
