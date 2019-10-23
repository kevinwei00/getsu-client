import React from 'react';
import ReactDOM from 'react-dom';
import ItemDetail from '../components/ItemDetail';
import { ItemProvider } from '../ItemContext';

describe.skip('<ItemDetail />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemProvider>
        <ItemDetail />
      </ItemProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
