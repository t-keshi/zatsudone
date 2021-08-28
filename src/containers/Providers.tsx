import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '../components/theme/theme';
import { combineProviders } from '../utility/factory/combineProviders';
import { MembersProvider } from './contexts/members';
import { SnackbarProvider } from './contexts/snackbar';

const queryClient = new QueryClient();

export const Providers: React.FC = ({ children }) => {
  const providersArray = [SnackbarProvider, MembersProvider];
  const CombinedProviders = combineProviders(providersArray);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CombinedProviders>{children}</CombinedProviders>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
