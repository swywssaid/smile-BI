import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Router from './router/Router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <Router />
  </React.StrictMode>,
);
