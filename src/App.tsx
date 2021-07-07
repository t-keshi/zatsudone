/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as yup from 'yup';
import { AppUtility } from './AppUtility';
import { Providers } from './containers/Providers';
import { firebaseConfig } from './firebaseConfig';
import { Routes } from './routes/Routes';
import { yupLocaleJP } from './utility/yupLocaleJP';

yup.setLocale(yupLocaleJP);

firebase.initializeApp(firebaseConfig);

export const App: React.VFC = () => {
  useEffect(() => {
    if ((window as any).adsbygoogle && process.env.NODE_ENV !== 'development') {
      (window as any).adsbygoogle.push({});
    }
  }, []);

  return (
    <Router>
      <Providers>
        <Routes />
        <AppUtility />
      </Providers>
    </Router>
  );
};
