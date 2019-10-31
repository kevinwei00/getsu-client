import React, { Component } from 'react';
import GetsuContext from '../GetsuContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import Error from './Error';

export default class Login extends Component {
  static contextType = GetsuContext;

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
        TokenService.saveCurrentUserName(user_name.value);
        TokenService.saveAuthToken(res.authToken);
        this.context.saveAuthToken(res.authToken);

        user_name.value = '';
        password.value = '';

        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/';
        history.push(destination);
      })
      .catch((res) => {
        this.setState({ error: { error: { message: res.error } } });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="Login">
        <header>
          <h1>Login</h1>
        </header>
        {error && <Error error={error} />}
        <form className="custom-form" onSubmit={this.handleSubmitJwtAuth}>
          <div className="custom-form__input-container">
            <label htmlFor="user_name">User Name</label>
            <input
              className="custom-form__input"
              name="user_name"
              type="text"
              id="user_name"
              required
            ></input>
          </div>
          <div className="custom-form__input-container">
            <label htmlFor="password">Password</label>
            <input
              className="custom-form__input"
              name="password"
              type="password"
              id="password"
              required
            ></input>
          </div>
          <div className="custom-form__buttons-container">
            <button type="submit" className="call-to-action--themed" aria-label="Log In">
              Login
            </button>
          </div>
        </form>
      </section>
    );
  }
}
