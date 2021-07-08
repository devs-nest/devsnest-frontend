import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Collapse } from 'reactstrap';

import styles from '../../assets/css/videos.module.scss';
import {
  nextStatus,
  statusToString,
  submitQuestion,
  submitQuestionFend,
} from '../../services/submission';
import icons from '../../utils/getIcons';
import myLog from '../../utils/myLog';
import {
  getQuestionColor,
  getQuestionTypeIcon,
} from '../../utils/questionConstant';

export const Question = ({
  question,
  setVideos,
  video_id,
  submittable,
  isReference,
}) => {
  const QUESTION_TYPE_IMG = getQuestionTypeIcon(
    question.question_type || question.type
  );
  const QUESTION_DIFFICULTY_COLOR = getQuestionColor(question.difficulty);
  const QUESTION_STATUS_IMG =
    question.status === 'done' ||
    (question.submission_link && question.submission_link !== 'nil')
      ? icons.question_tick
      : question.status === 'doubt'
      ? icons.question_doubt
      : icons.question_solve;
  const [disableQuestionSubmission, setDisableQuestionSubmission] = useState(
    false
  );

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(
    question.submission_link !== 'nil' ? question.submission_link : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitInput = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!input.startsWith('https://github.com/'))
        throw new Error('*Enter a valid github link');
      await submitQuestionFend({
        question_unique_id: question.unique_id,
        submission_link: input,
      });
      setVideos((current) =>
        current.map((video) => {
          if (video.id === video_id) {
            const newArr = video.questions.map((q) => {
              if (q.unique_id === question.unique_id) {
                return { ...q, submission_link: input };
              }
              return q;
            });
            return { ...video, questions: newArr };
          }
          return video;
        })
      );
      toast.success('Submission link submitted');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const onSubmitQuestion = async (question_unique_id, status) => {
    status = nextStatus(status);
    let status_ = statusToString(status);
    setDisableQuestionSubmission(true);
    try {
      await submitQuestion({ question_unique_id, status });
      setVideos((current) =>
        current.map((video) => {
          if (video.id === video_id) {
            const newArr = video.questions.map((q) => {
              if (q.unique_id === question_unique_id) {
                return { ...q, status: status_ };
              }
              return q;
            });
            return { ...video, questions: newArr };
          }
          return video;
        })
      );
    } catch (err) {
      myLog(err);
    }
    setDisableQuestionSubmission(false);
  };

  return (
    <div className={`${styles['questions']} my-sm-4 my-2`}>
      <div className={`d-flex align-items-center`}>
        <div
          className={`${styles['img']}`}
          style={{ backgroundColor: QUESTION_DIFFICULTY_COLOR }}
        >
          <img
            src={QUESTION_TYPE_IMG}
            alt={question.question_type}
            height="30px"
            width="30px"
          />
        </div>
        <a
          href={question.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`d-flex align-items-center ${styles['title']}`}
        >
          {question.name || question.title}
        </a>
        <div className={`${styles['img']}`}>
          {!isReference ? (
            <img
              src={QUESTION_STATUS_IMG}
              alt={question.status}
              height="30px"
              width="30px"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                disableQuestionSubmission
                  ? null
                  : submittable
                  ? setIsOpen(!isOpen)
                  : onSubmitQuestion(question.unique_id, question.status)
              }
            />
          ) : (
            <a href={question.link} target="_blank" rel="noopener noreferrer">
              <img
                src={QUESTION_STATUS_IMG}
                alt={question.status}
                height="30px"
                width="30px"
              />
            </a>
          )}
        </div>
      </div>
      {submittable && (
        <Collapse isOpen={isOpen}>
          <div
            className="d-flex justify-content-center"
            style={{
              borderTop: '1px solid lightgray',
              padding: '20px 25px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter the Github link to your solution"
              style={{
                border: 'none',
                borderBottom: '3px groove #F2EFF7',
                padding: '4px 0',
                marginRight: '15px',
                width: '100%',
                outline: 'none',
                background: 'transparent',
              }}
            />
            <img
              src={icons.question_submit}
              alt="question_submit"
              onClick={handleSubmitInput}
              disabled={isLoading}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {error && (
            <p className="d-flex justify-content-end pr-3 text-danger m-0 mb-1">
              {error}
            </p>
          )}
        </Collapse>
      )}
    </div>
  );
};
