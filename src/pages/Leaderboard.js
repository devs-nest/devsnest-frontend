import '../assets/css/leaderboard.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../constants/api';
import useScroll from '../hooks/useScroll';

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.loginState.user);
  const scrollContainerRef = useRef();
  const [, , scrollTop] = useScroll(scrollContainerRef);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;
    if (
      element.scrollHeight - element.scrollTop <= element.clientHeight + 100 &&
      currentPage < leaderboardData.count &&
      !isLoadingMore
    ) {
      setIsLoadingMore(true);
      setCurrentPage(currentPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTop]);

  useEffect(() => {
    setIsLoadingMore(true);
    axios
      .get(`${API_ENDPOINTS.LEADERBOARD}?page=${currentPage}&size=20`)
      .then((res) => {
        // if data not loaded set data
        // otherwise append to current data
        if (!leaderboardData.scoreboard) {
          setLeaderboardData(res.data);
        } else {
          setLeaderboardData({
            ...leaderboardData,
            scoreboard: [...leaderboardData.scoreboard, ...res.data.scoreboard],
          });
        }
        setIsLoadingMore(false);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="leaderboard d-flex">
        <div className="spinner-border text-primary m-auto" role="status" />
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard__container row flex-row-reverse">
        <div className="col-md-12" style={{ height: '100%' }}>
          <div className="leaderboard__table pb-3">
            <div className="leaderboard__table-header row py-3 my-1 mx-4">
              <div className="h5 mb-0 text-center col-2">Rank</div>
              <div className="h5 mb-0 col-6">Name</div>
              <div className="h5 mb-0 text-center col-4">Score</div>
            </div>

            <div className="leaderboard__table-rows" ref={scrollContainerRef}>
              {leaderboardData.scoreboard &&
                leaderboardData.scoreboard.map((item, index) => (
                  <div
                    className={`row py-3 mx-4 ${
                      item.id === user.id ? 'current-user my-2' : 'my-0'
                    }`}
                    key={item.id}
                  >
                    <div className="text-center col-2">{index + 1}.</div>
                    <div className="col-6">{item.name}</div>
                    <div className="text-center col-4">{item.score || '0'}</div>
                  </div>
                ))}

              {isLoadingMore && (
                <div className="d-flex my-3">
                  <div
                    className="spinner-border text-primary mx-auto"
                    role="status"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
