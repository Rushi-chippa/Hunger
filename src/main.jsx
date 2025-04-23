import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import './index.css'; // Tailwind should be configured here

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
);
