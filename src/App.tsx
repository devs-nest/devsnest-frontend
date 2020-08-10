import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './romponents/Login';
import SignUp from './romponents/SignUp';
import ListOfCurriculum from './romponents/ListOfCurriculum';
import Curriculum from './romponents/Curriculum';
import Profile from './romponents/Profile';
import Setting from './romponents/Setting';

import ReactGA from 'react-ga';

const App: React.ElementType = () => {
  useEffect(() => {
    ReactGA.initialize('UA-173643032-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={ListOfCurriculum} />
          <Route exact path="/curriculum/:id" component={Curriculum} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Setting} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
