import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Question from '../components/Question';
import Progress from '../components/Progress';
import QuestionFilters from '../components/QuestionFilters';
import { getQuestions } from '../services/question';
import { getTopics } from '../services/topic';
import { submitQuestion } from '../services/submission';
import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';
import '../assets/css/challenges.scss';

const DIFFICULTIES = [
  { title: 'Easy', key: 'easy' },
  { title: 'Medium', key: 'medium' },
  { title: 'Hard', key: 'hard' },
];

const QUESTION_TYPES = [
  { title: 'Class', key: 'class' },
  { title: 'Assignment', key: 'assignment' },
];

const transformQuestionsData = (data) => {
  return data.data.map((question) => {
    const {
      unique_id: id,
      name: title,
      link,
      parent_id,
      status,
      difficulty,
      question_type,
    } = question.attributes;

    return {
      id,
      title,
      link,
      status,
      difficulty,
      question_type,
      tags: [parent_id],
    };
  });
};

const transformTopicsData = (data) => {
  return data.map((topic) => {
    return {
      selected: false,
      name: topic.attributes.unique_id,
    };
  });
};

const transformReportData = (data) => {
  const { total_solved_ques, total_ques } = data;
  const total_unsolved_ques = total_ques - total_solved_ques;
  let topic_wise = [];

  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'total_ques' && key !== 'total_solved_ques') {
      const title = key[0].toUpperCase() + key.slice(1);
      topic_wise.push([title, value]);
    }
  });
  topic_wise.push(['Unsolved', total_unsolved_ques]);

  return {
    topic_wise,
    total_ques,
    total_solved_ques,
    total_unsolved_ques,
  };
};

function getTextStatus(statusInNum) {
  if (statusInNum === 0) return 'done';
  else if (statusInNum === 1) return 'notdone';
  else return 'doubt';
}

function Challenges(props) {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [reportData, setReportData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [disableQuestionSubmission, setDisableQuestionSubmission] = useState(
    false
  );

  function toggleTopic(name) {
    const updatedTopics = [...topics];

    const selectedTopic = updatedTopics.find((topic) => topic.name === name);
    if (!selectedTopic) return;

    selectedTopic.selected = !selectedTopic.selected;
    setTopics(updatedTopics);
  }

  function getSelectedTopics() {
    return topics.filter((topic) => topic.selected);
  }

  const getProgressData = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.REPORT);
      setReportData(transformReportData(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  async function onSubmitQuestion(question_unique_id, status) {
    setDisableQuestionSubmission(true);
    const textStatus = getTextStatus(status);

    const updatedQuestions = [...questions];
    const updatedQuestion = questions.find(
      (question) => question.id === question_unique_id
    );
    updatedQuestion.status = textStatus;

    setQuestions(updatedQuestions);

    await submitQuestion({ question_unique_id, status });
    await getProgressData();
    setDisableQuestionSubmission(false);
  }

  useEffect(() => {
    getProgressData();

    getTopics()
      .then((res) => {
        setTopics(transformTopicsData(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    // let topics load first
    if (topics.length === 0) return;

    getQuestions({
      topics: getSelectedTopics(),
      difficulty: difficulty,
      question_type: questionType,
    })
      .then((res) => {
        setQuestions(transformQuestionsData(res));
        isLoading && setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics, difficulty, questionType]);

  if (isLoading) {
    return (
      <div className="dashboard d-flex">
        <div class="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        {/* <div className="dashboard__heading">
          <ul className="dashboard__ul">
            <li>Algorithm</li>
            <li>Data Structures</li>
          </ul>
        </div> */}

        <div className="section-wrapper row mt-4">
          <section className="questions col-lg-9 col-md-12 order-lg-1 order-md-2 order-sm-2 order-2">
            {questions.map((question, index) => (
              <Question
                key={question.id}
                index={index + 1}
                {...question}
                onSubmitStatus={onSubmitQuestion}
                disableQuestionSubmission={disableQuestionSubmission}
              />
            ))}
          </section>

          <section className="col-lg-3 col-md-12 order-lg-2 order-md-1 order-sm-1 order-1">
            <Progress reportData={reportData} />

            <QuestionFilters
              topics={topics}
              toggleTopic={toggleTopic}
              difficulties={DIFFICULTIES}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              questionTypes={QUESTION_TYPES}
              questionType={questionType}
              setQuestionType={setQuestionType}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
