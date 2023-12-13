import React from 'react';
import { createRoot } from 'react-dom/client';
// import { CartProvider } from './CartContext';
import App from './App';

// Bootstrap functionality
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min';

// Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = createRoot(document.getElementById('root'));

root.render(
    <App />
 
);

