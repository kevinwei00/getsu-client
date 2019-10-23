import React from 'react';
import ReactDOM from 'react-dom';
import UsageHistory from '../components/UsageHistory';

describe('<UsageHistory />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UsageHistory />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
