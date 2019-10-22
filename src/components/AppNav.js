import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ItemContext from '../ItemContext';
import TokenService from '../services/token-service';

class AppNav extends Component {
  static contextType = ItemContext;

  render() {
    let content;
    if (!this.context.hasAuthToken()) {
      content = (
        <div className="AppNav__section">
          <button
            className="AppNav__button"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </button>
          <button
            className="AppNav__button"
            onClick={() => {
              this.props.history.push('/register');
            }}
          >
            Register
          </button>
        </div>
      );
    } else {
      content = (
        <div className="AppNav__section">
          <div className="AppNav__username">
            <p>Welcome,</p>
            {TokenService.getCurrentUserName()}
          </div>
          <button
            className="AppNav__button"
            onClick={() => {
              TokenService.clearCurrentUserName();
              TokenService.clearAuthToken();
              this.context.clearAuthToken();
              this.context.clearItems();
              this.context.resetSortBy();
              this.props.history.push('/');
            }}
          >
            Logout
          </button>
          {/* <button onClick={() => this.props.history.push('/')}>Inventory</button>
        <button>History</button> */}
        </div>
      );
    }

    return (
      <nav className="AppNav">
        <div className="AppNav__section">
          <Link to="/">
            <div className="AppNav__logo">Getsu</div>
          </Link>
        </div>
        {content}
      </nav>
    );
  }
}

export default withRouter(AppNav);
