import React from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useLoginState } from '../../redux';
import { useUser } from '../../redux';
import { getSessionStore, makeSessionStore } from '../../utils/localStorage';
import RouteLoading from './RouteLoading';

export default function ConditionalRoute({
  loggedInComponent,
  loggedOutComponent,
  ...props
}) {
  const user = useUser();
  const history = useHistory();
  const loginState = useLoginState();

  if (loginState.isLoading) {
    return <Route {...props} component={RouteLoading} />;
  } else if (!loginState.loggedIn) {
    return <Route {...props} component={loggedOutComponent} />;
  } else {
    if (
      !getSessionStore('isOnboardingRedirect') &&
      user &&
      user.group_name === null
    ) {
      makeSessionStore('isOnboardingRedirect', true);
      history.push('/onboarding');
    }
    return <Route {...props} component={loggedInComponent} />;
  }
}
