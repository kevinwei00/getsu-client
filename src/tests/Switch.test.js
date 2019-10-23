import React from 'react';
import ReactDOM from 'react-dom';
import Switch from '../components/Switch';

describe('<Switch />', () => {
  let testBool = false;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Switch
        identifier={`test_identifier`}
        isOn={testBool}
        onColor="#06D6A0"
        handleToggle={() => (testBool = !testBool)}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
