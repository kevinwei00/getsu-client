import React, { Component } from 'react';
import ItemContext from '../ItemContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

export default class Login extends Component {
  static contextType = ItemContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.context.saveAuthToken(res.authToken);

        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/';
        history.push(destination);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <h2>Login</h2>
        <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="user_name">
            <label htmlFor="LoginForm__user_name">User name</label>
            <input required name="user_name" id="LoginForm__user_name"></input>
          </div>
          <div className="password">
            <label htmlFor="LoginForm__password">Password</label>
            <input
              required
              name="password"
              type="password"
              id="LoginForm__password"
            ></input>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
