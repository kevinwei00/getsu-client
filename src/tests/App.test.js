import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import AppNav from '../components/AppNav';
import AppLanding from '../components/AppLanding';
import AppPrivate from '../components/AppPrivate';
import { MemoryRouter } from 'react-router-dom';
import { GetsuContextProvider } from '../GetsuContext';
import TokenService from '../services/token-service';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <GetsuContextProvider>
          <App />
        </GetsuContextProvider>
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<AppNav />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <GetsuContextProvider>
          <AppNav />
        </GetsuContextProvider>
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<AppLanding />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <GetsuContextProvider>
          <AppLanding />
        </GetsuContextProvider>
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('<AppPrivate />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <GetsuContextProvider>
          <AppPrivate />
        </GetsuContextProvider>
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
