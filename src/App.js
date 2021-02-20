import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import 'react-multi-carousel/lib/styles.css';
import './assets/css/index.scss';
import './assets/css/landing.scss';

import LandingV2 from './pages/home';
import Faq from './pages/home/faqs';

function App() {
  useEffect(() => {
    let code =
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
}

export default App;
