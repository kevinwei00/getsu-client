import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from '../components/Inventory';
import { ItemProvider } from '../ItemContext';

describe('<Inventory />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemProvider>
        <Inventory />
      </ItemProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
