import React from 'react';
import ReactDOM from 'react-dom';
import RequiredField from '../components/RequiredField';

describe('<RequiredField />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RequiredField />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
