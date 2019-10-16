import React, { Component } from 'react';
import './App.css';
import TokenService from '../services/token-service'
import AppPrivate from './AppPrivate';
import AppLanding from './AppLanding';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {TokenService.hasAuthToken() ? <AppPrivate /> : <AppLanding />}
      </div>
    );
  }
}
