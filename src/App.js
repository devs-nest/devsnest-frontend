import 'react-calendar-heatmap/dist/styles.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.scss';
import './assets/css/landing.scss';

import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import ConditionalRoute from './components/Route/ConditionalRoute';
import PrivateRoute from './components/Route/PrivateRoute';
import useAuth from './hooks/useAuth';
import Challenges from './pages/Challenges';
import Dashboard from './pages/Dashboard';
import Faq from './pages/Faqs';
import Group from './pages/Groups/Group';
import Groups from './pages/Groups/index';
import Landing from './pages/Landing';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Question from './pages/Question';

function App() {
  useAuth();

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

      <main>
        <Switch>
          <ConditionalRoute
            exact
            path="/"
            loggedInComponent={Dashboard}
            loggedOutComponent={Landing}
          />
          <Route exact path="/faqs" component={Faq} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/challenges" component={Challenges} />
          <PrivateRoute exact path="/question" component={Question} />
          <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
          <PrivateRoute exact path="/groups/:slug" component={Group} />
          <PrivateRoute exact path="/groups" component={Groups} />
          <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
