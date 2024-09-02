import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import { HashRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Root />
  </Router>
);

