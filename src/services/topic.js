import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';

export const getTopics = async (options = {}) => {
  if (!process.env.REACT_APP_MOCK_API) {
    const params = getParams(options);
    const response = await axios.get(API_ENDPOINTS.CONTENTS, { params });
    return response.data;
  } else return (await fakeTopic()).data;
};

const getParams = ({ params }) => {
  const parameter = {
    'filter[data_type]': 'subtopic',
    'filter[parent_id]': params.videoType,
  };

  return parameter;
};

const fakeTopic = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ data: fakeTopicData });
    }, 1000);
  });
};

const fakeTopicData = {
  data: [
    {
      id: '92',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/92',
      },
      attributes: {
        unique_id: 'beginner',
        parent_id: 'algo',
        name: 'Beginner',
        data_type: 'subtopic',
        link: null,
        priority: 0,
        score: null,
      },
    },
    {
      id: '2',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/2',
      },
      attributes: {
        unique_id: 'warmup',
        parent_id: 'algo',
        name: 'Warmup(Easy)',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '9',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/9',
      },
      attributes: {
        unique_id: 'arrays',
        parent_id: 'algo',
        name: 'Arrays',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '20',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/20',
      },
      attributes: {
        unique_id: 'interval-array',
        parent_id: 'algo',
        name: 'Interval Array',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '24',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/24',
      },
      attributes: {
        unique_id: 'matrix-array',
        parent_id: 'algo',
        name: 'Matrix Array',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '29',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/29',
      },
      attributes: {
        unique_id: 'string',
        parent_id: 'algo',
        name: 'String',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '40',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/40',
      },
      attributes: {
        unique_id: 'bitmap',
        parent_id: 'algo',
        name: 'BitMap',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '45',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/45',
      },
      attributes: {
        unique_id: 'permutations',
        parent_id: 'algo',
        name: 'Recursion/Permutations',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '48',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/48',
      },
      attributes: {
        unique_id: 'math',
        parent_id: 'algo',
        name: 'Math',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
    {
      id: '52',
      type: 'contents',
      links: {
        self: 'https://api.devsnest.in/api/v1/contents/52',
      },
      attributes: {
        unique_id: 'linked-list',
        parent_id: 'algo',
        name: 'Linked List',
        data_type: 'subtopic',
        link: null,
        priority: 1,
        score: null,
      },
    },
  ],
};
