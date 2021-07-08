import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Providers } from '../src/containers/Providers';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Router>
      <Providers>
        <Story />
      </Providers>
    </Router>
  ),
];
