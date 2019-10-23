import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from '../components/Inventory';
import { GetsuContextProvider } from '../GetsuContext';

describe('<Inventory />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GetsuContextProvider>
        <Inventory />
      </GetsuContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
