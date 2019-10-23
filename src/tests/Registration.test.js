import React from 'react';
import ReactDOM from 'react-dom';
import Registration from '../components/Registration';
import { GetsuContextProvider } from '../GetsuContext';
import AuthApiService from '../services/auth-api-service';

describe('<Registration />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GetsuContextProvider>
        <Registration />
      </GetsuContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
