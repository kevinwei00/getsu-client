import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../components/Item';
import { MemoryRouter } from 'react-router-dom';

describe('<Item />', () => {
  const testItem = {
    item_id: '00000000-0000-0000-0000-000000000000',
    item_name: 'Test Item #1',
    max_quantity: 10,
    quantity: 10,
    unit_type: 'units',
    expiration_date: '2019-01-01T00:00:00.000Z',
    is_deleted: false,
  };

  it('renders without crashing', () => {
    const ul = document.createElement('ul');
    ReactDOM.render(
      <MemoryRouter>
        <Item key={testItem.item_id} id={testItem.item_id} item={testItem} />
      </MemoryRouter>,
      ul
    );
    ReactDOM.unmountComponentAtNode(ul);
  });
});
