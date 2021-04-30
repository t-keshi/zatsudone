import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Providers } from './containers/Providers';
import { Routes } from './routes/Routes';

export const App: React.VFC = () => (
  <Router>
    <Providers>
      <Routes />
    </Providers>
  </Router>
);
