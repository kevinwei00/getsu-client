import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from '../components/AddItem';
import { ItemProvider } from '../ItemContext';
import ItemsApiService from '../services/items-api-service';

describe('<AddItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemProvider>
        <AddItem />
      </ItemProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
