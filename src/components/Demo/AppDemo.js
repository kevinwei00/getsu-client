import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { DemoContextProvider } from './DemoContext';
import GetsuContext from '../../GetsuContext';
import Inventory_Demo from './Inventory_Demo';
import ItemDetail_Demo from './ItemDetail_Demo';
import AddItem_Demo from './AddItem_Demo';
import NotFound from '../NotFound';
import DocumentUtils from '../../utils/document-utils';

export default class AppDemo extends Component {
  static contextType = GetsuContext;

  componentDidMount = () => {
    DocumentUtils.scrollToTop();
  };

  render() {
    return (
      <DemoContextProvider>
        {!this.context.isDemo && <Redirect to={'/'} />}
        <Switch>
          <Route exact path="/demo" component={Inventory_Demo} />
          <Route exact path="/demo/item/:item_id" component={ItemDetail_Demo} />
          <Route exact path="/demo/add-item" component={AddItem_Demo} />
          <Route component={NotFound} />
        </Switch>
      </DemoContextProvider>
    );
  }
}
