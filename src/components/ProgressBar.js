import React, { Component } from 'react';
import './ProgressBar.css';

export default class ProgressBar extends Component {
  getBarColor = (expiration_date) => {
    const today = new Date();
    expiration_date = new Date(expiration_date);
    let numDays = (expiration_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    numDays = Math.ceil(numDays);
    if (numDays <= 0) {
      return 'ProgressBar__inner--expired';
    } else if (numDays <= 2) {
      return 'ProgressBar__inner--danger';
    } else if (numDays <= 4) {
      return 'ProgressBar__inner--warning';
    } else if (numDays > 4) {
      return 'ProgressBar__inner--fresh';
    }
    //return 'ProgressBar__inner--nonperishable';
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
