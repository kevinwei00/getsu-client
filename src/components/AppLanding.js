import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Login';
import NotFound from './NotFound';
class AppLanding extends Component {
  render() {
    return (
      <>
        <nav>
          GETSU
          <div>
            <button
              onClick={() => {
                this.props.history.push('/login');
              }}
            >
              Login
            </button>
          </div>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" render={() => <h1>Landing Page</h1>} />
            <Route path="/login" component={Login} />
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
