import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemContext from '../ItemContext';
import NotFound from './NotFound';

export default class AppLanding extends Component {
  static contextType = ItemContext;

  render() {
    return (
      <>
        <nav>
          GETSU
          <div>
            <button onClick={this.context.handleClickLogin}>Login</button>
          </div>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" render={() => <h1>Landing Page</h1>} />
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
