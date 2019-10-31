import React, { Component } from 'react';
import './Error.css';

export default class Error extends Component {
  render() {
    return (
      <div className="Error" role="alert">
        {this.props.error.message
          ? 'Internal Server Error'
          : this.props.error.error.message}
      </div>
    );
  }
}
