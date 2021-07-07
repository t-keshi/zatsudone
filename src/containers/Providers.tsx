import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { LocalizationProvider } from '@material-ui/pickers';
// eslint-disable-next-line no-restricted-imports
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { ja } from 'date-fns/locale';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '../components/theme/theme';
import { combineProviders } from '../utility/factory/combineProviders';
import { SnackbarProvider } from './contexts/snackbar';

const queryClient = new QueryClient();

const formats = {
  normalDate: 'yyyy/MM/dd',
  keyboardDate: 'yyyy/MM/dd',
};

export const Providers: React.FC = ({ children }) => {
  const providersArray = [SnackbarProvider];
  const CombinedProviders = combineProviders(providersArray);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider
          dateAdapter={DateFnsUtils} // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          locale={ja}
          dateFormats={formats}
        >
          <CombinedProviders>{children}</CombinedProviders>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
