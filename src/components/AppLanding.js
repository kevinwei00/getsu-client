import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppNav from './AppNav';
import Login from './Login';
import Registration from './Registration';
import NotFound from './NotFound';
export default class AppLanding extends Component {
  render() {
    const LandingPage = (
      <section className="AppLanding">
        <header>
          <h1>
            Easily track your
            <br />
            inventory with Getsu.
          </h1>
        </header>
        <div className="AppLanding__features">
          <div className="AppLanding__features__text">Some cool feature!</div>
        </div>
        <div className="AppLanding__features">
          <div className="yabai-badge">やばい！</div>
          <div className="AppLanding__features__text">Some cool feature!</div>
        </div>
        <div className="AppLanding__features">
          <div className="yabai-badge">やばい！</div>
          <div className="AppLanding__features__text">
            Some long sentence and a dog l to a cat lay on!
          </div>
        </div>
        <div className="AppLanding__features">
          <div className="yabai-badge">やばい！</div>
          <div className="AppLanding__features__text">Some cool feature!</div>
        </div>
      </section>
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
