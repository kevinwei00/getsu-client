import React from 'react';
import ReactDOM from 'react-dom';
import Error from '../components/Error';

describe('<Error />', () => {
  const mockError = {
    error: {
      message: 'Test Error Display',
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Error error={mockError} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
