import React, { Component } from 'react';
import './App.css';
import ItemContext from '../ItemContext';
import TokenService from '../services/token-service';
import AppPrivate from './AppPrivate';
import AppLanding from './AppLanding';

export default class App extends Component {
  static contextType = ItemContext;

  componentDidMount = () => {
    this.context.saveAuthToken(TokenService.getAuthToken());
  }

  render() {
    return (
      <div className="App">
        {this.context.hasAuthToken() ? <AppPrivate /> : <AppLanding />}
      </div>
    );
  }
}
