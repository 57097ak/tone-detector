// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
