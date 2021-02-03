import GoogleLogin from 'react-google-login';
import React, { Component } from 'react';
import { HOST } from '../config/constants';

function GoogleLoginDiv() {
  const responseGoogle = (resp) => {
    console.log(resp);
    // console.log(resp);
    // console.log(resp.accessToken);
    // console.log(resp.googleId);
    // console.log(resp.profileObj.email, resp.profileObj.name);

    const url = HOST + '/customers/login';
    const data = {
      name: resp.profileObj.name,
      email: resp.profileObj.email,
      accessToken: resp.accessToken,
      googleId: resp.googleId,
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    // .then(res => setFetchedData({ data: res.data, error: res.error}))
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleLoginDiv;
