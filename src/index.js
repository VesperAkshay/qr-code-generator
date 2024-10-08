import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/tailwind.css';
import {register} from './serviceWorkerRegistration'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//Service Worker Registration || Comment if PWA is not Required
register();
