import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import ConditionalRoute from './components/ConditionalRoute';

import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.scss';
import './assets/css/landing.scss';
import 'react-calendar-heatmap/dist/styles.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Faq from './pages/Faqs';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Challenges from './pages/Challanges';
import Leaderboard from './pages/Leaderboard';
import Groups from './pages/Groups';
import ViewAllGroups from './pages/AllTeams';
import useAuth from './hooks/useAuth';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';

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
          <Route exact path="/user/:username" component={Profile} />
          <PrivateRoute exact path="/challenges" component={Challenges} />
          <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
          <PrivateRoute exact path="/groups/:slug" component={Groups} />
          <PrivateRoute exact path="/groups" component={ViewAllGroups} />
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
