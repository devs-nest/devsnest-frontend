import icons from './getIcons';

export const getQuestionTypeIcon = (type) => {
  switch (type) {
    case 'class':
      return icons.question_class_assignment;
    case 'assignment':
      return icons.question_tha;
    case 'code':
      return icons.question_code;
    case 'article':
      return icons.question_reading;
    default:
      return icons.question_code;
  }
};

export const getQuestionColor = (difficulty) => {
  switch (difficulty) {
    case 'hard':
      return '#FFC3AC';
    case 'medium':
      return '#FFF796';
    case 'easy':
      return '#92FDA9';
    default:
      return '#ACCAFF';
  }
};

export const dummyData = [
  {
    title: 'Week 10: Graphs', // name
    url: 'https://youtu.be/zYOVF6B8nUc', // link
    tag: 'Graph', // parent_id
    questions: [
      {
        title: 'Longest Substring Without Repeating Characters', // name
        difficulty: 'easy', // difficulty ['easy', 'medium', 'hard']
        type: 'class', // question_type ['class', 'assignment']
        status: 'solved', // status ['notdone', 'done', 'doubt']
        link:
          'https://leetcode.com/problems/longest-substring-without-repeating-characters', // link
      },
      {
        title: 'Valid Anagram',
        difficulty: 'medium',
        type: 'assignment',
        status: 'doubt',
        link: 'https://leetcode.com/problems/valid-anagram/',
      },
      {
        title: 'Valid Binary Search Tree',
        difficulty: 'hard',
        type: 'assignment',
        status: 'solve',
        link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      },
      {
        title: 'Valid Binary Search Tree',
        difficulty: 'hard',
        type: 'assignment',
        status: 'solve',
        link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      },
      // {
      //   title: 'Valid Binary Search Tree',
      //   difficulty: 'hard',
      //   type: 'assignment',
      //   status: 'solve',
      //   link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      // },
    ],
    references: [
      {
        title: 'Graph', // title
        type: 'code', // type ['article', 'code']
        link: 'https://www.programiz.com/dsa/graph', // link
      },
    ],
  },
  {
    title: 'Week 10: Graphs',
    url: 'https://youtu.be/j9gacsYnjWE',
    tag: 'Graph',
    questions: [
      {
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'easy',
        type: 'class',
        status: 'solved',
        link:
          'https://leetcode.com/problems/longest-substring-without-repeating-characters',
      },
      {
        title: 'Valid Anagram',
        difficulty: 'medium',
        type: 'assignment',
        status: 'doubt',
        link: 'https://leetcode.com/problems/valid-anagram/',
      },
      {
        title: 'Valid Binary Search Tree',
        difficulty: 'hard',
        type: 'assignment',
        status: 'solve',
        link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      },
    ],
    references: [
      {
        title: 'Graph',
        type: 'code',
        link: 'https://www.programiz.com/dsa/graph',
      },
      {
        title: 'Graph',
        type: 'reading',
        link: 'https://www.programiz.com/dsa/graph',
      },
    ],
  },
];
