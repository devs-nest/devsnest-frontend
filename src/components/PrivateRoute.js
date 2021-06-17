import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import RouteLoading from './RouteLoading';

export default function PrivateRoute({ ...props }) {
  const loginState = useSelector((state) => state.loginState);

  if (loginState.isLoading) {
    return <Route {...props} component={RouteLoading} />;
  } else if (!loginState.loggedIn) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
}
