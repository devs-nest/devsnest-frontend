import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import RouteLoading from './RouteLoading';

export default function ConditionalRoute({
  loggedInComponent,
  loggedOutComponent,
  ...props
}) {
  const loginState = useSelector((state) => state.loginState);

  if (loginState.isLoading) {
    return <Route {...props} component={RouteLoading} />;
  } else if (!loginState.loggedIn) {
    return <Route {...props} component={loggedOutComponent} />;
  } else {
    return <Route {...props} component={loggedInComponent} />;
  }
}
