import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from '../assets/css/videos.module.scss';
import Filter from '../components/Layout/Filter';
import { Video } from '../components/Videos/Video';
import { getQuestions } from '../services/question';
// import { dummyData } from '../utils/questionConstant'; // Dummy Data
import { getTopics } from '../services/topic';
import icons from '../utils/getIcons';
import myLog from '../utils/myLog';

function VideoScreen() {
  const params = useParams();
  const [filter, setFilter] = useState({
    values: [],
    selected: -1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const onFilterChange = (index) => {
    setFilter((current) => ({
      ...current,
      selected: current.selected === index ? -1 : index,
    }));
  };

  const transformTopicsData = (data) => {
    return data.map((topic) => {
      return topic.attributes.unique_id
        ? topic.attributes.unique_id[0].toUpperCase() +
            topic.attributes.unique_id.slice(1)
        : '';
    });
  };

  const transformQuestionsData = (data) => {
    return data.data.map((question) => {
      const {
        unique_id: id,
        name: title,
        link: url,
        parent_id: tag_,
        questions_list: questions,
        reference_data: references,
      } = question.attributes;

      const tag = tag_ ? tag_[0].toUpperCase() + tag_.slice(1) : '';

      return {
        id,
        title,
        url,
        tag,
        questions,
        references,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const topicRes = await getTopics({ parent_id: params.videoType });
        const topics = topicRes?.data.map((e) => {
          return {
            name: e?.attributes?.unique_id,
          };
        });
        setFilter((current) => ({
          ...current,
          values: transformTopicsData(topicRes.data),
        }));

        const questionsRes = await getQuestions({
          data_type: 'video',
          topics,
        });
        setVideos(transformQuestionsData(questionsRes));
        // setVideos(dummyData);
        myLog(transformQuestionsData(questionsRes));
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (isLoading) {
    return (
      <div className="dashboard d-flex">
        <div className="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

  return (
    <div className={`${styles['videos']} py-4`}>
      <div className={`d-flex flex-column ${styles['margin-controller']}`}>
        {filter.values.length > 0 ? (
          <div className="d-flex align-items-center px-3">
            <img
              src={icons.filter}
              alt="filter"
              height="25px"
              width="25px"
              className="mr-4"
            />
            <Filter
              values={filter.values}
              selected={filter.selected}
              onClick={onFilterChange}
            />
          </div>
        ) : (
          'No Topic Found'
        )}
        {filter.values.length > 0 &&
          videos &&
          videos.map((video, index) => {
            if (
              filter.selected === -1 ||
              filter.values[filter.selected] === video.tag
            ) {
              return (
                <Video
                  video={video}
                  key={index}
                  setVideos={setVideos}
                  type={params.videoType}
                />
              );
            }
            return '';
          })}
      </div>
    </div>
  );
}

export default VideoScreen;
