import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GetsuContext from '../GetsuContext';
import AppNav from './AppNav';
import Inventory from './Inventory';
import ItemDetail from './ItemDetail';
import AddItem from './AddItem';
import NotFound from './NotFound';

export default class AppPrivate extends Component {
  static contextType = GetsuContext;

  render() {
    return (
      <>
        <AppNav />
        <main className="App__main">
          <Switch>
            <Route exact path="/" component={Inventory} />
            <Route path="/login" render={() => <Redirect to={'/'} />} />
            <Route path="/register" render={() => <Redirect to={'/'} />} />
            <Route path="/item/:item_id" component={ItemDetail} />
            <Route path="/add-item" component={AddItem} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }
}
