import React from 'react';
import ReactDOM from 'react-dom';
import ItemDetail from '../components/ItemDetail';
import { GetsuContextProvider } from '../GetsuContext';
import { MemoryRouter } from 'react-router-dom';

describe('<ItemDetail />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GetsuContextProvider>
        <ItemDetail
          match={{ params: { item_id: '00000000-0000-0000-0000-000000000000' } }}
        />
      </GetsuContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
