import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import GetsuContext from '../GetsuContext';
import AppNav from './AppNav';
import AppDemo from './Demo/AppDemo';
import Login from './Login';
import Registration from './Registration';
import NotFound from './NotFound';
import Landing_01 from '../assets/Landing_01.png';

class AppLanding extends Component {
  static contextType = GetsuContext;

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
            <div className="AppLanding__features__text--emphasis">
              Simplify your shopping lists!
            </div>{' '}
            Progress bars show at a glance how much of an item is left.
          </div>
        </div>
        <div className="AppLanding__features">
          <div className="AppLanding__features__text">
            <div className="yabai-badge">やばい！</div>
            <div className="AppLanding__features__text--emphasis">
              Never let food go bad again!
            </div>{' '}
            Set an item's expiration date and its progress bar will change colors based on
            how close it is to expiring.
          </div>
        </div>
        <div className="AppLanding__demo-button">
          <button
            type="button"
            className="call-to-action--themed"
            onClick={() => {
              this.context.setIsDemo(true);
              this.props.history.push('/demo');
            }}
            aria-label="Try Demo"
          >
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
            <Route path="/demo" component={AppDemo} />
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

export default withRouter(AppLanding);
