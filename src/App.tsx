import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';

import LandingV2 from './pages/home';
import Faq from './pages/home/faqs';

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
          <Route exact path="/" component={LandingV2} />
          <Route exact path="/faqs" component={Faq} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
