import React, { Component } from 'react';
import './ProgressBar.css';
import ExpirationsService from '../services/expirations-service';

export default class ProgressBar extends Component {
  getBarColor = (expiration_date) => {
    return `ProgressBar__inner--${ExpirationsService.getExpirationString(
      expiration_date
    )}`;
  };

  render() {
    const { now, label, expiration_date } = this.props;
    return (
      <div className="ProgressBar">
        <div
          className={`ProgressBar__inner ${this.getBarColor(expiration_date)}`}
          role="progressbar"
          aria-valuenow={now}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${now}%` }}
        >
          {label}
        </div>
      </div>
    );
  }
}
