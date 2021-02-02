import GoogleLogin from 'react-google-login';
import React, { Component } from 'react';
require('dotenv').config();

class GoogleLoginDiv extends Component {
  responseGoogle = (resp) => {
    // console.log(resp);
    // console.log(resp.accessToken);
    // console.log(resp.googleId);
    // console.log(resp.profileObj.email, resp.profileObj.name);

    const url = 'http://localhost:4000/customers/login';
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

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="378443496505-1hdvch7vk5do0fru4curohirkiv9h5t0.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default GoogleLoginDiv;
