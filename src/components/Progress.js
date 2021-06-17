import React from 'react';
import Chart from 'react-google-charts';

import ProgressImage from '../assets/images/dashboard/progress.png';

function Progress(props) {
  const {
    reportData: { topic_wise, total_solved_ques, total_ques },
  } = props;

  return (
    <div className="progress__container">
      <h3 className="progress__container-heading">
        <img src={ProgressImage} alt="progress icon" />
        <span>Your Progress</span>
      </h3>

      {topic_wise ? (
        <div className="mt-4 px-4 bg-white">
          <Chart
            width="100%"
            height="250px"
            chartType="PieChart"
            loader={
              <div className="d-flex" style={{ height: '250px' }}>
                <div
                  className="spinner-border text-primary m-auto"
                  role="status"
                />
              </div>
            }
            data={[['Topic', 'Ques solved'], ...topic_wise]}
            options={{
              legend: 'none',
              chartArea: { width: '90%', height: '90%' },
            }}
          />
          <div className="pb-4">
            <div className="mb-2">
              <span className="font-weight-bold">Total Questions:</span>{' '}
              {total_ques}
            </div>
            <div className="">
              <span className="font-weight-bold">Solved Questions:</span>{' '}
              {total_solved_ques}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 bg-white d-flex py-4">
          <div className="spinner-border text-primary mx-auto" role="status" />
        </div>
      )}
    </div>
  );
}

export default Progress;
