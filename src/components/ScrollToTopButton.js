import React, { Component } from 'react';
import './ScrollToTopButton.css';

export default class ScrollToTopButton extends Component {
  scrollToTop = () => {
    document.querySelector('.AppNav').scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <button
        type="button"
        className="ScrollToTopButton"
        onClick={this.scrollToTop}
        aria-label="Back to Top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    );
  }
}
