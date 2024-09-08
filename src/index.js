
import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';  // If using Bootstrap
import './index.css';
import 'leaflet/dist/leaflet.css';  // If using Leaflet

const root = createRoot(document.getElementById('root')); // Use createRoot
root.render(<App />);

