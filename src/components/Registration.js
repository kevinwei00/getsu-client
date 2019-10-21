import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import RequiredField from './RequiredField';

export default class Registration extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  state = { error: null };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, password } = e.target;
    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
    })
      .then(() => {
        user_name.value = '';
        password.value = '';
        this.props.history.push('/login');
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="Registration">
        <h2>Register</h2>
        <form className="Registration__form" onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="user_name">
            <label htmlFor="user_name">
              User Name <RequiredField />
            </label>
            <input name="user_name" type="text" required id="user_name"></input>
          </div>
          <div className="password">
            <label htmlFor="password">
              Password <RequiredField />
            </label>
            <input name="password" type="password" required id="password"></input>
          </div>
          <button type="submit">Register</button>
        </form>
      </section>
    );
  }
}