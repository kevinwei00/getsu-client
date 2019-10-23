import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from '../components/AddItem';
import { GetsuContextProvider } from '../GetsuContext';
import ItemsApiService from '../services/items-api-service';

describe('<AddItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GetsuContextProvider>
        <AddItem />
      </GetsuContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
