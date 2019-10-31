import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import RequiredField from './RequiredField';
import Error from './Error';

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
        this.setState({ error: { error: { message: res.error } } });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="Registration">
        <header>
          <h1>Register</h1>
        </header>
        {error && <Error error={error} />}
        <form className="custom-form" onSubmit={this.handleSubmit}>
          <div className="custom-form__input-container">
            <label htmlFor="user_name">
              User Name <RequiredField />
            </label>
            <input
              className="custom-form__input"
              name="user_name"
              type="text"
              id="user_name"
              required
            ></input>
          </div>
          <div className="custom-form__input-container">
            <label htmlFor="password">
              Password <RequiredField />
            </label>
            <input
              className="custom-form__input"
              name="password"
              type="password"
              id="password"
              required
            ></input>
          </div>
          <div className="custom-form__buttons-container">
            <button type="submit" className="call-to-action--themed" aria-label="Register">
              Register
            </button>
          </div>
        </form>
      </section>
    );
  }
}
