import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ItemContext from '../ItemContext';
import Inventory from './Inventory';
import ItemDetail from './ItemDetail';
import AddItem from './AddItem';
import UsageHistory from './UsageHistory';
import NotFound from './NotFound';

class AppPrivate extends Component {
  static contextType = ItemContext;

  render() {
    return (
      <>
        <nav>
          Welcome, Frodo
          <div>
            <button onClick={this.context.handleClickLogout}>Logout</button>
            <button onClick={() => this.props.history.push('/')}>Inventory</button>
            <button>History</button>
          </div>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Inventory} />
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

export default withRouter(AppPrivate);
