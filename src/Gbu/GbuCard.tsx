import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser from 'react-html-parser';

const GbuCard = ({ gbu }) => {
  return (
    <>
      {gbu.map((item, index) => {
        return (
          <div style={{ padding: '10px' }} key={index}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: 'bold' }}
                >
                  GBU
                </Typography>
                <Typography variant="body2" component="p">
                  {ReactHtmlParser(item.description)}
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </>
  );
};
export default GbuCard;
