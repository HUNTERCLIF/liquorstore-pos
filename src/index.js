import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//serviceWorker.register(); // or serviceWorker.unregister();
