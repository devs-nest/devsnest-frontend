import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import Moment from 'moment';

const ProfileCard: React.ElementType = ({ frequency }: any) => {
  const graphData = frequency.map((item: any) => {
    const graph = {
      date: Moment(item.key).format('YYYY-MM-DD'),
      count: item.value,
    };
    return graph;
  });

  return (
    <>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            style={{ fontWeight: 'bold', fontSize: '30px' }}
          >
            Submissions
          </Typography>
        </CardContent>
        <CardActions>
          <CalendarHeatmap
            startDate={new Date('2019-12-31')}
            endDate={new Date('2020-12-31')}
            values={graphData}
            onClick={(value) => console.log(value)}
            tooltipDataAttrs={(value: any) => {
              return {
                'data-tip': `${value.date} has Submission: ${value.count}`,
              };
            }}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
          />
          <ReactTooltip />
        </CardActions>
      </Card>
    </>
  );
};

export default ProfileCard;
