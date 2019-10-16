import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import Inventory from './Inventory';
import ItemDetail from './ItemDetail';
import AddItem from './AddItem';
import UsageHistory from './UsageHistory';
import NotFound from './NotFound';

class AppPrivate extends Component {
  render() {
    return (
      <>
        <nav>
          Welcome, --
          <div>
            <button
              onClick={() => {
                TokenService.clearAuthToken();
                this.props.history.push('/');
              }}
            >
              Logout
            </button>
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
