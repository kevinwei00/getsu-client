import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppNav from './AppNav';
import Login from './Login';
import Registration from './Registration';
import NotFound from './NotFound';
import Landing_01 from '../assets/Landing_01.png';
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
          <img src={Landing_01} alt="Getsu Feature 1" />
          <div className="AppLanding__features__text">
            <div className="yabai-badge">やばい！</div>
            Getsu is a household inventory tracker that provides you with a way to catalog
            and view any consumable items of your choosing.
          </div>
        </div>
        <div className="AppLanding__features">
          <div className="AppLanding__features__text">
            <div className="yabai-badge">やばい！</div>
            Each item is represented by a progress bar that shows you at a glance how much
            of an item is left. Simplify shopping lists!
          </div>
        </div>
        <div className="AppLanding__features">
          <div className="AppLanding__features__text">
            <div className="yabai-badge">やばい！</div>
            Set the expiration date of an item and its progress bar will change colors
            based on how close to the date it is. Never let food go bad again!
          </div>
        </div>
        <div className="AppLanding__demo-button">
          <button type="button" className="call-to-action--themed">
            Try Demo
          </button>
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
