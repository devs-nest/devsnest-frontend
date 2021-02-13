import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './romponents/Login';
import SignUp from './romponents/SignUp';
import ListOfCurriculum from './romponents/ListOfCurriculum';
import Curriculum from './romponents/Curriculum';
import Profile from './romponents/Profile';
import Setting from './romponents/Setting';
import Containergbu from './Gbu/Containergbu';
import ForgotPassword from './romponents/ForgotPassword';
import Home from './romponents/Home';
import ApiTestPage from './romponents/apiTestPage';

import ContainerMentorFeedback from './MentorMentee/Mentor/ContainerMentorFeedback';
import ContainerMenteeFeedback from './MentorMentee/Mentee/ContainerMenteeFeedback';

import ReactGA from 'react-ga';
// import MainPage from './Landing Page/MainPage';
import LandingV2 from './landing_v2/landing';
import Faq from './landing_v2/faqs';

const App: React.ElementType = () => {
  useEffect(() => {
    let code: any =
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_GA_TRACKING_ID_PROD
        : process.env.REACT_APP_GA_TRACKING_ID_DEV;
    ReactGA.initialize(code);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/curriculum" component={ListOfCurriculum} />
          <Route exact path="/curriculum/:id" component={Curriculum} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Setting} />
          <Route exact path="/gbu" component={Containergbu} />
          <Route exact path="/ForgotPassword" component={ForgotPassword} />
          <Route exact path="/mentor" component={ContainerMentorFeedback} />
          <Route exact path="/mentee" component={ContainerMenteeFeedback} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LandingV2} />
          <Route exact path="/faqs" component={Faq} />
          <Route exact path="/api-test" component={ApiTestPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
