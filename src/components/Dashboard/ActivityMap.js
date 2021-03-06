import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

export const ActivityMap = ({ user }) => {
  // User Activity Array for HeatMap
  let vals = user.activity
    ? Object.entries(user.activity).map((one) => {
        return {
          date: one[0],
          count: one[1],
        };
      })
    : []; // till fetching user data, let's keep it empty array

  // Dummy Vals for color check.
  // let vals = [
  //   { date: '2021-06-10', count: 1 },
  //   { date: '2021-06-11', count: 2 },
  //   { date: '2021-06-12', count: 5 },
  //   { date: '2021-06-13', count: 7 },
  //   { date: '2021-06-14', count: 10 },
  // ];

  // REFER: Will Remove the Extra Space at Bottom: https://github.com/kevinsqi/react-calendar-heatmap/issues/146
  CalendarHeatmap.prototype.getHeight = function () {
    return (
      this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize)
    );
  };

  return (
    <div className="shadow profile-card p-4 flex-fill m-3 d-flex flex-column justify-content-center">
      <h1 className="h5 my-2 font-weight-bold">Activity:</h1>
      <CalendarHeatmap
        values={vals}
        showWeekdayLabels={true}
        weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count === 0) {
            return 'color-empty';
          } else if (value.count === 1) {
            return 'color-scale-low';
          } else if (value.count <= 4) {
            return 'color-scale-mid';
          } else if (value.count <= 9) {
            return 'color-scale-high';
          } else {
            return `color-scale-max`;
          }
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return {
              'data-tip': 'No Activity',
            };
          }
          return {
            'data-tip': `${value.count} on ${value.date}`,
          };
        }}
      />
      <ReactTooltip />
    </div>
  );
};
