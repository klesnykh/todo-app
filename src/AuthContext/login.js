import React from 'react';
import {When} from 'react-if';

import { LoginContext } from './_context.js';

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password, 'LOGIN');
  };

  handleSignUpSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password, 'SIGNUP');
  };

  render() {
    return (
      <>
        <When condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </When>

        <When condition={!this.context.loggedIn}>
          <form id="login" onSubmit={this.handleLoginSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <button>Log In</button>
          </form>

          <form id="signup" onSubmit={this.handleSignUpSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <button>Sign Up</button>
          </form>
        </When>
      </>
    );
  }
}

export default Login;