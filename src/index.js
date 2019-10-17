import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import { ItemProvider } from './ItemContext';

ReactDOM.render(
  <BrowserRouter>
    <ItemProvider>
      <App />
    </ItemProvider>
  </BrowserRouter>,
  document.getElementById('root')
);