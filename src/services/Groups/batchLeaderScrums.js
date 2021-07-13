import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';
const DEFAULT_BATCH_LEADER_SCRUM = {
  id: null,
  Coordination: null,
  scrum_filled: null,
  owner_active: null,
  co_owner_active: null,
  rating: null,
  active_members: [],
  par_active_members: [],
  inactive_members: [],
  doubt_session_taker: [],
};


export function transformData(data) {
  return data.length === 0
    ? DEFAULT_BATCH_LEADER_SCRUM
    : data.map((scrum) => {
        const id = scrum.id;
        return {
          id,
          ...scrum.attributes,
        };
      })[0];
}


export const getScrums = async (group_id, today_date) => {
  const params = { group_id: group_id, date: `"${today_date}"` };
  const url_params = new URLSearchParams(params);
  const response = await axios.get(
    `${API_ENDPOINTS.BATCH_LEADER_SHEET}?${url_params.toString()}`
  );

  return transformData(response.data.data);
};

export const saveScrum = async (scrum_data) => {
  console.log(scrum_data);
  const {
    id,
    user_id,
    group_id,
    Coordination,
    scrum_filled,
    owner_active,
    co_owner_active,
    rating,
    active_members,
    par_active_members,
    inactive_members,
    doubt_session_taker,
  } = scrum_data;

  let attributes = {
    user_id,
    group_id,
    Coordination,
    scrum_filled,
    owner_active,
    co_owner_active,
    rating,
    active_members,
    par_active_members,
    inactive_members,
    doubt_session_taker,
  };

  if (id) {
    const response = await axios.put(
      `${API_ENDPOINTS.BATCH_LEADER_SHEET}/${id}`,
      {
        data: { id: id, attributes, type: 'batch_leader_sheets' },
      }
    );
    console.log(response.data);
    return response.data;
  } else {
    const response = await axios.post(`${API_ENDPOINTS.BATCH_LEADER_SHEET}`, {
      data: { attributes: attributes, type: 'batch_leader_sheets' },
    });
    console.log(response.data);
    return response.data;
  }
};
