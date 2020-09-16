import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CardContent from '@material-ui/core/CardContent';
import { Chart } from 'chart.js';
import { Progress } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import BookIcon from '@material-ui/icons/Book';
import Collapse from '@material-ui/core/Collapse';
import axios from '../config/axios.config';
import { Redirect } from 'react-router';
import ReactGA from 'react-ga';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
// import {Sonnet} from 'react-bootstrap';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

// import Tabs from 'react-bootstrap/Tabs'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 25,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: 'white',
    borderRadius: '5px',
    backgroundColor: '#1C484A',
  },

  buttonTop: {
    // fontFamily: 'Quicksand',
    width: '100%',
    height: '40px',
    fontSize: '13px',
    lineHeight: '17px',
    color: '#FFFFFF',
  },
}));

export interface Props {
  task: any;
  updateAllTasks: any;
}

function Chapter({ task, updateAllTasks }: Props) {
  console.log(task, '---task-komal--');
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const { id: chapterId } = task;
  console.log(chapterId, 'chapterId');

  const handleExpandClick = () => {
    console.log(subTasks, '------');
    getAllTasks();
    ReactGA.event({
      category: 'Button',
      action: 'functional symbol',
    });
    setExpanded(!expanded);
  };

  let token: string = localStorage.getItem('Token') || '';
  const getAllTasks = async () => {
    console.log('getData');
    await axios
      .get(`api/chapters/${chapterId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Response', response);
        let tempSubTasks = [];
        tempSubTasks = response.data.data.map((sT: any) => {
          return {
            id: sT.id,
            status: sT.status,
            type: sT.type,
            name: sT.name,
            slug: sT.slug,
            url: sT.url,
          };
        });
        setSubTasks(tempSubTasks);
        console.log(subTasks, '0000');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const changeStatus = (subTaskId: any, newStatus: any) => {
    if (token !== '') {
      axios
        .put(
          `api/tasks/${subTaskId}`,
          {
            status: newStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          getAllTasks();
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    console.log('===getAlll======');
    getAllTasks();
  }, []);
  if (token === '') {
    return <Redirect to={'/login'} />;
  }
  let percentage: number = 0;
  if (task.task_count == null) {
    percentage = 0;
  } else {
    percentage = Math.floor((task.task_count / task.total_task) * 100);
  }

  const total: number = 100;
  var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function () {
      originalDoughnutDraw.apply(this, arguments);

      var chart = this.chart.chart;
      var ctx = chart.ctx;
      var width = chart.width;
      var height = chart.height;

      var fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + 'em Verdana';
      ctx.textBaseline = 'middle';

      var text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
    },
  });

  const state = {
    labels: ['', 'Completed'],
    datasets: [
      {
        backgroundColor: ['#c1c1c1', '#26ae60'],
        data: [total - percentage, percentage],
      },
    ],
    text: `${percentage}%`,
  };
  console.log(subTasks, 'checking');
  console.log(task, 'task');
  return (
    <>
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <a
          className="nav-link active"
          id="v-pills-home-tab"
          data-toggle="pill"
          href="#v-pills-home"
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
        >
          Home
        </a>
        <a
          className="nav-link"
          id="v-pills-profile-tab"
          data-toggle="pill"
          href="#v-pills-profile"
          role="tab"
          aria-controls="v-pills-profile"
          aria-selected="false"
        >
          Profile
        </a>
        <a
          className="nav-link"
          id="v-pills-messages-tab"
          data-toggle="pill"
          href="#v-pills-messages"
          role="tab"
          aria-controls="v-pills-messages"
          aria-selected="false"
        >
          Messages
        </a>
        <a
          className="nav-link"
          id="v-pills-settings-tab"
          data-toggle="pill"
          href="#v-pills-settings"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >
          Settings
        </a>
      </div>
      <div className="tab-content" id="v-pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="v-pills-home"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-messages"
          role="tabpanel"
          aria-labelledby="v-pills-messages-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="v-pills-settings"
          role="tabpanel"
          aria-labelledby="v-pills-settings-tab"
        >
          ...
        </div>
      </div>

      {/* <Grid container style={{marginTop:'20px'}} >
        <Grid item md={4} style={{ padding:'10px' }} >
         <Paper  className={classes.paper} style={{}} >
          <CardContent style={{}}>
        
            <Typography>
            <h5> {task ? task.text : null}</h5>
          </Typography>
     
        <Grid container direction={'row'} spacing={3}  style={{marginTop:'20px'}}>
        <Grid item xl={6} md={8} sm={8} xs={12}>
         <Progress style={{ backgroundColor: '#F1A615' }}
                value={30}
                />
        
        </Grid>
        <Grid item xl={6} md={4} sm={4} xs={12}>
        <Button className={classes.buttonTop} style={{backgroundColor:'#F1A615' }} onClick = {handleExpandClick}>Explore</Button>
        </Grid>
      </Grid>
        </CardContent>
        
          </Paper>

          
        </Grid>

    
{ expanded && */}
      {/* <Grid item md={8} >
<Container>
<TableContainer component={Paper}>
    <Table>
     <TableBody>
        {subTasks
            ? subTasks.map((subTask: any) => (
          <StyledTableRow>
             <StyledTableCell>
          <Typography>
           {subTask.name}
          </Typography>
           </StyledTableCell>

          </StyledTableRow>
            
          ))
            : null}
       </TableBody>     
     
       </Table>
      </TableContainer>
       </Container>
        </Grid>
    
    
}
</Grid> */}

      {/* <div className="container" key={task.id}>
        <Card style={{ backgroundColor:'yellow',boxShadow: ' 4px 4px 8px 4px rgba(0,0,0,0.2)' }}>
          <Grid container direction="row" justify="space-between">
            <Grid item md={8}>
              <CardContent style={{ display: 'flex' }}>
                <Typography>
                  <h2> {task ? task.text : null}</h2>
                </Typography>

                <CardContent>
                  <span
                    onClick={handleExpandClick}
                    style={{ alignSelf: 'center', padding: '20px' }}
                  >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </span>
                </CardContent>
              </CardContent>
            </Grid>
            <Grid item md={2} style={{ padding: '20px' }}>
              <Doughnut
                data={state}
                width={10}
                height={10}
                options={{
                  legend: {
                    display: false,
                    position: 'left',
                    labels: {
                      fontColor: '#000',
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </Grid>
          </Grid>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
              >
                <Grid item md={12}>
                  <Container style={{}}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableBody>
                          {subTasks
                            ? subTasks.map((subTask: any) => (
                                <StyledTableRow style={{backgroundColor:'pink'}}>
                                  <StyledTableCell>
                                    {subTask.type === 'QUESTION' ? (
                                      <HelpOutlineIcon
                                        style={{ fontSize: '60px' }}
                                      />
                                    ) : subTask.type === 'TUTORIAL' ? (
                                      <BookIcon style={{ fontSize: '60px' }} />
                                    ) : subTask.type === 'VIDEO' ? (
                                      <MovieCreationIcon
                                        style={{ fontSize: '30px' }}
                                      />
                                    ) : null}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <a
                                      className="textHover"
                                      style={{
                                        textDecoration: 'none',
                                        color: '#0e141e',
                                      }}
                                      href={subTask.url}
                                    >
                                      {' '}
                                      {subTask.name}
                                    </a>
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    {subTask.url && (
                                      <ReactGA.OutboundLink
                                        eventLabel="CourseLink"
                                        to={subTask.url}
                                        target="_blank"
                                      >
                                       
                                      </ReactGA.OutboundLink>
                                    )}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    {
                                      <Checkbox
                                        onClick={() =>
                                          changeStatus(
                                            subTask.id,
                                            subTask.status === 'DONE'
                                              ? 'UNDONE'
                                              : 'DONE'
                                          )
                                        }
                                        color="primary"
                                        inputProps={{
                                          'aria-label': 'secondary checkbox',
                                        }}
                                        checked={
                                          subTask.status === 'DONE'
                                            ? true
                                            : false
                                        }
                                      />
                                    }
                                  </StyledTableCell>

                                  <StyledTableCell align="right">
                                    {}
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Container>
                </Grid>
              </Grid>
            </div>
          </Collapse>
        </Card>
      </div> */}
    </>
  );
}

export default Chapter;
