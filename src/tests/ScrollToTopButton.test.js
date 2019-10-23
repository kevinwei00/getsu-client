import React from 'react';
import ReactDOM from 'react-dom';
import ScrollToTopButton from '../components/ScrollToTopButton';

describe('<ScrollToTopButton />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ScrollToTopButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
