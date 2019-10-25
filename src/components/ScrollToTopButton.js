import React, { Component } from 'react';
import './ScrollToTopButton.css';
import DocumentUtils from '../utils/document-utils';

export default class ScrollToTopButton extends Component {
  scrollToTop = () => {
    DocumentUtils.scrollToTop({ behavior: 'smooth' });
  };

  render() {
    return (
      <button
        type="button"
        className="ScrollToTopButton call-to-action--themed"
        onClick={this.scrollToTop}
        aria-label="Back to Top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    );
  }
}
