import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <div className="Loading__spinner"></div>
        Loading...
      </div>
    );
  }
}
