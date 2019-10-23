import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GetsuContext from '../GetsuContext';
import TokenService from '../services/token-service';

class AppNav extends Component {
  static contextType = GetsuContext;

  render() {
    let content;
    if (!this.context.hasAuthToken()) {
      content = (
        <div className="AppNav__section">
          <div className="AppNav__item">
            <Link to="/login">Log in</Link>
          </div>
          <div className="AppNav__item">|</div>
          <div className="AppNav__item">
            <Link to="/register">Register</Link>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="AppNav__section">
          <div className="AppNav__item AppNav__username">
            {TokenService.getCurrentUserName()}
          </div>
          <div className="AppNav__item">
            <i className="fas fa-caret-right"></i>
          </div>
          <div className="AppNav__item">
            <Link
              to="/"
              onClick={() => {
                TokenService.clearCurrentUserName();
                TokenService.clearAuthToken();
                this.context.clearAuthToken();
                this.context.clearItems();
                this.context.resetSortBy();
              }}
            >
              Log out
            </Link>
          </div>
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
