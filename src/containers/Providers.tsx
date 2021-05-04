import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { LocalizationProvider } from '@material-ui/pickers';
import { ReactQueryDevtools } from 'react-query/devtools';
// eslint-disable-next-line no-restricted-imports
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { ja } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '../components/theme/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
    },
  },
});

const formats = {
  normalDate: 'yyyy/MM/dd',
  keyboardDate: 'yyyy/MM/dd',
};

export const Providers: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider
        dateAdapter={DateFnsUtils} // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        locale={ja}
        dateFormats={formats}
      >
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
