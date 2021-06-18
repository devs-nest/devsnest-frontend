import myLog from '../utils/myLog';

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
myLog(`using api base url:`, API_BASE_URL);

const discord_redirect_uri = encodeURIComponent(`${window.origin}/`);

export const API_ENDPOINTS = {
  DISCORD_LOGIN_REDIRECT: `https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20email&response_type=code&redirect_uri=${discord_redirect_uri}`,
  LOGOUT: `api/v1/users/logout`,
  LOGIN: `api/v1/users/login`,
  CURRENT_USER: 'api/v1/users/me',
  USER: `api/v1/users`,
  CONTENTS: `api/v1/contents`,
  SUBMISSIONS: `api/v1/submissions`,
  REPORT: `api/v1/users/report`,
  LEADERBOARD: `api/v1/users/leaderboard`,
  GROUPS: `api/v1/groups`,
  SCRUMS: `api/v1/scrums`,
  CONNECT_DISCORD: `/api/v1/users/connect_discord`,
};
