import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import './Question.scss';

import SolvedQuestion from '../../assets/images/dashboard/solved_question.png';
import UnsolvedQuestion from '../../assets/images/dashboard/solve_question.png';
import AttemptedQuestion from '../../assets/images/dashboard/retry_question.png';

const getColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'medium':
      return '#FFF796';
    case 'hard':
      return '#FFC89F';
    case 'easy':
      return '#92FDA9';
    default:
      return '#92FDA9';
  }
};

const getStatusImage = (status) => {
  switch (status.toLowerCase()) {
    case 'doubt':
      return AttemptedQuestion;
    case 'done':
      return SolvedQuestion;
    case 'notdone':
      return UnsolvedQuestion;
    default:
      return UnsolvedQuestion;
  }
};

const Question = (prop) => {
  const {
    title,
    tags,
    difficulty,
    index,
    status,
    link,
    id,
    onSubmitStatus,
  } = prop;

  return (
    <div className="question">
      <div className="row">
        <div className="col-xl-8 col-lg-6">
          <div className="row-wrapper">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              className="question__heading-anchor"
            >
              <h1 className="question__title">
                {index}. {title}
              </h1>
            </a>
          </div>

          <div className="question__tags">
            {tags.map((tag) => (
              <span key={tag} class="badge question__tag">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
        </div>
        <div className="col-xl-4 col-lg-6">
          <div className="question__right">
            <span
              style={{ backgroundColor: getColor(difficulty) }}
              className="badge question__right-difficulty"
            >
              {difficulty}
            </span>
            {<span style={{ color: 'white' }}>{getStatusText(status)}</span>}

            <img
              style={{ cursor: 'pointer' }}
              alt="status"
              src={getStatusImage(status)}
              id={`questionStatus-${id}`}
              onClick={() => onSubmitStatus(id, getNewStatus(status))}
            />

            <UncontrolledTooltip
              placement="right"
              target={`questionStatus-${id}`}
            >
              {getStatusText(status)}
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

function getNewStatus(prevStatus) {
  let prevNumState;
  if (prevStatus === 'doubt') {
    prevNumState = 2;
  } else if (prevStatus === 'done') {
    prevNumState = 0;
  } else {
    prevNumState = 1;
  }

  return (prevNumState + 1) % 3;
}

function getStatusText(status) {
  if (status === 'done') return 'Marked as done';
  if (status === 'notdone') return 'Marked as not done';
  return 'Marked as doubt';
}

export default Question;
