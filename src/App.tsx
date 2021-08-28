/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppUtility } from './AppUtility';
import { Providers } from './containers/Providers';
import { firebaseConfig } from './firebaseConfig';
import { Routes } from './routes/Routes';

// ---------- firebase ----------
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const App: React.VFC = () => (
  <Router>
    <Providers>
      <Routes />
      <AppUtility />
    </Providers>
  </Router>
);
