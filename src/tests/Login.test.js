import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';
import { ItemProvider } from '../ItemContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

describe('<Login />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemProvider>
        <Login />
      </ItemProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
