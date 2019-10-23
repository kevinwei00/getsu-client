import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ItemContext from '../ItemContext';
import AppNav from './AppNav';
import Inventory from './Inventory';
import ItemDetail from './ItemDetail';
import AddItem from './AddItem';
import UsageHistory from './UsageHistory';
import NotFound from './NotFound';

export default class AppPrivate extends Component {
  static contextType = ItemContext;

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
            <Route path="/usage-history" component={UsageHistory} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }
}
