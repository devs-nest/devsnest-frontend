import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';

export function transformData(data) {
  return data.map((scrum) => {
    const scrum_id = scrum.id;
    return {
      scrum_id,
      ...scrum.attributes,
    };
  });
}

export const getScrums = async (group_id) => {
  const params = { group_id: group_id };
  const response = await axios.get(`${API_ENDPOINTS.SCRUMS}`, { params });
  return transformData(response.data.data);
};

export const saveScrum = async (member, isTLorVtl) => {
  const {
    scrum_id,
    group_id,
    user_id,
    attendance,
    saw_last_lecture,
    tha_progress,
    topics_to_cover,
    backlog_reasons,
    class_rating,
  } = member;

  let attributes = {
    saw_last_lecture,
    tha_progress,
    topics_to_cover,
    backlog_reasons,
    class_rating,
  };

  if (isTLorVtl) {
    attributes.attendance = attendance;
  }

  if (scrum_id) {
    const response = await axios.put(`${API_ENDPOINTS.SCRUMS}/${scrum_id}`, {
      data: { id: scrum_id, attributes, type: 'scrums' },
    });
    return response.data;
  } else {
    attributes.user_id = user_id;
    attributes.group_id = group_id;
    const response = await axios.post(`${API_ENDPOINTS.SCRUMS}`, {
      data: { attributes: attributes, type: 'scrums' },
    });
    return response.data;
  }
};
