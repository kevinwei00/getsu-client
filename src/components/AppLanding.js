import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppNav from './AppNav';
import Login from './Login';
import Registration from './Registration';
import NotFound from './NotFound';
export default class AppLanding extends Component {
  render() {
    const LandingPage = (
      <>
        <header>
          <h1>Landing Page</h1>
        </header>
      </>
    );

    return (
      <>
        <AppNav />
        <main className="App__main">
          <Switch>
            <Route exact path="/" render={() => LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route path="/item" render={() => <Redirect to={'/'} />} />
            <Route path="/add-item" render={() => <Redirect to={'/'} />} />
            <Route path="/usage-history" render={() => <Redirect to={'/'} />} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }
}
