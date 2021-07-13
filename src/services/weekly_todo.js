import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';

export const transformData = (data) => {
  if (!data) data = [];
  const todo_id = data.id;
  return { todo_id, ...data.attributes };
};

export const getWeeklyTodo = async (group_id, date) => {
  const params = { group_id: group_id };
  const response = await axios.get(`${API_ENDPOINTS.WEEKLY_TODO}`, { params });
  return transformData(response.data.data[0]);
};

export const getStreak = async (group_id) => {
  const response = await axios.get(
    `${API_ENDPOINTS.WEEKLY_TODO}/${group_id}/streak`
  );
  return response.data;
};

export const saveWeeklyTodo = async (state, isTlVtl) => {
  if (!isTlVtl) return;
  const {
    group_id,
    todo_id,
    extra_activity,
    batch_leader_rating,
    group_activity_rating,
    moral_status,
    obstacles,
    comments,
    todo_list,
    creation_week,
  } = state;

  const attributes = {
    sheet_filled: true,
    extra_activity,
    batch_leader_rating,
    group_activity_rating,
    moral_status,
    obstacles,
    comments,
    todo_list,
  };

  if (todo_id) {
    const response = await axios.put(
      `${API_ENDPOINTS.WEEKLY_TODO}/${todo_id}`,
      {
        data: {
          id: todo_id,
          type: 'weekly_todos',
          attributes: { ...attributes, creation_week },
        },
      }
    );
    return transformData(response.data.data);
  } else {
    const response = await axios.post(`${API_ENDPOINTS.WEEKLY_TODO}`, {
      data: { type: 'weekly_todos', attributes: { ...attributes, group_id } },
    });
    return transformData(response.data.data);
  }
};
