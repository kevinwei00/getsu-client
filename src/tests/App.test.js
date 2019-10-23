import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import AppNav from '../components/AppNav';
import AppLanding from '../components/AppLanding';
import AppPrivate from '../components/AppPrivate';
import { MemoryRouter } from 'react-router-dom';
import { ItemProvider } from '../ItemContext';
import TokenService from '../services/token-service';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ItemProvider>
          <App />
        </ItemProvider>
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
        <ItemProvider>
          <AppNav />
        </ItemProvider>
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
        <ItemProvider>
          <AppLanding />
        </ItemProvider>
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
        <ItemProvider>
          <AppPrivate />
        </ItemProvider>
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
