import React, { Component } from 'react';
import ItemContext from '../ItemContext';
import './App.css';
import AppPrivate from './AppPrivate';
import AppLanding from './AppLanding';

export default class App extends Component {
  static contextType = ItemContext;

  render() {
    return (
      <div className="App">
        {this.context.hasAuthToken ? <AppPrivate /> : <AppLanding />}
      </div>
    );
  }
}
