import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import { GetsuContextProvider } from './GetsuContext';

ReactDOM.render(
  <BrowserRouter>
    <GetsuContextProvider>
      <App />
    </GetsuContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
