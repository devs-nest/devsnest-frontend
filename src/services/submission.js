import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';

function submitQuestion({ question_unique_id, status }) {
  const res = axios.post(API_ENDPOINTS.SUBMISSIONS, {
    data: {
      attributes: { question_unique_id, status },
      type: 'submissions',
    },
  });

  return res;
}

function submitQuestionFend({ question_unique_id, submission_link }) {
  const res = axios.post(API_ENDPOINTS.FRONTEND_SUBMISSIONS, {
    data: {
      attributes: { question_unique_id, submission_link },
      type: 'frontend_submissions',
    },
  });

  return res;
}

function statusToNumber(string) {
  switch (string) {
    case 'done':
      return 0;
    case 'notdone':
      return 1;
    case 'doubt':
      return 2;
    default:
      return 1;
  }
}

function statusToString(number) {
  switch (number) {
    case 0:
      return 'done';
    case 1:
      return 'notdone';
    case 2:
      return 'doubt';
    default:
      return 'notdone';
  }
}

function nextStatus(number) {
  if (typeof number === 'string') {
    number = statusToNumber(number);
  }
  return (number + 1) % 3;
}

function difficultyToNumber(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 0;
    case 'medium':
      return 1;
    case 'hard':
      return 2;
    default:
      return 3;
  }
}

export {
  difficultyToNumber,
  nextStatus,
  statusToNumber,
  statusToString,
  submitQuestion,
  submitQuestionFend,
};
