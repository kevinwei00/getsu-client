import React from 'react';
import ReactDOM from 'react-dom';
import ItemDetail from '../components/ItemDetail';
import { ItemProvider } from '../ItemContext';
import { MemoryRouter } from 'react-router-dom';

describe('<ItemDetail />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemProvider>
        <ItemDetail
          match={{ params: { item_id: '00000000-0000-0000-0000-000000000000' } }}
        />
      </ItemProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
