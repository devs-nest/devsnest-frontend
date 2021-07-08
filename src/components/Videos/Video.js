import React, { useState } from 'react';
import ReactPlayer from 'react-player';

import styles from '../../assets/css/videos.module.scss';
import { difficultyToNumber } from '../../services/submission';
import icons from '../../utils/getIcons';
import { Question } from './Question';

const handleDifficultySort = (v1, v2) => {
  return difficultyToNumber(v1.difficulty) - difficultyToNumber(v2.difficulty);
};

export const Video = ({ video, setVideos, type }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div
      className={`${styles['card']} d-flex my-4 p-sm-4 p-2 flex-column flex-xl-row`}
    >
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center">
            <img src={icons.hash_bold} alt="hash" height="23px" />
            <span className={`ml-2 ${styles['video_title']}`}>
              {video.title}
            </span>
          </span>
          <span className="bg-white rounded p-1 shadow-sm ml-1">
            {video.tag}
          </span>
        </div>
        <div
          className={`mt-3 rounded overflow-hidden ${styles['player-wrapper']}`}
        >
          <ReactPlayer
            className={`${styles['react-player']}`}
            url={video.url}
            controls
            light
            height="100%"
            width="100%"
          />
        </div>
      </div>

      <div className="mx-xl-4 ml-xl-5 mt-3 mt-xl-0">
        <div className="d-flex pb-1">
          <div
            className={`cursor-pointer pr-sm-3 mr-sm-3 pr-2 mr-2 ${
              styles['right-title']
            } ${styles['right-line']} ${
              selected === 0 && styles['right-title-selected']
            }`}
            onClick={() => setSelected(0)}
          >
            Related Questions
          </div>
          <div
            className={`cursor-pointer ${styles['right-title']} ${
              selected === 1 && styles['right-title-selected']
            }`}
            onClick={() => setSelected(1)}
          >
            References
          </div>
        </div>
        <div className="mt-2 d-flex flex-column">
          {selected === 0
            ? video.questions && video.questions.length > 0
              ? video.questions
                  .sort(handleDifficultySort)
                  .map((q, index) => (
                    <Question
                      question={q}
                      key={index}
                      setVideos={setVideos}
                      video_id={video.id}
                      submittable={type === 'fend'}
                    />
                  ))
              : 'No Questions'
            : video.references && video.references.length > 0
            ? video.references.map((q, index) => (
                <Question question={q} key={index} isReference={true} />
              ))
            : 'No References'}
        </div>
      </div>
    </div>
  );
};
