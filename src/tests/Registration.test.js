import React from 'react';
import ReactDOM from 'react-dom';
import Registration from '../components/Registration';
import { ItemProvider } from '../ItemContext';
import AuthApiService from '../services/auth-api-service';

describe('<Registration />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemProvider>
        <Registration />
      </ItemProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
