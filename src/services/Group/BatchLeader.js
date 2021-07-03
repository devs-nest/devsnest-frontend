import axios from '../../config/axios.config';
import { API_ENDPOINTS } from '../../constants/api';

export function transformData(data) {
  return data.map((scrum) => {
    const batch_leader_scrum_id = scrum.id;
    return {
      batch_leader_scrum_id,
      ...scrum.attributes,
    };
  });
}

// get url  http://localhost:8000/api/v1/batch-leader-sheet?group_id=1&date="2021-06-19"

const getScrums = async (group_id, today_date) => {
  const params = { group_id: group_id, date: `"${today_date}"` };
  const response = await axios.get(`${API_ENDPOINTS.BATCH_LEADER_SHEET}`, {
    params,
  });
  return transformData(response.data.data);
};



export default getScrums;
