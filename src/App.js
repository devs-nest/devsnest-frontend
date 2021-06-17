import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.scss';
import './assets/css/landing.scss';

import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ConditionalRoute from './components/ConditionalRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import useAuth from './hooks/useAuth';
import ViewAllGroups from './pages/AllTeams';
import Challenges from './pages/Challanges';
import Dashboard from './pages/Dashboard';
import Faq from './pages/Faqs';
import Groups from './pages/Groups';
import Landing from './pages/Landing';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/login';
import LoginCallback from './pages/login/Callback';
import NotFound from './pages/NotFound';

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
          <Route exact path="/login/callback" component={LoginCallback} />
          <PrivateRoute exact path="/challenges" component={Challenges} />
          <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
          <PrivateRoute exact path="/groups/:slug" component={Groups} />
          <PrivateRoute exact path="/groups" component={ViewAllGroups} />
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
