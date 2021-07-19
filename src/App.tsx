/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppUtility } from './AppUtility';
import { ErrorBoundaryFallback } from './components/helpers/ErrorBoundaryFallback/ErrorBoundaryFallback';
import { Providers } from './containers/Providers';
import { firebaseConfig } from './firebaseConfig';
import { Routes } from './routes/Routes';

// ---------- sentry ----------
Sentry.init({
  dsn: 'https://77022713b420441c9cf36d61357beac0@o923237.ingest.sentry.io/5870382',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// ---------- firebase ----------
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const App: React.VFC = () => {
  useEffect(() => {
    if ((window as any).adsbygoogle && process.env.NODE_ENV !== 'development') {
      (window as any).adsbygoogle.push({});
    }
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={ErrorBoundaryFallback}>
      <Router>
        <Providers>
          <Routes />
          <AppUtility />
        </Providers>
      </Router>
    </Sentry.ErrorBoundary>
  );
};
