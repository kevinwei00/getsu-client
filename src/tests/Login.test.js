import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';
import { GetsuContextProvider } from '../GetsuContext';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';

describe('<Login />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GetsuContextProvider>
        <Login />
      </GetsuContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
