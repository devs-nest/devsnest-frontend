import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import 'react-multi-carousel/lib/styles.css';
import './assets/css/index.scss';
import './assets/css/landing.scss';

import Landing from './pages/Landing';
import Faq from './pages/Faqs';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

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
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/faqs" component={Faq} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
