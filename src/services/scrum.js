import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';

export const getScrums = async () => {
  const response = await axios.get(`${API_ENDPOINTS.SCRUMS}`);
  return response.data;
};

export const saveScrum = async (member) => {
  const {
    id,
    user_id,
    data,
    attendence,
    saw_last_lecture,
    till_which_tha_you_are_done,
    what_cover_today,
    reason_for_backlog,
    rate_yesterday_class,
  } = member;

  const attributes = {
    attendence,
    data,
    user_id,
    saw_last_lecture,
    till_which_tha_you_are_done,
    what_cover_today,
    reason_for_backlog,
    rate_yesterday_class,
  };

  if (id) {
    const response = await axios.put(`${API_ENDPOINTS.SCRUMS}/${id}`, {
      data: { attributes, id: id, type: 'scrums' },
    });
    return response.data;
  } else {
    const response = await axios.post(`${API_ENDPOINTS.SCRUMS}`, {
      data: { attributes, type: 'scrums' },
    });
    return response.data;
  }
};

export const saveCurrentUserScrum = async (member, sendAttendence) => {
  const {
    id,
    data,
    attendence,
    saw_last_lecture,
    till_which_tha_you_are_done,
    what_cover_today,
    reason_for_backlog,
    rate_yesterday_class,
  } = member;

  const attributes = {
    attendence,
    data,
    saw_last_lecture,
    till_which_tha_you_are_done,
    what_cover_today,
    reason_for_backlog,
    rate_yesterday_class,
  };

  if (data.id) {
    const response = await axios.put(`${API_ENDPOINTS.SCRUMS}/${id}`, {
      data: { attributes, id, type: 'scrums' },
    });
    return response.data;
  } else {
    const response = await axios.post(`${API_ENDPOINTS.SCRUMS}`, {
      data: { attributes, type: 'scrums' },
    });
    return response.data;
  }
};