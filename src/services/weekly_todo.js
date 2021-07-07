import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';

export const transformData = (data) => {
  const todo_id = data.id;
  return { todo_id, ...data.attributes };
};

export const getWeeklyTodo = async (group_id, date) => {
  const params = { group_id: group_id, date: date };
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
    todo_id,
    sheet_filled,
    most_active,
    most_helpful,
    moral_status,
    obstacles,
    feedback,
    todo_list,
  } = state;

  const attributes = {
    sheet_filled,
    most_active,
    most_helpful,
    moral_status,
    obstacles,
    feedback,
    todo_list,
  };

  console.log(state);
  const response = await axios.put(`${API_ENDPOINTS.WEEKLY_TODO}/${todo_id}`, {
    data: { id: todo_id, type: 'weekly_todos', attributes },
  });
  // console.log({ data: { id: todo_id, type: 'weekly_todos', attributes } });
  return response;
};
